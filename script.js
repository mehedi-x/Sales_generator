// Simulated Data
let softwareActive = true; // Change this to simulate active or inactive state.
let lastSale = { price: 1200, product: "Mobile Phone" };

// Update Dashboard Status
function updateDashboard() {
    const statusIndicator = document.getElementById("status-indicator");
    const statusText = document.getElementById("status-text");
    const statusTip = document.getElementById("status-tip");
    const lastSalePrice = document.getElementById("last-sale-price");
    const lastProductName = document.getElementById("last-product-name");

    // Update Software Status
    if (softwareActive) {
        statusIndicator.classList.add("active");
        statusText.textContent = "Active";
        statusTip.textContent = "Software is running smoothly.";
    } else {
        statusIndicator.classList.remove("active");
        statusText.textContent = "Inactive";
        statusTip.textContent = "Please activate the software to start.";
    }

    // Update Last Sale Price and Product
    if (lastSale) {
        lastSalePrice.textContent = `৳${lastSale.price}`;
        lastProductName.textContent = lastSale.product;
    } else {
        lastSalePrice.textContent = "৳0.00";
        lastProductName.textContent = "No product sold yet";
    }
}

// Generate Sale
function generateSale(event) {
    event.preventDefault();

    const shopName = document.getElementById("shop-name").value;
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseFloat(document.getElementById("product-quantity").value) || 1;

    if (!shopName || !productName || isNaN(productPrice)) {
        alert("Please fill out all required fields.");
        return;
    }

    const total = productPrice * productQuantity;
    lastSale = { price: total, product: productName };

    alert(`Sale recorded successfully!\nTotal: ৳${total.toFixed(2)}`);
    updateDashboard();
}

// Toggle Light/Dark Mode
function toggleLightMode() {
    document.body.classList.toggle("light-mode");
}

// Initialize Dashboard
window.onload = updateDashboard;
