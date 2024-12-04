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
        time: new Date().toISOString(), // Save time of sale
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
        <p><strong>Time:</strong> ${new Date(lastSale.time).toLocaleString()}</p>
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
            Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)},
            Time: ${new Date(sale.time).toLocaleString()}
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
                `${index + 1}. Shop: ${sale.shopName}, Product: ${sale.productName}, Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}, Time: ${new Date(sale.time).toLocaleString()}`
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

// Filter sales history based on day, month, year
function applyFilter() {
    const day = document.getElementById('day-select').value;
    const month = document.getElementById('month-select').value;
    const year = document.getElementById('year-select').value;

    const filteredSales = salesData.filter(sale => {
        const saleDate = new Date(sale.time);
        const saleDay = saleDate.getDate();
        const saleMonth = saleDate.getMonth() + 1;
        const saleYear = saleDate.getFullYear();

        return (
            (day ? saleDay === parseInt(day) : true) &&
            (month ? saleMonth === parseInt(month) : true) &&
            (year ? saleYear === parseInt(year) : true)
        );
    });

    displaySalesHistory(filteredSales);
}

// Display filtered sales history
function displaySalesHistory(sales) {
    const filteredSalesHistory = document.getElementById("filtered-sales-history");
    filteredSalesHistory.innerHTML = sales.length === 0
        ? 'No sales found for the selected filters.'
        : sales.map(sale => `
            <p>
                <strong>Shop:</strong> ${sale.shopName}<br>
                <strong>Product:</strong> ${sale.productName}<br>
                <strong>Quantity:</strong> ${sale.productQuantity}<br>
                <strong>Total:</strong> ৳${sale.total.toFixed(2)}<br>
                <strong>Time:</strong> ${new Date(sale.time).toLocaleString()}
            </p>
        `).join('');
}

// Initialize sales view on page load
window.onload = function () {
    if (salesData.length > 0) {
        updateLastSaleView(salesData[salesData.length - 1]);
    }
    populateYearOptions();
    populateDayOptions();
};

// Populate the year and day options dynamically
function populateYearOptions() {
    const yearSelect = document.getElementById('year-select');
    const years = [...new Set(salesData.map(sale => new Date(sale.time).getFullYear()))];
    yearSelect.innerHTML = '<option value="">All</option>';
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

function populateDayOptions() {
    const daySelect = document.getElementById('day-select');
    const days = [...new Set(salesData.map(sale => new Date(sale.time).getDate()))];
    daySelect.innerHTML = '<option value="">All</option>';
    days.forEach(day => {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    });
}
