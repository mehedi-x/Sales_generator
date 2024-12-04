document.addEventListener('DOMContentLoaded', () => {
  const shopNameInput = document.getElementById('shopNameInput');
  const activateShopBtn = document.getElementById('activateShopBtn');
  const dashboard = document.getElementById('dashboard');
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const salesHistoryBtn = document.getElementById('viewSalesBtn');
  const salesHistoryContainer = document.getElementById('salesHistoryContainer');
  const closeSalesHistory = document.getElementById('closeSalesHistory');
  const changeShopNameBtn = document.getElementById('changeShopNameBtn');
  const newShopNameInput = document.getElementById('newShopName');
  const totalSalesElement = document.getElementById('totalSales');
  const productNameInput = document.getElementById('productName');
  const productPriceInput = document.getElementById('productPrice');
  const productQuantityInput = document.getElementById('productQuantity');
  const addToSaleBtn = document.getElementById('addToSaleBtn');
  const salesHistoryData = document.getElementById('salesHistoryData');
  const downloadPDFBtn = document.getElementById('downloadPDF');
  const saleForm = document.getElementById('saleForm');

  let salesData = [];

  // Shop Activation
  if (localStorage.getItem('shopName')) {
    document.getElementById('shopActivation').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    totalSalesElement.textContent = `Total Sales: 0.00৳`;
  }

  activateShopBtn.addEventListener('click', () => {
    const shopName = shopNameInput.value.trim();
    if (shopName) {
      localStorage.setItem('shopName', shopName);
      dashboard.classList.remove('hidden');
      document.getElementById('shopActivation').classList.add('hidden');
      totalSalesElement.textContent = `Total Sales: 0.00৳`;
    }
  });

  // Menu toggle
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('hidden');
  });

  closeMenuBtn.addEventListener('click', () => {
    sideMenu.classList.add('hidden');
  });

  // Sales History
  salesHistoryBtn.addEventListener('click', () => {
    salesHistoryContainer.classList.toggle('hidden');
  });

  closeSalesHistory.addEventListener('click', () => {
    salesHistoryContainer.classList.add('hidden');
  });

  // Change Shop Name
  changeShopNameBtn.addEventListener('click', () => {
    const newShopName = newShopNameInput.value.trim();
    if (newShopName) {
      localStorage.setItem('shopName', newShopName);
      alert('Shop name updated!');
    }
  });

  // Add Sale
  saleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = productNameInput.value.trim();
    const productPrice = parseFloat(productPriceInput.value);
    const productQuantity = parseInt(productQuantityInput.value);

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity)) {
      const sale = {
        productName,
        productPrice,
        productQuantity,
        total: productPrice * productQuantity
      };

      salesData.push(sale);

      // Update total sales
      const totalSales = salesData.reduce((acc, sale) => acc + sale.total, 0);
      totalSalesElement.textContent = `Total Sales: ${totalSales.toFixed(2)}৳`;

      // Clear inputs
      productNameInput.value = '';
      productPriceInput.value = '';
      productQuantityInput.value = '';

      alert('Sale Added Successfully');
    }
  });

  // View Sales History
  const viewSalesHistory = () => {
    salesHistoryData.innerHTML = '';
    salesData.forEach(sale => {
      const saleDiv = document.createElement('div');
      saleDiv.textContent = `${sale.productName} - ${sale.productQuantity} x ${sale.productPrice}৳ = ${sale.total}৳`;
      salesHistoryData.appendChild(saleDiv);
    });
  };

  // Download PDF
  downloadPDFBtn.addEventListener('click', () => {
    alert('Download PDF functionality will be implemented here.');
  });

  // Initially view sales history if data is available
  if (salesData.length > 0) {
    viewSalesHistory();
  }
});
