let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

// Add product and generate sale
function generateSale() {
    const shopName = document.getElementById("shop-name").value;
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseFloat(document.getElementById("product-quantity").value) || 1;

    if (!shopName || !productName || isNaN(productPrice)) {
        alert("Please fill out all required fields.");F
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

// Open the Close Store Modal
function openCloseStoreModal() {
    document.getElementById("close-store-modal").style.display = "flex";
}

// Close the Modal without taking any action
function cancelStoreClosure() {
    document.getElementById("close-store-modal").style.display = "none";
}

// Close store and clear sales data after confirmation
function closeStore() {
    const confirmation = confirm("Are you sure you want to close the store and clear all sales data?");
    
    if (confirmation) {
        // Clear sales data and remove from localStorage
        salesData = [];
        localStorage.removeItem("salesData");
        
        // Hide modal and show a success message
        document.getElementById("close-store-modal").style.display = "none";
        alert("Store closed and all sales data cleared!");
        
        // Optionally reload the page to reset the interface
        location.reload();
    } else {
        // If the user cancels, simply hide the modal without clearing data
        document.getElementById("close-store-modal").style.display = "none";
    }
}

// Download sales history as PDF
function SalesHistory() {
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
    // Show confirmation dialog before closing the store
    const confirmation = confirm("Are you sure you want to close the store and clear all sales data?");
    
    if (confirmation) {
        // Clear sales data and remove from localStorage
        salesData = [];
        localStorage.removeItem("salesData");
        
        // Hide modal and show a success message
        document.getElementById("close-store-modal").style.display = "none";
        alert("Store closed and all sales data cleared!");
        
        // Optionally reload the page to reset the interface
        location.reload();
    } else {
        // If the user cancels, simply hide the modal without clearing data
        document.getElementById("close-store-modal").style.display = "none";
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
