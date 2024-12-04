let shopName = localStorage.getItem("shopName") || "";
let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

// Show shop name if it's already stored
if (shopName) {
    document.getElementById("shop-name-display").textContent = `Shop: ${shopName}`;
} else {
    document.getElementById("shop-name-popup").style.display = "flex";
}

// Show menu when the menu button is clicked
document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("hidden-menu");
});

// Activate Shop Name
document.getElementById("activate-btn").addEventListener("click", function() {
    shopName = document.getElementById("shop-name").value;
    if (shopName) {
        localStorage.setItem("shopName", shopName);
        document.getElementById("shop-name-display").textContent = `Shop: ${shopName}`;
        document.getElementById("shop-name-popup").style.display = "none";
    }
});

// Add Sale
document.getElementById("add-sale-btn").addEventListener("click", function() {
    let productName = prompt("Enter Product Name:");
    let productPrice = parseFloat(prompt("Enter Product Price:"));
    let productQuantity = parseInt(prompt("Enter Product Quantity:"));

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity)) {
        let total = productPrice * productQuantity;
        let sale = { productName, productPrice, productQuantity, total };
        salesData.push(sale);
        localStorage.setItem("salesData", JSON.stringify(salesData));

        updateSaleSummary(sale);
    }
});

// Update Sale Summary
function updateSaleSummary(sale) {
    let saleSummary = document.getElementById("sale-summary");
    saleSummary.innerHTML = `
        <p><strong>Product:</strong> ${sale.productName}</p>
        <p><strong>Price:</strong> ৳${sale.productPrice}</p>
        <p><strong>Quantity:</strong> ${sale.productQuantity}</p>
        <p><strong>Total:</strong> ৳${sale.total}</p>
    `;
}

// View Sales History
document.getElementById("view-sales-history").addEventListener("click", function() {
    let salesHistoryList = document.getElementById("sales-history-list");
    salesHistoryList.innerHTML = "";
    
    salesData.forEach((sale, index) => {
        let saleItem = document.createElement("div");
        saleItem.innerHTML = `<p><strong>Sale #${index + 1}: </strong>${sale.productName} - ৳${sale.total}</p>`;
        salesHistoryList.appendChild(saleItem);
    });
});

// Close Store and Clear Data
document.getElementById("close-store-btn").addEventListener("click", function() {
    localStorage.removeItem("shopName");
    localStorage.removeItem("salesData");
    location.reload();
});
