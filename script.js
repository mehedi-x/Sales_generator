document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const shopNameInput = document.getElementById('shopNameInput');
  const activateShopBtn = document.getElementById('activateShopBtn');
  const dashboard = document.getElementById('dashboard');
  const salesChart = document.getElementById('salesChart');
  const salesHistoryContainer = document.getElementById('salesHistoryContainer');
  const salesDateFilter = document.getElementById('salesDateFilter');
  const salesItemFilter = document.getElementById('salesItemFilter');
  
  let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
  let shopName = localStorage.getItem('shopName') || '';

  // Open/close side menu
  menuBtn.addEventListener('click', () => sideMenu.classList.remove('hidden'));
  closeMenuBtn.addEventListener('click', () => sideMenu.classList.add('hidden'));

  // Activate Shop
  if (shopName) {
    shopNameInput.value = shopName;
    activateShopBtn.classList.add('hidden');
    dashboard.classList.remove('hidden');
  }

  activateShopBtn.addEventListener('click', () => {
    shopName = shopNameInput.value.trim();
    if (shopName) {
      localStorage.setItem('shopName', shopName);
      dashboard.classList.remove('hidden');
      activateShopBtn.classList.add('hidden');
    }
  });

  // Update Total Sales and Chart
  function updateTotalSales() {
    const total = salesData.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
    document.getElementById('totalSales').textContent = `Total Sales: $${total.toFixed(2)}`;

    // Update chart
    const salesItems = salesData.map(sale => sale.itemName);
    const uniqueItems = [...new Set(salesItems)];
    const itemSales = uniqueItems.map(item => {
      return salesData.filter(sale => sale.itemName === item)
                      .reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
    });

    const ctx = salesChart.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: uniqueItems,
        datasets: [{
          label: 'Sales by Item',
          data: itemSales,
          backgroundColor: 'rgba(63, 81, 181, 0.5)',
        }]
      },
    });
  }

  // Add Sale
  document.getElementById('addSaleBtn').addEventListener('click', () => document.getElementById('salesForm').classList.remove('hidden'));

  document.getElementById('saleForm').addEventListener('submit', event => {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemPrice && itemQuantity) {
      const sale = { itemName, price: itemPrice, quantity: itemQuantity, date: new Date() };
      salesData.push(sale);
      localStorage.setItem('salesData', JSON.stringify(salesData));
      updateTotalSales();
      displaySalesHistory();
      document.getElementById('salesForm').classList.add('hidden');
    }
  });

  // Display Sales History
  function displaySalesHistory() {
    salesHistoryContainer.innerHTML = '';
    salesData.forEach(sale => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${sale.itemName}</strong> - $${(sale.price * sale.quantity).toFixed(2)} (${sale.quantity} pcs)`;
      salesHistoryContainer.appendChild(div);
    });
  }

  // Filter Sales History
  salesDateFilter.addEventListener('change', filterSales);
  salesItemFilter.addEventListener('input', filterSales);

  function filterSales() {
    const date = salesDateFilter.value;
    const item = salesItemFilter.value.toLowerCase();

    const filteredSales = salesData.filter(sale => {
      return (!date || sale.date.toISOString().slice(0, 10) === date) &&
             sale.itemName.toLowerCase().includes(item);
    });

    salesHistoryContainer.innerHTML = '';
    filteredSales.forEach(sale => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${sale.itemName}</strong> - $${(sale.price * sale.quantity).toFixed(2)} (${sale.quantity} pcs)`;
      salesHistoryContainer.appendChild(div);
    });
  }

  // Initial load
  updateTotalSales();
});
