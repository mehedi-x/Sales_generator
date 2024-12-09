document.addEventListener("DOMContentLoaded", () => {
    const storeNameInput = document.getElementById("storeName");
    const setupStoreBtn = document.getElementById("setupStore");
    const productEntrySection = document.getElementById("productEntry");
    const addedProductsSection = document.getElementById("addedProducts");
    const productListTable = document.getElementById("productList");
    const totalSales = document.getElementById("totalSales");

    let salesData = JSON.parse(localStorage.getItem("salesData")) || [];
    let totalSalesAmount = parseFloat(localStorage.getItem("totalSales")) || 0;

    totalSales.textContent = totalSalesAmount.toFixed(2);

    // Initialize store
    if (localStorage.getItem("storeName")) {
        storeNameInput.parentElement.style.display = "none";
        productEntrySection.style.display = "block";
    }

    // Set store name
    setupStoreBtn.addEventListener("click", () => {
        const storeName = storeNameInput.value.trim();
        if (storeName) {
            localStorage.setItem("storeName", storeName);
            storeNameInput.parentElement.style.display = "none";
            productEntrySection.style.display = "block";
        } else {
            alert("Please enter a valid store name.");
        }
    });

    // Product list management
    const productList = [];

    document.getElementById("addToSale").addEventListener("click", () => {
        const productName = document.getElementById("productName").value.trim();
        const productPrice = parseFloat(document.getElementById("productPrice").value);
        const productQuantity = parseInt(document.getElementById("productQuantity").value);

        if (productName && productPrice > 0 && productQuantity > 0) {
            const productTotal = productPrice * productQuantity;

            productList.push({
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                total: productTotal,
            });

            updateProductList();
            addedProductsSection.style.display = "block";
            clearProductInputs();
        } else {
            alert("Please provide valid product details.");
        }
    });

    function updateProductList() {
        productListTable.innerHTML = productList.map((product, index) => `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${product.total.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            </tr>
        `).join("");

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", () => {
                removeProduct(button.dataset.index);
            });
        });
    }

    function removeProduct(index) {
        productList.splice(index, 1);
        updateProductList();
        if (productList.length === 0) {
            addedProductsSection.style.display = "none";
        }
    }

    function clearProductInputs() {
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
    }

    // Finalize sale
    document.getElementById("finalizeSale").addEventListener("click", () => {
        if (productList.length === 0) {
            alert("No products to finalize.");
            return;
        }

        const totalSale = productList.reduce((sum, product) => sum + product.total, 0);

        totalSalesAmount += totalSale;
        totalSales.textContent = totalSalesAmount.toFixed(2);

        salesData = salesData.concat(productList.map(product => ({
            ...product,
            time: new Date().toLocaleString(),
        })));

        localStorage.setItem("salesData", JSON.stringify(salesData));
        localStorage.setItem("totalSales", totalSalesAmount);

        alert(`Sale finalized! Total: ৳${totalSale.toFixed(2)}`);

        productList.length = 0;
        updateProductList();
        addedProductsSection.style.display = "none";
    });

    // View sales history
    document.getElementById("viewHistory").addEventListener("click", () => {
        const historyContent = salesData.map(sale => `
            <div class="sale-item">
                <p>Product: ${sale.name}</p>
                <p>Price: ৳${sale.price.toFixed(2)}</p>
                <p>Quantity: ${sale.quantity}</p>
                <p>Total: ৳${sale.total.toFixed(2)}</p>
                <p>Time: ${sale.time}</p>
            </div>
        `).join("");
        document.getElementById("historyModal").innerHTML = historyContent || "<p>No sales history available.</p>";
        document.getElementById("historyModal").style.display = "block";
    });

    // Download history
    document.getElementById("downloadHistory").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(salesData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sales_history.json";
        a.click();
        URL.revokeObjectURL(url);
    });

    // Close store
    document.getElementById("closeStore").addEventListener("click", () => {
        if (confirm("Are you sure you want to close the store? This will clear all data.")) {
            localStorage.clear();
            location.reload();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menuOptions = document.getElementById("menuOptions");

    // Toggle menu visibility on click
    menuToggle.addEventListener("click", () => {
        if (menuOptions.style.display === "block") {
            menuOptions.style.display = "none";
        } else {
            menuOptions.style.display = "block";
        }
    });

    // Close the menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !menuOptions.contains(event.target)) {
            menuOptions.style.display = "none";
        }
    });

    // Add functionality for each menu option
    document.getElementById("viewHistory").addEventListener("click", () => {
        alert("Displaying full sales history...");
        // Add your logic here
    });

    document.getElementById("downloadHistory").addEventListener("click", () => {
        alert("Downloading sales history...");
        // Add your logic here
    });

    document.getElementById("settings").addEventListener("click", () => {
        alert("Opening settings...");
        // Add your logic here
    });

    document.getElementById("closeStore").addEventListener("click", () => {
        const confirmation = confirm("Are you sure you want to close the store?");
        if (confirmation) {
            alert("Store closed.");
            // Add your logic here
        }
    });
});

// Select elements
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const totalSalesElement = document.getElementById('totalSales');

// Function to get products from LocalStorage
function getProductsFromStorage() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Function to save products to LocalStorage
function saveProductsToStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to update product list in UI
function updateProductListUI() {
    const products = getProductsFromStorage();
    let totalSales = 0;

    productList.innerHTML = ''; // Clear existing list
    products.forEach((product, index) => {
        const total = product.price * product.quantity;
        totalSales += total;

        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price} ৳</td>
                <td>${product.quantity}</td>
                <td>${total.toFixed(2)} ৳</td>
                <td>
                    <button onclick="deleteProduct(${index})" class="danger-button">Remove</button>
                </td>
            </tr>
        `;
        productList.innerHTML += row;
    });

    totalSalesElement.textContent = totalSales.toFixed(2);
}

// Function to delete a product
function deleteProduct(index) {
    const products = getProductsFromStorage();
    products.splice(index, 1); // Remove product by index
    saveProductsToStorage(products);
    updateProductListUI(); // Update UI
}

// Event listener for form submission
productForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form refresh

    // Get form values
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value) || 1; // Default to 1 if empty

    // Validate inputs
    if (!name || isNaN(price) || price <= 0) {
        alert('Please enter valid product details!');
        return;
    }

    // Save product to LocalStorage
    const products = getProductsFromStorage();
    products.push({ name, price, quantity });
    saveProductsToStorage(products);

    // Update UI
    updateProductListUI();

    // Clear form
    productForm.reset();
});

// Initialize UI on page load
updateProductListUI();

