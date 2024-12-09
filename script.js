document.addEventListener("DOMContentLoaded", () => {
    const storeNameInput = document.getElementById("storeName");
    const setupStoreBtn = document.getElementById("setupStore");
    const productEntrySection = document.getElementById("productEntry");
    const salesSummarySection = document.getElementById("salesSummary");
    const totalSales = document.getElementById("totalSales");
    const summaryDetails = document.getElementById("summaryDetails");
    const historyModal = document.getElementById("historyModal");
    const historyContent = document.getElementById("historyContent");

    let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
    let totalSalesAmount = parseFloat(localStorage.getItem("totalSales")) || 0;

    totalSales.textContent = totalSalesAmount;

    if (localStorage.getItem("storeName")) {
        storeNameInput.style.display = "none";
        productEntrySection.style.display = "block";
    }

    setupStoreBtn.addEventListener("click", () => {
        const storeName = storeNameInput.value.trim();
        if (storeName) {
            localStorage.setItem("storeName", storeName);
            storeNameInput.style.display = "none";
            productEntrySection.style.display = "block";
        }
    });

    document.getElementById("generateSale").addEventListener("click", () => {
        const productName = document.getElementById("productName").value.trim();
        const productPrice = parseFloat(document.getElementById("productPrice").value);
        const productQuantity = parseInt(document.getElementById("productQuantity").value);

        if (productName && productPrice > 0 && productQuantity > 0) {
            const total = productPrice * productQuantity;
            totalSalesAmount += total;
            totalSales.textContent = totalSalesAmount;

            const sale = {
                productName,
                productPrice,
                productQuantity,
                total,
                time: new Date().toLocaleString()
            };
            salesData.push(sale);
            localStorage.setItem("salesData", JSON.stringify(salesData));
            localStorage.setItem("totalSales", totalSalesAmount);

            summaryDetails.innerHTML = `
                <p>Product: ${productName}</p>
                <p>Quantity: ${productQuantity}</p>
                <p>Total: ${total} ৳</p>
                <p>Time: ${sale.time}</p>
            `;
            salesSummarySection.style.display = "block";
        }
    });

    document.getElementById("viewHistory").addEventListener("click", () => {
        historyContent.innerHTML = salesData.map(sale => `
            <div>
                <p>Product: ${sale.productName}</p>
                <p>Price: ${sale.productPrice}</p>
                <p>Quantity: ${sale.productQuantity}</p>
                <p>Total: ${sale.total}</p>
                <p>Time: ${sale.time}</p>
            </div>
        `).join("");
        historyModal.style.display = "block";
    });

    document.getElementById("closeHistoryModal").addEventListener("click", () => {
        historyModal.style.display = "none";
    });

    document.getElementById("downloadHistory").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(salesData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sales_history.json";
        a.click();
    });

    document.getElementById("closeStore").addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menuOptions = document.getElementById("menuOptions");

    // Toggle menu visibility on click
    menuToggle.addEventListener("click", () => {
        menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
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

