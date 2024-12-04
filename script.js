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
  const salesDateFilter = document.getElementById('salesDateFilter');
  const salesItemFilter = document.getElementById('salesItemFilter');
  
  // Check for dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Toggle theme
  themeToggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Menu toggle functionality
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.remove('hidden');
  });

  closeMenuBtn.addEventListener('click', () => {
    sideMenu.classList.add('hidden');
  });

  // Shop Name Activation
  let shopName = localStorage.getItem('shopName');
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

  // Sales History Filter
  salesHistoryBtn.addEventListener('click', () => {
    // Fetch and display sales history (mock data for now)
    const salesData = [
      { date: '2024-12-01', item: 'Product 1', amount: 200 },
      { date: '2024-12-02', item: 'Product 2', amount: 300 }
    ];

    salesHistoryContainer.innerHTML = salesData.map(sale => `
      <div>
        <strong>Date:</strong> ${sale.date} <br>
        <strong>Item:</strong> ${sale.item} <br>
        <strong>Amount:</strong> $${sale.amount}
      </div>
    `).join('');
  });
});
