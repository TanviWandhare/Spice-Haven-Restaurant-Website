//  Reset cart if user opens the site fresh
// if (!sessionStorage.getItem("initialized")) {
//   sessionStorage.clear();
//   sessionStorage.setItem("cart", JSON.stringify([]));
//   sessionStorage.setItem("initialized", "true");
// }

// Update Cart Count Function
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSpan = document.querySelector(".cart-count");
  if (cartSpan) {
    cartSpan.textContent = totalQty;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
