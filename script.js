<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Store</title>
    <style>
        /* আপনার কোডের CSS অপরিবর্তিত রাখা হয়েছে */
        /* Pop-up Styling for Settings */
        .settings-popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
            color: white;
            z-index: 1001;
        }

        .settings-content {
            background-color: #333;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            text-align: center;
        }

        .settings-content input {
            width: 90%;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #555;
            border-radius: 5px;
            font-size: 1em;
        }

        .settings-content button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .settings-content button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="main-wrapper">
        <!-- আপনার HTML অপরিবর্তিত -->
    </div>

    <!-- Settings Popup -->
    <div id="settings-popup" class="settings-popup">
        <div class="settings-content">
            <h2>Store Settings</h2>
            <input type="text" id="setting-shop-name" placeholder="Shop Name" required>
            <input type="text" id="setting-location" placeholder="Shop Location" required>
            <input type="text" id="setting-mobile" placeholder="Mobile Number" required>
            <input type="text" id="setting-manager" placeholder="Manager Name (Optional)">
            <input type="text" id="setting-owner" placeholder="Owner Name (Optional)">
            <button onclick="saveSettings()">Save</button>
            <button onclick="closeSettingsPopup()">Close</button>
        </div>
    </div>

    <script>
        let shopDetails = JSON.parse(localStorage.getItem('shopDetails')) || {
            shopName: '',
            location: '',
            mobile: '',
            manager: '',
            owner: ''
        };

        // Function to open settings popup
        function openSettings() {
            const popup = document.getElementById('settings-popup');
            document.getElementById('setting-shop-name').value = shopDetails.shopName || '';
            document.getElementById('setting-location').value = shopDetails.location || '';
            document.getElementById('setting-mobile').value = shopDetails.mobile || '';
            document.getElementById('setting-manager').value = shopDetails.manager || '';
            document.getElementById('setting-owner').value = shopDetails.owner || '';
            popup.style.display = 'flex';
        }

        // Function to close settings popup
        function closeSettingsPopup() {
            document.getElementById('settings-popup').style.display = 'none';
        }

        // Function to save settings to localStorage
        function saveSettings() {
            const shopName = document.getElementById('setting-shop-name').value.trim();
            const location = document.getElementById('setting-location').value.trim();
            const mobile = document.getElementById('setting-mobile').value.trim();
            const manager = document.getElementById('setting-manager').value.trim();
            const owner = document.getElementById('setting-owner').value.trim();

            if (!shopName || !location || !mobile) {
                alert('Shop Name, Location, and Mobile Number are required.');
                return;
            }

            shopDetails = { shopName, location, mobile, manager, owner };
            localStorage.setItem('shopDetails', JSON.stringify(shopDetails));
            alert('Settings saved successfully!');
            closeSettingsPopup();
        }

        // Load settings on startup
        window.onload = function () {
            const savedDetails = JSON.parse(localStorage.getItem('shopDetails'));
            if (savedDetails) {
                shopDetails = savedDetails;
            }
        };
        
        // Add Settings Modal functionality
        function openSettingsModal() {
            const settingsPopup = document.createElement('div');
            settingsPopup.classList.add('modal');
            settingsPopup.innerHTML = `
                <div class="modal-content">
                    <h3>Settings</h3>
                    <form id="settings-form">
                        <label for="shop-name-setting">Shop Name:</label>
                        <input type="text" id="shop-name-setting" value="${localStorage.getItem("shopName") || ''}" placeholder="Enter shop name">
                        
                        <label for="shop-location-setting">Shop Location/Address:</label>
                        <input type="text" id="shop-location-setting" value="${localStorage.getItem("shopLocation") || ''}" placeholder="Enter shop location">

                        <label for="mobile-number-setting">Mobile Number:</label>
                        <input type="text" id="mobile-number-setting" value="${localStorage.getItem("mobileNumber") || ''}" placeholder="Enter mobile number">

                        <label for="manager-name-setting">Manager's Name (Optional):</label>
                        <input type="text" id="manager-name-setting" value="${localStorage.getItem("managerName") || ''}" placeholder="Enter manager's name">

                        <label for="owner-name-setting">Owner's Name (Optional):</label>
                        <input type="text" id="owner-name-setting" value="${localStorage.getItem("ownerName") || ''}" placeholder="Enter owner's name">

                        <button type="button" onclick="saveSettingsModal()">Save</button>
                    </form>
                    <button onclick="closeSettingsModal()">Close</button>
                </div>
            `;
            document.body.appendChild(settingsPopup);

            settingsPopup.style.display = 'flex';

            // Close settings when clicking outside modal
            window.addEventListener('click', (event) => {
                if (event.target === settingsPopup) {
                    settingsPopup.remove();
                }
            });

            // Function to close settings modal
            function closeSettingsModal() {
                settingsPopup.remove();
            }

            // Save settings in modal
            function saveSettingsModal() {
                const shopName = document.getElementById('shop-name-setting').value.trim();
                const shopLocation = document.getElementById('shop-location-setting').value.trim();
                const mobileNumber = document.getElementById('mobile-number-setting').value.trim();
                const managerName = document.getElementById('manager-name-setting').value.trim();
                const ownerName = document.getElementById('owner-name-setting').value.trim();

                if (!shopName || !shopLocation || !mobileNumber) {
                    alert('Shop Name, Location, and Mobile Number are required!');
                    return;
                }

                // Save settings in localStorage
                localStorage.setItem("shopName", shopName);
                localStorage.setItem("shopLocation", shopLocation);
                localStorage.setItem("mobileNumber", mobileNumber);
                localStorage.setItem("managerName", managerName);
                localStorage.setItem("ownerName", ownerName);

                alert('Settings saved successfully.');
                settingsPopup.remove();
            }
        }
    </script>
</body>
</html>
