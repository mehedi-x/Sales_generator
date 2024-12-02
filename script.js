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

// Open full sales history modal
function openCloseStoreModal() {
    const fullSalesList = document.getElementById("full-sales-list");
    fullSalesList.innerHTML = ""; // Clear existing list
    
    if (salesData.length > 0) {
        salesData.forEach((sale, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Sale #${index + 1}:</strong><br>
                <strong>Shop:</strong> ${sale.shopName}<br>
                <strong>Product:</strong> ${sale.productName}<br>
                <strong>Quantity:</strong> ${sale.productQuantity}<br>
                <strong>Unit Price:</strong> ৳${sale.productPrice.toFixed(2)}<br>
                <strong>Total:</strong> ৳${sale.total.toFixed(2)}<br>
                <hr>
            `;
            fullSalesList.appendChild(listItem);
        });
    } else {
        fullSalesList.innerHTML = "<p>No sales history available.</p>";
    }

    document.getElementById("close-store-modal").style.display = "block"; // Open the modal
}

// Download sales history as PDF
function downloadSalesHistory() {
    let salesSummary = salesData.map((sale, index) => {
        return `
            Sale #${index + 1}:
            Shop: ${sale.shopName}
            Product: ${sale.productName}
            Quantity: ${sale.productQuantity}
            Unit Price: ৳${sale.productPrice.toFixed(2)}
            Total: ৳${sale.total.toFixed(2)}
        `;
    }).join("\n\n");

    const blob = new Blob([salesSummary], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Sales_History.pdf";
    link.click(); // Trigger the download

    URL.revokeObjectURL(url);
}

// Close store and clear sales data with confirmation
function closeStore() {
    // Display confirmation modal
    const confirmation = confirm("Are you sure you want to close the store? This will delete all sales data.");
    
    if (confirmation) {
        salesData = []; // Clear sales data
        localStorage.removeItem("salesData"); // Remove from local storage
        alert("Store closed and all sales data cleared!");
        document.getElementById("close-store-modal").style.display = "none"; // Close the modal
        location.reload(); // Reload the page to reset the state
    } else {
        alert("Store closure canceled.");
    }
}

// Cancel store closure
function cancelStoreClosure() {
    document.getElementById("close-store-modal").style.display = "none";
}

// Initialize sales view on page load
window.onload = function () {
    if (salesData.length > 0) {
        updateLastSaleView(salesData[salesData.length - 1]);
    }
};
