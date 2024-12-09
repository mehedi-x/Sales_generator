document.addEventListener("DOMContentLoaded", () => {
    const storeSetup = document.getElementById("storeSetup");
    const salesGenerator = document.getElementById("salesGenerator");
    const setupStoreButton = document.getElementById("setupStore");
    const storeNameInput = document.getElementById("storeName");

    // Event Listener for "Set Store Name" Button
    setupStoreButton.addEventListener("click", () => {
        const storeName = storeNameInput.value.trim();
        if (storeName) {
            alert(`Welcome to ${storeName}!`);
            storeSetup.classList.add("hidden");
            setTimeout(() => {
                storeSetup.style.display = "none";
                salesGenerator.style.display = "block";
            }, 500);
        } else {
            alert("Please enter a valid store name!");
        }
    });

    // Placeholder for future functionality
    const productForm = document.getElementById("productForm");
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Product logic here
        alert("Product added successfully!");
    });
});
