// Global Variables
let storeName = '';
let totalSales = 0;
let totalProductsSold = 0;
let lastSale = {};

// Set Store Name and Start Store
function setStoreName() {
  const storeNameInput = document.getElementById('storeNameInput').value;

  if (storeNameInput) {
    storeName = storeNameInput;
    localStorage.setItem('storeName', storeName);

    // Hide "Set Your Store Name" Section
    document.getElementById('main-page').classList.add('hidden');

    // Show Sales and Product Entry
    document.getElementById('sales-card').classList.remove('hidden');
    document.getElementById('product-entry-card').classList.remove('hidden');
  } else {
    alert("Please enter a store name!");
  }
}

// Generate Sale
function generateSale() {
  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productQuantity = parseInt(document.getElementById('productQuantity').value);

  if (productName && productPrice > 0 && productQuantity > 0) {
    const saleAmount = productPrice * productQuantity;

    // Update Sales Data
    totalSales += saleAmount;
    totalProductsSold += productQuantity;
    lastSale = {
      productName,
      productPrice,
      productQuantity,
      totalAmount: saleAmount
    };

    // Update Display
    document.getElementById('totalSales').innerText = `৳${totalSales}`;
    document.getElementById('totalProductsSold').innerText = totalProductsSold;
    document.getElementById('live-product-name').innerText = productName;
    document.getElementById('live-price').innerText = `৳${productPrice}`;
    document.getElementById('live-quantity').innerText = productQuantity;
    document.getElementById('live-total-amount').innerText = `৳${saleAmount}`;
  } else {
    alert("Please fill in all product details correctly!");
  }
}

// Open Settings (Live Dashboard)
function openSettings() {
  // Show Loading
  const settingsPage = document.getElementById('settings-page');
  const salesCard = document.getElementById('sales-card');
  const productEntryCard = document.getElementById('product-entry-card');

  salesCard.classList.add('hidden');
  productEntryCard.classList.add('hidden');

  setTimeout(() => {
    settingsPage.classList.remove('hidden');
  }, 1000); // 1-second loading effect
}

// Close Store
function closeStore() {
  if (confirm("Are you sure you want to close the store?")) {
    if (confirm("Are you absolutely sure?")) {
      totalSales = 0;
      totalProductsSold = 0;
      lastSale = {};

      // Reset Display
      document.getElementById('totalSales').innerText = "৳0";
      document.getElementById('totalProductsSold').innerText = "0";
      document.getElementById('live-product-name').innerText = "-";
      document.getElementById('live-price').innerText = "৳0";
      document.getElementById('live-quantity').innerText = "0";
      document.getElementById('live-total-amount').innerText = "৳0";

      // Reset UI
      document.getElementById('main-page').classList.remove('hidden');
      document.getElementById('sales-card').classList.add('hidden');
      document.getElementById('product-entry-card').classList.add('hidden');
      document.getElementById('settings-page').classList.add('hidden');
    }
  }
}
