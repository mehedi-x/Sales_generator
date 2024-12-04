let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

function updateDashboard() {
    const softwareStatus = document.getElementById("status-text");
    const officeStatusText = document.getElementById("office-status-text");
    const lastSalePrice = document.getElementById("last-sale-price");

    softwareStatus.textContent = "Active"; // Example
    officeStatusText.textContent = "Office is Open"; // Example

    const lastSale = salesData[salesData.length - 1];
    lastSalePrice.textContent = lastSale ? `৳${lastSale.total.toFixed(2)}` : "৳0.00";
}

function generateSale() {
    const shopName = document.getElementById("shop-name").value;
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseFloat(document.getElementById("product-quantity").value) || 1;

    const product = { shopName, productName, productPrice, productQuantity, total: productPrice * productQuantity };
    salesData.push(product);
    localStorage.setItem("salesData", JSON.stringify(salesData));

    suggestedProducts.add(productName);
    updateDashboard();
}
window.onload = updateDashboard;
