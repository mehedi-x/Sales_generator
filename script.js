document.addEventListener("DOMContentLoaded", () => {
    const totalSalesElement = document.getElementById("totalSales");
    const productListTable = document.getElementById("productList");
    const addedProductsSection = document.getElementById("addedProducts");
    const menuToggle = document.getElementById("menuToggle");
    const menuOptions = document.getElementById("menuOptions");

    let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
    let totalSales = parseFloat(localStorage.getItem("totalSales")) || 0;

    // Initialize Total Sales
    totalSalesElement.textContent = `${totalSales.toFixed(2)} ৳`;

    // Add Product to Sale List
    document.getElementById("addToSale").addEventListener("click", (event) => {
        event.preventDefault();

        const productName = document.getElementById("productName").value.trim();
        const productPrice = parseFloat(document.getElementById("productPrice").value);
        const productQuantity = parseInt(document.getElementById("productQuantity").value) || 1;

        if (productName && productPrice > 0) {
            const total = productPrice * productQuantity;

            // Save product in sales data
            const product = { name: productName, price: productPrice, quantity: productQuantity, total };
            salesData.push(product);
            totalSales += total;

            // Update LocalStorage
            localStorage.setItem("salesData", JSON.stringify(salesData));
            localStorage.setItem("totalSales", totalSales.toFixed(2));

            // Update UI
            totalSalesElement.textContent = `${totalSales.toFixed(2)} ৳`;
            addProductToTable(product);
            addedProductsSection.style.display = "block";

            // Clear input fields
            document.getElementById("productForm").reset();
        } else {
            alert("Please provide valid product details.");
        }
    });

    // Add Product to Table
    function addProductToTable(product) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)} ৳</td>
            <td>${product.quantity}</td>
            <td>${product.total.toFixed(2)} ৳</td>
            <td><button class="delete-button">Remove</button></td>
        `;
        productListTable.appendChild(row);

        // Remove Product Event
        row.querySelector(".delete-button").addEventListener("click", () => {
            const index = Array.from(productListTable.children).indexOf(row);
            salesData.splice(index, 1);
            totalSales -= product.total;

            localStorage.setItem("salesData", JSON.stringify(salesData));
            localStorage.setItem("totalSales", totalSales.toFixed(2));

            totalSalesElement.textContent = `${totalSales.toFixed(2)} ৳`;
            row.remove();

            if (salesData.length === 0) {
                addedProductsSection.style.display = "none";
            }
        });
    }

    // Load Previous Products
    if (salesData.length > 0) {
        salesData.forEach(addProductToTable);
        addedProductsSection.style.display = "block";
    }

    // Finalize Sale
    document.getElementById("finalizeSale").addEventListener("click", () => {
        if (salesData.length > 0) {
            alert(`Total Sale: ৳${totalSales.toFixed(2)}`);
            salesData = [];
            totalSales = 0;
            localStorage.removeItem("salesData");
            localStorage.removeItem("totalSales");
            productListTable.innerHTML = "";
            addedProductsSection.style.display = "none";
            totalSalesElement.textContent = "0.00 ৳";
        } else {
            alert("No products to finalize.");
        }
    });

    // View Full Sales History
    document.getElementById("viewHistory").addEventListener("click", () => {
        if (salesData.length > 0) {
            let history = salesData.map((product, index) => {
                return `${index + 1}. ${product.name} - ${product.quantity} x ৳${product.price.toFixed(2)} = ৳${product.total.toFixed(2)}`;
            }).join("\n");
            alert(`Full Sales History:\n\n${history}`);
        } else {
            alert("No sales history available.");
        }
    });

    // Download Sales History
    document.getElementById("downloadHistory").addEventListener("click", () => {
        if (salesData.length > 0) {
            const blob = new Blob([JSON.stringify(salesData, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "sales_history.json";
            a.click();
        } else {
            alert("No sales history available to download.");
        }
    });

    // Settings
    document.getElementById("settings").addEventListener("click", () => {
        alert("Settings are under development.");
    });

    // Close Store
    document.getElementById("closeStore").addEventListener("click", () => {
        if (confirm("Are you sure you want to close the store? All data will be cleared.")) {
            localStorage.clear();
            location.reload();
        }
    });

    // Menu Toggle
    menuToggle.addEventListener("click", () => {
        menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
    });

    // Close Menu on Outside Click
    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !menuOptions.contains(event.target)) {
            menuOptions.style.display = "none";
        }
    });
});
