document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.getElementById("drawer");
  const menuToggle = document.getElementById("menu-toggle");

  // Toggle drawer visibility
  menuToggle.addEventListener("click", () => {
    const isOpen = drawer.style.left === "0px";
    drawer.style.left = isOpen ? "-250px" : "0px";
  });

  // Other functionality...
});
