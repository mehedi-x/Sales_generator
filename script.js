document.addEventListener('DOMContentLoaded', () => {
  const storeNameInput = document.getElementById('store-name-input');
  const setStoreNameButton = document.getElementById('set-store-name');
  const totalSalesDisplay = document.getElementById('total-sales');
  const salesChartCtx = document.getElementById('sales-chart').getContext('2d');

  let totalSales = 0;
  let salesHistory = [];
  let salesChart;

  const updateChart = () => {
    if (!salesChart) {
      salesChart = new Chart(salesChartCtx, {
        type: 'line',
        data: {
          labels: salesHistory.map((_, i) => `Sale ${i + 1}`),
          datasets: [{
            label: 'Sales Amount',
            data: salesHistory.map(sale => sale.total),
            borderColor: '#4e4376',
            backgroundColor: 'rgba(78, 67, 118, 0.2)',
            fill: true
          }]
        }
      });
    } else {
      salesChart.data.labels = salesHistory.map((_, i) => `Sale ${i + 1}`);
      salesChart.data.datasets[0].data = salesHistory.map(sale => sale.total);
      salesChart.update();
    }
  };

  setStoreNameButton.addEventListener('click', () => {
    const storeName = storeNameInput.value.trim();
    if (storeName) {
      localStorage.setItem('storeName', storeName);
      alert(`Welcome to ${storeName}!`);
    }
  });

  document.getElementById('add-sale').addEventListener('click', () => {
    const name = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value, 10);

    if (name && price > 0 && quantity > 0) {
      const sale = { name, price, quantity, total: price * quantity, time: new Date().toISOString() };
      salesHistory.push(sale);
      totalSales += sale.total;
      totalSalesDisplay.textContent = `৳${totalSales}`;
      updateChart();
    }
  });
});
