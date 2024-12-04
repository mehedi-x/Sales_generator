document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn');
  const shopNameInput = document.getElementById('shopNameInput');
  const activateShopBtn = document.getElementById('activateShopBtn');
  const dashboard = document.getElementById('dashboard');
  const addSaleBtn = document.getElementById('addSaleBtn');
  const viewSalesBtn = document.getElementById('viewSalesBtn');
  const salesForm = document.getElementById('salesForm');
  const saleForm = document.getElementById('saleForm');
  const totalSales = document.getElementById('totalSales');
  const salesHistory = document.getElementById('salesHistory');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const salesChart = document.getElementById('salesChart');
  const salesDateFilter = document.getElementById('salesDateFilter');
  const salesItemFilter = document.getElementById('salesItemFilter');

  let shopName = localStorage.getItem('shopName');
  let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
  let total = 0;

  // Update total sales
  function updateTotalSales() {
    total = salesData.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
    totalSales.textContent = `Total Sales: $${total.toFixed(2)}`;
  }

  // Display chart
  function displayChart() {
    const labels = salesData.map(sale => sale.itemName);
    const data = salesData.map(sale => sale.price * sale.quantity);
    
    const chart = new Chart(salesChart, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales',
          data: data,
          backgroundColor: '#4CAF50',
          borderColor: '#45a049',
          borderWidth: 1
        }]
      }
    });
  }

  // Filter sales history
  function filterSales() {
    const dateFilter = salesDateFilter.value;
    const itemFilter = salesItemFilter.value.toLowerCase();

    const filteredData = salesData.filter(sale => {
      const dateMatch = dateFilter ? new Date(sale.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true;
      const itemMatch = itemFilter ? sale.itemName.toLowerCase().includes(itemFilter) : true;
      return dateMatch && itemMatch;
    });

    displaySalesHistory(filteredData);
  }

  // Display sales history
  function displaySalesHistory(data = salesData) {
    salesHistory.innerHTML = '<h2>Sales History</h2>';
    data.forEach(sale => {
      const saleDiv = document.createElement('div');
      saleDiv.textContent = `${sale.itemName} - $${sale.price} x ${sale.quantity} = $${(sale.price * sale.quantity).toFixed(2)} | Date: ${new Date(sale.date).toLocaleDateString()}`;
      salesHistory.appendChild(saleDiv);
    });
  }

  // Save sales data to local storage
  function saveSaleData() {
    localStorage.setItem('salesData', JSON.stringify(salesData));
    updateTotalSales();
    displayChart();
  }

  // Activate shop
  if (shopName) {
    dashboard.classList.remove('hidden');
    activateShopBtn.classList.add('hidden');
    shopNameInput.classList.add('hidden');
    totalSales.classList.remove('hidden');
    updateTotalSales();
    displayChart();
  }

  // Shop activation
  activateShopBtn.addEventListener('click', function() {
    if (shopNameInput.value.trim() !== '') {
      shopName = shopNameInput.value.trim();
      localStorage.setItem('shopName', shopName);
      dashboard.classList.remove('hidden');
      activateShopBtn.classList.add('hidden');
      shopNameInput.classList.add('hidden');
      totalSales.classList.remove('hidden');
      updateTotalSales();
    }
  });

  // Add Sale Button
  addSaleBtn.addEventListener('click', function() {
    salesForm.classList.remove('hidden');
  });

  // Submit sale form
  saleForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemPrice && itemQuantity) {
      const sale = { itemName, price: itemPrice, quantity: itemQuantity, date: new Date() };
      salesData.push(sale);
      saveSaleData();
      salesForm.classList.add('hidden');
      displaySalesHistory();
    }
  });

  // View sales history
  viewSalesBtn.addEventListener('click', function() {
    salesHistory.classList.remove('hidden');
    displaySalesHistory();
  });

  // Export Sales
  exportBtn.addEventListener('click', function() {
    const blob = new Blob([JSON.stringify(salesData)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sales_report.json';
    link.click();
  });

  // Import Sales
  importBtn.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      const importedData = JSON.parse(reader.result);
      salesData = [...salesData, ...importedData];
      saveSaleData();
      displaySalesHistory();
    };
    reader.readAsText(file);
  });

  // Filter sales
  salesDateFilter.addEventListener('change', filterSales);
  salesItemFilter.addEventListener('input', filterSales);
});
