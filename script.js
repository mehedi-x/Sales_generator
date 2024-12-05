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
