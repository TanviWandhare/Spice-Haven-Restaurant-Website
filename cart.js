const cartContainer = document.getElementById("cart-container");

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    document.getElementById("empty-message").style.display = "block";
    cartContainer.innerHTML = "";
    document.getElementById("total-price").textContent = "0";
    updateCartCount();
    return;
  }

  document.getElementById("empty-message").style.display = "none";
  let total = 0;

  cartContainer.innerHTML = cart
    .map(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <div class="cart-item">
          <div class="cart-item-details">
            <div class="cart-item-image">
              <img src="${item.imageUrl}" alt="${item.title}" />
            </div>
            <div class="cart-item-description">
              <h3>${item.title}</h3>
              <p>Price: $${item.price}</p>
              <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
          </div>
          <div class="cart-item-actions">
            <p>Quantity:
              <button onclick="updateQuantity('${item.id}', -1)">-</button>
              <span class="quantity">${item.quantity}</span>
              <button onclick="updateQuantity('${item.id}', 1)">+</button>
            </p>
            <button onclick="removeItem('${item.id}')" class="remove">Remove</button>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("total-price").textContent = total.toFixed(2);
  updateCartCount();
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(i => i.id === id);

  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => i.id !== id);
  alert("❌ Remove from cart");
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) cartCountElement.textContent = totalCount;
}

document.addEventListener("DOMContentLoaded", renderCart);
