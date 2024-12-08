let storeName = localStorage.getItem('storeName') || '';
let salesData = JSON.parse(localStorage.getItem('salesData')) || [];

// সিস্টেম চালু হলে স্টোর নাম ও সেল ডেটা লোড করা
window.onload = function () {
  if (storeName) {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('store-info-card').classList.remove('hidden');
    document.getElementById('sales-generate-card').classList.remove('hidden');
    document.getElementById('storeNameDisplay').textContent = `Welcome to ${storeName}`;
  }
};

// স্টোর নাম সেট করা
function setStoreName() {
  const storeInput = document.getElementById('storeNameInput').value.trim();
  if (storeInput) {
    storeName = storeInput;
    localStorage.setItem('storeName', storeName);
    document.getElementById('storeNameDisplay').textContent = `Welcome to ${storeName}`;
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('store-info-card').classList.remove('hidden');
    document.getElementById('sales-generate-card').classList.remove('hidden');
  } else {
    alert('Please enter a valid store name!');
  }
}

// সেল জেনারেট করা
function generateSale() {
  const productName = document.getElementById('productName').value.trim();
  const quantity = document.getElementById('quantity').value.trim() || 1;
  const price = document.getElementById('price').value.trim();

  if (productName && price) {
    const total = parseFloat(price) * parseInt(quantity);
    const sale = {
      storeName,
      productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      total
    };

    // সেল ডেটা লোকাল স্টোরেজে সেভ করা
    salesData.push(sale);
    localStorage.setItem('salesData', JSON.stringify(salesData));

    // লাস্ট সেল আপডেট করা
    updateLastSale(sale);
    alert(`Sale Generated for: ${productName}, Total: ৳${total.toFixed(2)}`);

    // ইনপুট ফিল্ড ক্লিয়ার করা
    document.getElementById('productName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
  } else {
    alert('Please fill in all required fields!');
  }
}

// লাস্ট সেল আপডেট করা
function updateLastSale(sale) {
  const lastSaleDetails = `
    <p><strong>Store Name:</strong> ${sale.storeName}</p>
    <p><strong>Product Name:</strong> ${sale.productName}</p>
    <p><strong>Quantity:</strong> ${sale.quantity}</p>
    <p><strong>Price per Unit:</strong> ৳${sale.price.toFixed(2)}</p>
    <p><strong>Total:</strong> ৳${sale.total.toFixed(2)}</p>
  `;
  document.getElementById('lastSaleDetails').innerHTML = lastSaleDetails;
}

// লাস্ট সেল প্রিন্ট করা
function printLastSale() {
  const printContent = document.getElementById('lastSaleDetails').innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Print Last Sale</title></head><body>');
  printWindow.document.write(printContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

// লাস্ট সেল টগল করা
function toggleLastSale() {
  const lastSaleCard = document.getElementById('last-sale-card');
  if (lastSaleCard.classList.contains('hidden')) {
    const lastSale = salesData[salesData.length - 1];
    if (lastSale) {
      updateLastSale(lastSale);
      lastSaleCard.classList.remove('hidden');
    } else {
      alert('No sales data available!');
    }
  } else {
    lastSaleCard.classList.add('hidden');
  }
}

// সেটিংস মেনু শো করা
function showSettings() {
  document.getElementById('main-page').classList.add('hidden');
  document.getElementById('store-info-card').classList.add('hidden');
  document.getElementById('sales-generate-card').classList.add('hidden');

  // লোডিং ইফেক্ট যোগ করা
  setTimeout(() => {
    document.getElementById('dashboard').classList.remove('hidden');
  }, 1000);
}

// হোম পেজে ফিরে যাওয়া
function goToHome() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('store-info-card').classList.remove('hidden');
  document.getElementById('sales-generate-card').classList.remove('hidden');
}

// সেল হিস্ট্রি আপডেট করা
function updateSalesHistory() {
  const historyContainer = document.getElementById('salesHistory');
  historyContainer.innerHTML = '';
  salesData.slice(-5).reverse().forEach((sale, index) => {
    const saleEntry = `
      <div>
        <p><strong>${index + 1}. Product Name:</strong> ${sale.productName}</p>
        <p><strong>Quantity:</strong> ${sale.quantity}</p>
        <p><strong>Total:</strong> ৳${sale.total.toFixed(2)}</p>
      </div>
      <hr>
    `;
    historyContainer.innerHTML += saleEntry;
  });
}

// ক্লোজ স্টোর ফাংশন
function closeStore() {
  if (confirm('Are you sure you want to close the store?')) {
    if (confirm('This will reset all data. Proceed?')) {
      localStorage.clear();
      salesData = [];
      alert('Store data cleared!');
      location.reload();
    }
  }
}
