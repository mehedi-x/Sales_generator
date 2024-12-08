document.addEventListener('DOMContentLoaded', () => {
  const storeNameInput = document.getElementById('store-name-input');
  const setStoreNameButton = document.getElementById('set-store-name');
  const storeNameDisplay = document.getElementById('store-name-display');
  const totalSalesDisplay = document.getElementById('total-sales');
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const productQuantity = document.getElementById('product-quantity');
  const addSaleButton = document.getElementById('add-sale');
  const saleSummary = document.getElementById('sale-summary');
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');
  const closeModalButton = document.getElementById('close-modal');
  const modal = document.getElementById('modal');
  const historyContainer = document.getElementById('history');

  let salesHistory = [];
  let totalSales = 0;

  // Set store name
  setStoreNameButton.addEventListener('click', () => {
    const storeName = storeNameInput.value.trim();
    if (storeName) {
      localStorage.setItem('storeName', storeName);
      storeNameDisplay.textContent = storeName;
      storeNameInput.style.display = 'none';
      setStoreNameButton.style.display = 'none';
    }
  });

  // Load store name on refresh
  const savedStoreName = localStorage.getItem('storeName');
  if (savedStoreName) {
    storeNameDisplay.textContent = savedStoreName;
    storeNameInput.style.display = 'none';
    setStoreNameButton.style.display = 'none';
  }

  // Generate sale
  addSaleButton.addEventListener('click', () => {
    const name = productName.value.trim();
    const price = parseFloat(productPrice.value);
    const quantity = parseInt(productQuantity.value, 10);
    if (name && price > 0 && quantity > 0) {
      const sale = { name, price, quantity, total: price * quantity, time: new Date().toLocaleString() };
      salesHistory.push(sale);
      totalSales += sale.total;

      totalSalesDisplay.textContent = `Total Sales: ৳${totalSales}`;
      saleSummary.innerHTML = `
        Product: ${sale.name} <br>
        Price: ৳${sale.price} <br>
        Quantity: ${sale.quantity} <br>
        Total: ৳${sale.total} <br>
        Time: ${sale.time}
      `;
    }
  });

  // View sales history
  document.getElementById('view-history').addEventListener('click', () => {
    modal.classList.remove('hidden');
    historyContainer.innerHTML = salesHistory.map(sale => `
      <div>
        Product: ${sale.name}, Price: ৳${sale.price}, Quantity: ${sale.quantity}, Total: ৳${sale.total}, Time: ${sale.time}
      </div>
    `).join('');
  });

  closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Download history
  document.getElementById('download-history').addEventListener('click', () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(salesHistory))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'sales_history.json');
    downloadAnchor.click();
  });

  // Close store
  document.getElementById('close-store').addEventListener('click', () => {
    if (confirm('Are you sure you want to close the store?')) {
      salesHistory = [];
      totalSales = 0;
      totalSalesDisplay.textContent = 'Total Sales: ৳0';
      saleSummary.innerHTML = '';
      localStorage.removeItem('storeName');
      storeNameInput.style.display = '';
      setStoreNameButton.style.display = '';
    }
  });

  // Toggle menu
  menuButton.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});
