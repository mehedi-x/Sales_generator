document.addEventListener("DOMContentLoaded", () => {
  let totalSales = 0;
  const totalSalesDisplay = document.getElementById("total-sales");
  const salesHistory = [];

  document.getElementById("generate-sale").addEventListener("click", () => {
    const productName = document.getElementById("product-name").value.trim();
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseInt(document.getElementById("product-quantity").value);

    if (productName && productPrice > 0 && productQuantity > 0) {
      const sale = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        total: productPrice * productQuantity,
      };
      salesHistory.push(sale);
      totalSales += sale.total;
      totalSalesDisplay.textContent = `৳${totalSales}`;
      alert(`Sale added: ${sale.name} - ৳${sale.total}`);
    }
  });
});
