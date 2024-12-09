document.addEventListener("DOMContentLoaded", () => {
    const storeNameInput = document.getElementById("storeName");
    const setupStoreBtn = document.getElementById("setupStore");
    const productEntrySection = document.getElementById("productEntry");
    const addedProductsSection = document.getElementById("addedProducts");
    const productListTable = document.getElementById("productList");
    const totalSales = document.getElementById("totalSales");

    let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
    let totalSalesAmount = parseFloat(localStorage.getItem("totalSales")) || 0;

    totalSales.textContent = totalSalesAmount.toFixed(2);

    // Initialize store
    if (localStorage.getItem("storeName")) {
        storeNameInput.parentElement.style.display = "none";
        productEntrySection.style.display = "block";
    }

    // Set store name
    setupStoreBtn.addEventListener("click", () => {
        const storeName = storeNameInput.value.trim();
        if (storeName) {
            localStorage.setItem("storeName", storeName);
            storeNameInput.parentElement.style.display = "none";
            productEntrySection.style.display = "block";
        } else {
            alert("Please enter a valid store name.");
        }
    });

    // Product list management
    const productList = [];

    document.getElementById("addToSale").addEventListener("click", () => {
        const productName = document.getElementById("productName").value.trim();
        const productPrice = parseFloat(document.getElementById("productPrice").value);
        const productQuantity = parseInt(document.getElementById("productQuantity").value);

        if (productName && productPrice > 0 && productQuantity > 0) {
            const productTotal = productPrice * productQuantity;

            productList.push({
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                total: productTotal,
            });

            updateProductList();
            addedProductsSection.style.display = "block";
            clearProductInputs();
        } else {
            alert("Please provide valid product details.");
        }
    });

    function updateProductList() {
        productListTable.innerHTML = productList.map((product, index) => `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${product.total.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            </tr>
        `).join("");

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", () => {
                removeProduct(button.dataset.index);
            });
        });
    }

    function removeProduct(index) {
        productList.splice(index, 1);
        updateProductList();
        if (productList.length === 0) {
            addedProductsSection.style.display = "none";
        }
    }

    function clearProductInputs() {
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
    }

    // Finalize sale
    document.getElementById("finalizeSale").addEventListener("click", () => {
        if (productList.length === 0) {
            alert("No products to finalize.");
            return;
        }

        const totalSale = productList.reduce((sum, product) => sum + product.total, 0);

        totalSalesAmount += totalSale;
        totalSales.textContent = totalSalesAmount.toFixed(2);

        salesData = salesData.concat(productList.map(product => ({
            ...product,
            time: new Date().toLocaleString(),
        })));

        localStorage.setItem("salesData", JSON.stringify(salesData));
        localStorage.setItem("totalSales", totalSalesAmount);

        alert(`Sale finalized! Total: ৳${totalSale.toFixed(2)}`);

        productList.length = 0;
        updateProductList();
        addedProductsSection.style.display = "none";
    });

    // View sales history
    document.getElementById("viewHistory").addEventListener("click", () => {
        const historyContent = salesData.map(sale => `
            <div class="sale-item">
                <p>Product: ${sale.name}</p>
                <p>Price: ৳${sale.price.toFixed(2)}</p>
                <p>Quantity: ${sale.quantity}</p>
                <p>Total: ৳${sale.total.toFixed(2)}</p>
                <p>Time: ${sale.time}</p>
            </div>
        `).join("");
        document.getElementById("historyModal").innerHTML = historyContent || "<p>No sales history available.</p>";
        document.getElementById("historyModal").style.display = "block";
    });

    // Download history
    document.getElementById("downloadHistory").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(salesData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sales_history.json";
        a.click();
        URL.revokeObjectURL(url);
    });

    // Close store
    document.getElementById("closeStore").addEventListener("click", () => {
        if (confirm("Are you sure you want to close the store? This will clear all data.")) {
            localStorage.clear();
            location.reload();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menuOptions = document.getElementById("menuOptions");

    // Toggle menu visibility on click
    menuToggle.addEventListener("click", () => {
        if (menuOptions.style.display === "block") {
            menuOptions.style.display = "none";
        } else {
            menuOptions.style.display = "block";
        }
    });

    // Close the menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !menuOptions.contains(event.target)) {
            menuOptions.style.display = "none";
        }
    });

    // Add functionality for each menu option
    document.getElementById("viewHistory").addEventListener("click", () => {
        alert("Displaying full sales history...");
        // Add your logic here
    });

    document.getElementById("downloadHistory").addEventListener("click", () => {
        alert("Downloading sales history...");
        // Add your logic here
    });

    document.getElementById("settings").addEventListener("click", () => {
        alert("Opening settings...");
        // Add your logic here
    });

    document.getElementById("closeStore").addEventListener("click", () => {
        const confirmation = confirm("Are you sure you want to close the store?");
        if (confirmation) {
            alert("Store closed.");
            // Add your logic here
        }
    });
});

