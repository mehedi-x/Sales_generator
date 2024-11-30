let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

// Add product and generate sale
function generateSale() {
    const shopName = document.getElementById("shop-name").value;
    const productName = document.getElementById("product-name").value;
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

    // Update sales data and save to local storage
    salesData.push(product);
    localStorage.setItem("salesData", JSON.stringify(salesData));

    // Update suggestions and sales display
    suggestedProducts.add(productName);
    updateSuggestions();
    updateLastSaleView(product);
    resetForm();
}

// Update only the last sale view
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

// Update datalist for suggested products
function updateSuggestions() {
    const datalist = document.getElementById("suggested-products");
    datalist.innerHTML = "";
    suggestedProducts.forEach((product) => {
        const option = document.createElement("option");
        option.value = product;
        datalist.appendChild(option);
    });
}

// Reset input fields
function resetForm() {
    document.getElementById("shop-name").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = "";
}

// Open close store modal and show full sales history
function openCloseStoreModal() {
    const fullSalesList = document.getElementById("full-sales-list");
    fullSalesList.innerHTML = "";

    salesData.forEach((sale, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${index + 1}.</strong> Shop: ${sale.shopName}, Product: ${sale.productName},
            Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}
        `;
        fullSalesList.appendChild(listItem);
    });

    document.getElementById("close-store-modal").style.display = "block";
}

// Download sales history as PDF
function downloadSalesHistory() {
    const salesSummary = salesData
        .map(
            (sale, index) =>
                `${index + 1}. Shop: ${sale.shopName}, Product: ${sale.productName}, Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}`
        )
        .join("\n");

    const blob = new Blob([salesSummary], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Sales_History.pdf";
    link.click();

    URL.revokeObjectURL(url);
}

// Close store and clear sales data
function closeStore() {
    salesData = [];
    localStorage.removeItem("salesData");
    document.getElementById("close-store-modal").style.display = "none";
    alert("Store closed and all sales data cleared!");
    location.reload();
}

// Cancel store closure
function cancelStoreClosure() {
    document.getElementById("close-store-modal").style.display = "none";
}

// Save shop name to localStorage
function saveShopName() {
    const shopName = document.getElementById("shop-name-input").value;
    if (!shopName) {
        alert("Please enter a shop name.");
        return;
    }

    localStorage.setItem("shopName", shopName);
    document.getElementById("shop-name-modal").style.display = "none"; // Hide the modal after saving
    document.getElementById("shop-name").value = shopName; // Display the shop name in the input field
}

// Initialize shop name modal and sales view on page load
window.onload = function () {
    const savedShopName = localStorage.getItem("shopName");

    // Check if a shop name is saved in localStorage
    if (savedShopName) {
        document.getElementById("shop-name").value = savedShopName; // Display saved shop name in the field
    } else {
        document.getElementById("shop-name-modal").style.display = "block"; // Show the modal if no shop name is saved
    }

    // If there are sales data, update the last sale view
    if (salesData.length > 0) {
        updateLastSaleView(salesData[salesData.length - 1]);
    }
};
