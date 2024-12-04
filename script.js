// Function to toggle the menu visibility
function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Function to show the Sales History when the user clicks on it
function showSalesHistory() {
    alert("Sales History option clicked");
    // Here you can implement the logic to show sales history
}

// Function to show the Settings page or option
function showSettings() {
    alert("Settings option clicked");
    // Add the logic to show settings page here (e.g., redirect to settings page)
}

// Function to handle changing software status between Active and Inactive
let softwareStatus = 'Active';  // Default status

function toggleStatus() {
    if (softwareStatus === 'Active') {
        softwareStatus = 'Inactive';
        // Display confirmation popup
        const confirmation = confirm("Are you sure you want to deactivate the software?");
        if (confirmation) {
            document.getElementById('status').textContent = 'Inactive';
            document.getElementById('status').style.color = '#e53935'; // Red color for Inactive
            // Save this change to the server/localStorage or database
            alert("Software status has been changed to Inactive.");
        } else {
            // If user cancels, revert status to Active
            softwareStatus = 'Active';
            document.getElementById('status').textContent = 'Active';
            document.getElementById('status').style.color = '#388e3c'; // Green color for Active
        }
    } else {
        softwareStatus = 'Active';
        document.getElementById('status').textContent = 'Active';
        document.getElementById('status').style.color = '#388e3c'; // Green color for Active
    }
}

// Function to handle the Add New Sale form submission
function addNewSale(event) {
    event.preventDefault();  // Prevent default form submission

    // Get values from the form
    let shopName = document.getElementById('shopName').value;
    let productName = document.getElementById('productName').value;
    let price = document.getElementById('price').value;

    if (shopName && productName && price) {
        // Save the shop name in local storage (only once)
        if (!localStorage.getItem('shopName')) {
            localStorage.setItem('shopName', shopName);
            alert("Shop Name saved locally!");
        }

        // Log the new sale data (you can replace this with an actual database call)
        console.log(`Sale Added: Shop Name - ${shopName}, Product Name - ${productName}, Price - ${price}`);
        
        // Clear the form after submission
        document.getElementById('shopName').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('price').value = '';

        alert("Sale has been added successfully!");
    } else {
        alert("Please fill out all fields.");
    }
}

// Function to initialize the app when it loads
window.onload = function() {
    // Check if shop name is already saved in localStorage and auto-fill the shop name
    if (localStorage.getItem('shopName')) {
        document.getElementById('shopName').value = localStorage.getItem('shopName');
    }
}

// Function to handle the file input (for importing/exporting data)
function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const fileContent = e.target.result;
        console.log(fileContent);
        // Here, you can implement the logic to parse the file and restore the data
        alert("File has been uploaded successfully!");
    };
    
    if (file) {
        reader.readAsText(file);
    }
}

// Function to handle file export (export sales data to a file)
function exportData() {
    const data = [
        { "shopName": "Store1", "productName": "Product A", "price": "100" },
        { "shopName": "Store2", "productName": "Product B", "price": "200" }
    ];

    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales_data.json';
    a.click();

    alert("Data exported successfully!");
}

// Function to filter Sales History based on Date and Time
function filterSalesHistory() {
    const date = document.getElementById('filterDate').value;
    const time = document.getElementById('filterTime').value;

    // You can implement a filtering logic here based on date and time
    console.log(`Filtering Sales History for Date: ${date}, Time: ${time}`);
}

// Function to load more sales history data
function loadMoreSalesHistory() {
    alert("Loading more sales data...");
    // Add logic to fetch and load more sales history here
}
