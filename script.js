let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

// Add a new sale
function generateSale() {
    const shopName = document.getElementById("shop-name").value.trim();
    const productName = document.getElementById("product-name").value.trim();
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseInt(document.getElementById("product-quantity").value) || 1;

    if (!shopName || !productName || isNaN(productPrice) || productPrice <= 0) {
        alert("Please fill out all required fields with valid data.");
        return;
    }

    const sale = {
        shopName,
        productName,
        productPrice,
        productQuantity,
        total: productPrice * productQuantity,
    };

    salesData.push(sale);
    localStorage.setItem("salesData", JSON.stringify(salesData));

    suggestedProducts.add(productName);
    updateSuggestions();
    updateLastSaleView(sale);
    resetForm();
}

function updateLastSaleView(sale) {
    const saleSummary = document.getElementById("sale-summary");
    saleSummary.innerHTML = `
        <h3>Last Sale Summary:</h3>
        <p><strong>Shop:</strong> ${sale.shopName}</p>
        <p><strong>Product:</strong> ${sale.productName}</p>
        <p><strong>Quantity:</strong> ${sale.productQuantity}</p>
        <p><strong>Total:</strong> ৳${sale.total.toFixed(2)}</p>
    `;
}

function updateSuggestions() {
    const datalist = document.getElementById("suggested-products");
    datalist.innerHTML = "";
    suggestedProducts.forEach(product => {
        const option = document.createElement("option");
        option.value = product;
        datalist.appendChild(option);
    });
}

function resetForm() {
    document.getElementById("shop-name").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = 1;
}

function openCloseStoreModal() {
    const fullSalesList = document.getElementById("full-sales-list");
    fullSalesList.innerHTML = salesData.map((sale, index) => `
        <li>${index + 1}. Shop: ${sale.shopName}, Product: ${sale.productName}, Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}</li>
    `).join("");
    document.getElementById("close-store-modal").style.display = "flex";
}

function downloadSalesHistory() {
    const salesText = salesData.map((sale, index) =>
        `${index + 1}. Shop: ${sale.shopName}, Product: ${sale.productName}, Total: ৳${sale.total.toFixed(2)}`
    ).join("\n");
    const blob = new Blob([salesText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Sales_History.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

function closeStore() {
    salesData = [];
    localStorage.removeItem("salesData");
    alert("Store closed. All sales data cleared.");
    location.reload();
}

function cancelStoreClosure() {
    document.getElementById("close-store-modal").style.display = "none";
}

// Initialize sales on page load
window.onload = function () {
    if (salesData.length > 0) {
        updateLastSaleView(salesData[salesData.length - 1]);
    }
};
