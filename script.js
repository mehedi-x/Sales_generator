<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Store</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }

        .main-wrapper {
            max-width: 1100px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .total-sale {
            font-size: 1.2em;
            font-weight: bold;
        }

        .menu-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.8em;
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
        }

        .menu-btn:hover {
            transform: scale(1.1);
        }

        .form-section {
            background-color: #ffffff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
        }

        .form-section h2 {
            font-size: 1.4em;
            margin-bottom: 10px;
            color: #333;
            text-align: center;
        }

        .form-section input {
            margin: 8px 0;
            padding: 12px;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1em;
        }

        .form-section button {
            padding: 12px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
        }

        .form-section button:hover {
            background-color: #45a049;
            transform: translateY(-3px);
        }

        .sales-section {
            background-color: #eaf9ea;
            border: 1px solid #4CAF50;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 15px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .sales-section h3 {
            font-size: 1.5em;
            color: #333;
            margin: 0 0 10px 0;
        }

        .sale-summary {
            font-size: 1.0em;
            color: #4CAF50;
            font-weight: bold;
        }

        .sale-summary strong {
            font-size: 0.9em;
        }

        footer {
            background-color: #4CAF50;
            color: white;
            padding: 15px 0;
            text-align: center;
            border-radius: 10px;
            margin-top: 20px;
        }

        footer nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            margin: 0 0 10px;
        }

        footer nav ul li {
            margin: 0 15px;
        }

        footer nav ul li a {
            text-decoration: none;
            color: white;
            font-size: 1.1em;
            transition: color 0.3s ease-in-out;
        }

        footer nav ul li a:hover {
            color: #a7ffae;
        }

        /* Sales History Table */
        #sales-history-container {
            margin-top: 20px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        #sales-history-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        #sales-history-table th, #sales-history-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        #sales-history-table th {
            background-color: #4CAF50;
            color: white;
            font-size: 1.1em;
        }

        #sales-history-table td {
            background-color: #f9f9f9;
        }

        #sales-history-table tr:hover {
            background-color: #f1f1f1;
        }

        /* Menu Popup */
        .menu-popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            z-index: 1000;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
        }

        .menu-popup a {
            color: white;
            text-decoration: none;
            font-size: 1.5em;
            margin: 10px 0;
        }

        .menu-popup button {
            background: none;
            border: none;
            color: white;
            font-size: 2em;
            margin-top: 20px;
            cursor: pointer;
        }

        /* Store Closure Modal */
        #close-store-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        #close-store-modal h2 {
            margin-bottom: 20px;
        }

        #close-store-modal button {
            background-color: #ff3b30;
            color: white;
            font-size: 1.2em;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #close-store-modal button:hover {
            background-color: #d62d20;
        }

        #full-sales-list {
            margin: 20px 0;
            max-height: 300px;
            overflow-y: auto;
        }

        #full-sales-list li {
            font-size: 1.1em;
            margin: 10px 0;
        }

    </style>

</head>

<body>

<div class="main-wrapper">

    <!-- Header -->
    <header>
        <div class="header-left">
            <button class="menu-btn" id="menu-btn">☰</button>
        </div>
        <div class="header-right">
            <div class="total-sale" id="total-sale">Total Sale: ৳0.00</div>
        </div>
    </header>

    <!-- Last Sale (Calculator View) -->
    <div class="sales-section">
        <h3>Last Sale</h3>
        <div class="sale-summary" id="sale-summary">No sales yet.</div>
    </div>

    <!-- Product Entry -->
    <div class="form-section">
        <h2>Product Entry</h2>
        <input type="text" id="shop-name" placeholder="Shop Name">
        <input type="text" id="product-name" placeholder="Product Name" list="suggested-products">
        <datalist id="suggested-products"></datalist>
        <input type="number" id="product-price" placeholder="Product Price">
        <input type="number" id="product-quantity" placeholder="Product Quantity">
        <button onclick="generateSale()">Generate Sale</button>
    </div>

    <!-- Sales History -->
    <div id="sales-history-container">
        <h3>Sales History</h3>
        <table id="sales-history-table">
            <thead>
                <tr>
                    <th>Shop</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody id="sales-history-body">
                <!-- Sales records will go here -->
            </tbody>
        </table>
    </div>

    <!-- Menu Popup -->
    <div class="menu-popup" id="menu-popup">
        <a href="#" onclick="openCloseStoreModal()">Close Store</a>
        <a href="#" onclick="downloadSalesHistory()">Download Sales History</a>
        <button onclick="closeMenu()">Close</button>
    </div>

    <!-- Store Closure Modal -->
    <div id="close-store-modal">
        <h2>Are you sure you want to close the store?</h2>
        <button onclick="closeStore()">Yes, Close Store</button>
        <button onclick="cancelStoreClosure()">Cancel</button>
        <ul id="full-sales-list"></ul>
    </div>

