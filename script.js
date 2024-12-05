// Add Settings Functionality
function openSettings() {
    const settingsPopup = document.createElement('div');
    settingsPopup.classList.add('modal');
    settingsPopup.innerHTML = `
        <div class="modal-content">
            <h3>Settings</h3>
            <form id="settings-form">
                <label for="shop-name-setting">Update Shop Name:</label>
                <input type="text" id="shop-name-setting" value="${shopNameStored || ''}">
                <button type="button" onclick="saveSettings()">Save</button>
            </form>
            <button onclick="closeSettings()">Close</button>
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
    function closeSettings() {
        settingsPopup.remove();
    }

    // Save settings
    function saveSettings() {
        const newShopName = document.getElementById('shop-name-setting').value.trim();
        if (newShopName) {
            shopNameStored = newShopName;
            localStorage.setItem("shopName", newShopName);
            alert('Shop name updated successfully.');
        } else {
            alert('Shop name cannot be empty.');
        }
        settingsPopup.remove();
    }
}
// Add Settings Functionality
function openSettings() {
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

                <button type="button" onclick="saveSettings()">Save</button>
            </form>
            <button onclick="closeSettings()">Close</button>
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
    function closeSettings() {
        settingsPopup.remove();
    }

    // Save settings
    function saveSettings() {
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
