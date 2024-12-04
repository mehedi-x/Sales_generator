let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let suggestedProducts = new Set();

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
    localStorage.setItem("salesData", JSON.stringify(salesData));

    suggestedProducts.add(productName);
    updateSuggestions();
    updateLastSaleView(product);
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

function updateSuggestions() {
    const datalist = document.getElementById("suggested-products");
    datalist.innerHTML = "";
    suggestedProducts.forEach((product) => {
        const option = document.createElement("option");
        option.value = product;
        datalist.appendChild(option);
    });
}

function resetForm() {
    document.getElementById("shop-name").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = "";
}

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

function downloadSalesHistory() {
    const salesSummary = salesData
        .map(
            (sale, index) =>
                `${index + 1}. Shop: ${sale.shopName}, Product: ${sale.productName}, Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}`
        )
        .join("\n");

    const blob = new Blob([salesSummary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales-history.txt";
    link.click();
}

function closeStore() {
    salesData = [];
    localStorage.removeItem("salesData");
    document.getElementById("close-store-modal").style.display = "none";
    alert("Store closed. Sales data cleared.");
}

function cancelStoreClosure() {
    document.getElementById("close-store-modal").style.display = "none";
}
