// জাভাস্ক্রিপ্ট কোড

// পূর্ববর্তী সেলস ডাটা লোড করা
let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
let shopNameStored = localStorage.getItem("shopName");

// মোট সেল আপডেট করা
function updateTotalSales() {
    const totalSales = salesData.reduce((acc, sale) => acc + sale.total, 0);
    document.getElementById("total-sale").innerText = `Total Sale: ৳${totalSales.toFixed(2)}`;
}

// শেষ সেল রেন্ডার করা
function updateLastSale() {
    if (salesData.length === 0) {
        document.getElementById("sale-summary").innerText = "No sales yet.";
    } else {
        const lastSale = salesData[salesData.length - 1];
        document.getElementById("sale-summary").innerText = `
            Shop: ${lastSale.shopName}, Product: ${lastSale.productName}, 
            Quantity: ${lastSale.productQuantity}, Total: ৳${lastSale.total.toFixed(2)}
        `;
    }
}

// নতুন সেল জেনারেট করা
function generateSale() {
    const shopName = document.getElementById("shop-name").value.trim();
    const productName = document.getElementById("product-name").value.trim();
    const productPrice = parseFloat(document.getElementById("product-price").value) || 0;
    const productQuantity = parseInt(document.getElementById("product-quantity").value) || 0;

    // ইনপুট যাচাই করা
    if (!shopName || !productName || productPrice <= 0 || productQuantity <= 0) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    // শপের নাম সেভ করা (যদি না থাকে)
    if (!shopNameStored) {
        localStorage.setItem("shopName", shopName);
        shopNameStored = shopName;
    }

    // সেল ডাটা তৈরি করা
    const total = productPrice * productQuantity;
    const saleRecord = {
        shopName,
        productName,
        productPrice,
        productQuantity,
        total,
        time: new Date().toLocaleString(),
    };

    // ডাটা সেভ এবং আপডেট
    salesData.push(saleRecord);
    localStorage.setItem("salesData", JSON.stringify(salesData));

    // ইন্টারফেস আপডেট করা
    updateLastSale();
    updateTotalSales();
}

// মেনু ফাংশন
function openFullSalesHistory() {
    if (salesData.length === 0) {
        alert("No sales history available.");
        return;
    }

    const salesHistory = salesData.map(sale => `
        Shop: ${sale.shopName}, Product: ${sale.productName}, 
        Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}, 
        Time: ${sale.time}
    `).join('\n\n');

    alert("Full Sales History:\n\n" + salesHistory);
}

function downloadSalesHistory() {
    if (salesData.length === 0) {
        alert("No sales data to download.");
        return;
    }

    const blob = new Blob([JSON.stringify(salesData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'salesHistory.json';
    a.click();
}

function closeStore() {
    const confirmClose = confirm("Are you sure you want to clear all data?");
    if (confirmClose) {
        localStorage.clear();
        salesData = [];
        shopNameStored = null;
        updateTotalSales();
        updateLastSale();
        alert("Store data cleared.");
    }
}

// মেনু টগল
const menuBtn = document.getElementById('menu-btn');
const menuPopup = document.getElementById('menu-popup');

menuBtn.addEventListener('click', function () {
    menuPopup.style.display = menuPopup.style.display === 'flex' ? 'none' : 'flex';
});

function closeMenu() {
    menuPopup.style.display = 'none';
}

// পেজ লোড হওয়ার পর ডাটা রেন্ডার করা
document.addEventListener("DOMContentLoaded", function () {
    updateTotalSales();
    updateLastSale();
});
