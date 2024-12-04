let salesData = [];  // Array to hold sales data

// Check if Shop Name is saved
function checkShopName() {
    const shopName = localStorage.getItem('shopName');
    if (shopName) {
        document.getElementById('shop-name-section').style.display = 'none';
    } else {
        document.getElementById('shop-name-section').style.display = 'block';
    }
}

// Save Shop Name to LocalStorage
function saveShopName() {
    const shopName = document.getElementById('shop-name').value;
    if (shopName) {
        localStorage.setItem('shopName', shopName);
        document.getElementById('shop-name-section').style.display = 'none';
    } else {
        alert('Please enter a valid shop name.');
    }
}

// Show Sales History
document.getElementById("sales-history").addEventListener("click", function() {
    document.querySelector(".sales-history-section").style.display = "block";
    document.querySelector(".settings-section").style.display = "none";
    displaySalesData(salesData);
});

// Show Settings
document.getElementById("settings").addEventListener("click", function() {
    document.querySelector(".settings-section").style.display = "block";
    document.querySelector(".sales-history-section").style.display = "none";
});

// Filter sales data
document.getElementById("filter-btn").addEventListener("click", function() {
    const filterDate = document.getElementById("filter-date").value;
    const filterTime = document.getElementById("filter-time").value;
    const filterYear = document.getElementById("filter-year").value;

    const filteredData = salesData.filter(item => {
        return (filterDate ? item.date === filterDate : true) &&
               (filterTime ? item.time === filterTime : true) &&
               (filterYear ? item.year === filterYear : true);
    });

    displaySalesData(filteredData);
});

// Display sales data dynamically
function displaySalesData(data) {
    const salesList = document.getElementById("sales-list");
    salesList.innerHTML = "";  // Clear previous data

    const visibleData = data.slice(0, 5); // Show only the first 5 items
    visibleData.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `Product: ${item.productName}, Price: ৳${item.price}, Date: ${item.date}`;
        salesList.appendChild(div);
    });

    // Load more data when scrolling
    salesList.addEventListener('scroll', function() {
        if (salesList.scrollTop + salesList.clientHeight >= salesList.scrollHeight) {
            const additionalData = data.slice(visibleData.length, visibleData.length + 5);
            additionalData.forEach(item => {
                const div = document.createElement("div");
                div.innerHTML = `Product: ${item.productName}, Price: ৳${item.price}, Date: ${item.date}`;
                salesList.appendChild(div);
            });
        }
    });
}

// Export File
document.getElementById("export-file").addEventListener("click", function() {
    const data = JSON.stringify(salesData);
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales_history.json";
    link.click();
});

// Open Import Modal
document.getElementById("import-file").addEventListener("click", function() {
    document.getElementById("import-modal").style.display = "block";
});

// Close Import Modal
function closeModal() {
    document.getElementById("import-modal").style.display = "none";
}

// Import File
function importFile() {
    const file = document.getElementById("file-upload").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const importedData = JSON.parse(event.target.result);
            salesData = importedData; // Update salesData array with imported data
            displaySalesData(salesData); // Display the imported data
            closeModal(); // Close modal
        };
        reader.readAsText(file);
    }
}

// Handle Add Sale
document.getElementById("add-sale-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission

    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const quantity = document.getElementById("quantity").value;
    const date = new Date().toISOString().split('T')[0];  // Current date in YYYY-MM-DD format
    const time = new Date().toLocaleTimeString();  // Current time in HH:MM:SS format
    const year = new Date().getFullYear();  // Current year

    if (productName && productPrice && quantity) {
        const newSale = {
            productName,
            price: productPrice,
            quantity,
            date,
            time,
            year
        };
        salesData.push(newSale);
        displaySalesData(salesData);  // Display updated sales data
        alert('Sale added successfully!');
    } else {
        alert('Please fill out all fields.');
    }
});

// Call checkShopName on page load
window.onload = checkShopName;
