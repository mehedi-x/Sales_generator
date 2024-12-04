let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

// Add product and generate sale
function generateSale() {
    const shopName = document.getElementById("shop-name").value;
    const productName = document.getElementById("product-name-input").value;
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

// Update last sale information
function updateLastSaleView(lastSale) {
    const lastSaleInfo = document.getElementById("last-sale-info");
    lastSaleInfo.innerHTML = `
        <p><strong>Shop:</strong> ${lastSale.shopName}</p>
        <p><strong>Product:</strong> ${lastSale.productName}</p>
        <p><strong>Quantity:</strong> ${lastSale.productQuantity}</p>
        <p><strong>Total:</strong> ৳${lastSale.total.toFixed(2)}</p>
    `;
}


// Update suggested products for auto-complete
function updateSuggestions() {
    const productList = document.getElementById("suggested-products");
    productList.innerHTML = "";
    suggestedProducts.forEach((product) => {
        const option = document.createElement("option");
        option.value = product;
        productList.appendChild(option);
    });
}

// Reset form after sale
function resetForm() {
    document.getElementById("shop-name").value = "";
    document.getElementById("product-name-input").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = "";
}

// Download sales history as PDF or CSV
function downloadSalesHistory(type) {
    const headers = ["Shop Name", "Product Name", "Price", "Quantity", "Total"];
    let data = salesData.map((sale) => [
        sale.shopName,
        sale.productName,
        sale.productPrice,
        sale.productQuantity,
        sale.total.toFixed(2),
    ]);

    if (type === "pdf") {
        // Implement PDF generation (this part is left as an exercise, you can use libraries like jsPDF)
        alert("PDF export feature not implemented yet.");
    } else if (type === "csv") {
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
        data.forEach((row) => {
            csvContent += row.join(",") + "\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sales_history.csv");
        document.body.appendChild(link);
        link.click();
    }
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
});
