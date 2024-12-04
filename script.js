document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const shopNameInput = document.getElementById('shopNameInput');
  const activateShopBtn = document.getElementById('activateShopBtn');
  const dashboard = document.getElementById('dashboard');
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const salesHistoryBtn = document.getElementById('viewSalesBtn');
  const salesHistoryContainer = document.getElementById('salesHistoryContainer');
  const closeSalesHistory = document.getElementById('closeSalesHistory');
  const downloadPDF = document.getElementById('downloadPDF');
  
  // Theme toggle functionality
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Activate Shop
  activateShopBtn.addEventListener('click', () => {
    const shopName = shopNameInput.value.trim();
    if (shopName) {
      localStorage.setItem('shopName', shopName);
      dashboard.classList.remove('hidden');
      document.getElementById('shopActivation').classList.add('hidden');
      document.querySelector('header .total-sales').textContent = `Total Sales: 0.00৳`;
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

  // Download PDF
  downloadPDF.addEventListener('click', () => {
    alert('Download PDF functionality will be implemented here.');
  });
});