</div>

<script>
    let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
    let suggestedProducts = new Set();

    // Add product and generate sale
    function generateSale() {
        const shopName = document.getElementById("shop-name").value;
        const productName = document.getElementById("product-name").value;
        const productPrice = parseFloat(document.getElementById("product-price").value);
        const productQuantity = parseFloat(document.getElementById("product-quantity").value) || 1;

        if (!shopName || !productName || isNaN(productPrice)) {
            alert("Please fill out all required fields.");
            return;
        }

        const product = {
            shopName,
            productName,
            productPrice,
            productQuantity,
            total: productPrice * productQuantity,
        };

        // Update sales data and save to local storage
        salesData.push(product);
        localStorage.setItem("salesData", JSON.stringify(salesData));

        // Update suggestions and sales display
        suggestedProducts.add(productName);
        updateSuggestions();
        updateLastSaleView(product);
        resetForm();
        updateSalesHistory();
    }

    // Update only the last sale view
    function updateLastSaleView(lastSale) {
        const saleSummary = document.getElementById("sale-summary");
        saleSummary.innerHTML = `
            <h3>Last Sale Summary:</h3>
            <p><strong>Shop:</strong> ${lastSale.shopName}</p>
            <p><strong>Product:</strong> ${lastSale.productName}</p>
            <p><strong>Quantity:</strong> ${lastSale.productQuantity}</p>
            <p><strong>Total:</strong> ৳${lastSale.total.toFixed(2)}</p>
        `;
    }

    // Update datalist for suggested products
    function updateSuggestions() {
        const datalist = document.getElementById("suggested-products");
        datalist.innerHTML = "";
        suggestedProducts.forEach((product) => {
            const option = document.createElement("option");
            option.value = product;
            datalist.appendChild(option);
        });
    }

    // Reset input fields
    function resetForm() {
        document.getElementById("shop-name").value = "";
        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-quantity").value = "";
    }

    // Open close store modal and show full sales history
    function openCloseStoreModal() {
        const fullSalesList = document.getElementById("full-sales-list");
        fullSalesList.innerHTML = "";

        salesData.forEach((sale, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${index + 1}.</strong> Shop: ${sale.shopName}, Product: ${sale.productName},
                Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}
            `;
            fullSalesList.appendChild(listItem);
        });

        document.getElementById("close-store-modal").style.display = "block";
    }

    // Download sales history as PDF
    function downloadSalesHistory() {
        const salesSummary = salesData
            .map(
                (sale, index) =>
                    `${index + 1}. Shop: ${sale.shopName}, Product: ${sale.productName}, Quantity: ${sale.productQuantity}, Total: ৳${sale.total.toFixed(2)}`
            )
            .join("\n");

        const blob = new Blob([salesSummary], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Sales_History.pdf";
        link.click();

        URL.revokeObjectURL(url);
    }

    // Close store and clear sales data
    function closeStore() {
        salesData = [];
        localStorage.removeItem("salesData");
        document.getElementById("close-store-modal").style.display = "none";
        alert("Store closed and all sales data cleared!");
        location.reload();
    }

    // Cancel store closure
    function cancelStoreClosure() {
        document.getElementById("close-store-modal").style.display = "none";
    }

    // Initialize sales view on page load
    window.onload = function () {
        if (salesData.length > 0) {
            updateLastSaleView(salesData[salesData.length - 1]);
        }
    };
</script>

</body>

</html>
