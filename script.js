/* script.js */

let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

function saveSalesData() {
    localStorage.setItem("salesData", JSON.stringify(salesData));
}

function loadSalesData() {
    salesData = JSON.parse(localStorage.getItem("salesData")) || [];
}

function generateSale() {
    const shopName = document.getElementById("shop-name").value.trim();
    const productName = document.getElementById("product-name").value.trim();
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseFloat(document.getElementById("product-quantity").value) || 1;

    if (!shopName || !productName || isNaN(productPrice)) {
        alert("Please fill out all required fields.");
        return;
    }

    const product = {
        shopName,
        productName,
        productPrice,
        productQuantity,
        total: productPrice * productQuantity,
    };

    salesData.push(product);
    saveSalesData();
    updateLastSaleView(product);
    calculateTotalSales();
    resetForm();
}

function updateLastSaleView(lastSale) {
    const saleSummary = document.getElementById("sale-summary");
    saleSummary.innerHTML = `
        <h3>Last Sale Summary:</h3>
        <p><strong>Shop:</strong> ${lastSale.shopName}</p>
        <p><strong>Product:</strong> ${lastSale.productName}</p>
        <p><strong>Quantity:</strong> ${lastSale.productQuantity}</p>
        <p><strong>Total:</strong> ৳${lastSale.total.toFixed(2)}</p>
    `;
}

function calculateTotalSales() {
    const total = salesData.reduce((sum, sale) => sum + sale.total, 0);
    document.getElementById("total-sales").textContent = `Total Sales: ৳${total.toFixed(2)}`;
}

function resetForm() {
    document.getElementById("shop-name").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = "";
}

function openCloseStoreModal() {
    const fullSalesList = document.getElementById("full-sales-list");
    fullSalesList.innerHTML = salesData.map((sale, index) =>
        `<li><strong>${index + 1}.</strong> Shop: ${sale.shopName}, Product: ${sale.productName}, Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}</li>`
    ).join("");
    document.getElementById("close-store-modal").style.display = "flex";
}

function closeStore() {
    salesData = [];
    localStorage.removeItem("salesData");
    document.getElementById("close-store-modal").style.display = "none";
    alert("Store closed and all sales data cleared!");
    location.reload();
}

function cancelStoreClosure() {
    document.getElementById("close-store-modal").style.display = "none";
}

window.onload = function () {
    loadSalesData();
    if (salesData.length > 0) {
        updateLastSaleView(salesData[salesData.length - 1]);
        calculateTotalSales();
    }
};
