
document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());

// Menu category filters
const filterButtons = document.querySelectorAll(".menu-filter");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("active", "btn-cafe");
      item.classList.add("btn-outline-cafe");
    });
    button.classList.add("active", "btn-cafe");
    button.classList.remove("btn-outline-cafe");
    const category = button.dataset.category;
    document.querySelectorAll(".menu-item").forEach(card => {
      card.classList.toggle("d-none", category !== "all" && card.dataset.category !== category);
    });
  });
});

// Demo shopping cart
const cart = [];
const money = amount => "SDG " + Number(amount).toLocaleString("en-US");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function renderCart() {
  if (!cartItems) return;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = money(total);
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-secondary mb-0">No items yet. Add something from the menu.</p>';
    return;
  }
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-row">
      <div><strong>${item.name}</strong><div class="small text-secondary">${money(item.price)} × ${item.quantity}</div></div>
      <div class="d-flex align-items-center gap-2">
        <strong>${money(item.price * item.quantity)}</strong>
        <button class="btn btn-sm btn-outline-secondary remove-one" data-index="${index}" aria-label="Remove one ${item.name}">−</button>
      </div>
    </div>`).join("");
  cartItems.querySelectorAll(".remove-one").forEach(button => {
    button.addEventListener("click", () => {
      const item = cart[Number(button.dataset.index)];
      item.quantity -= 1;
      if (item.quantity <= 0) cart.splice(Number(button.dataset.index), 1);
      renderCart();
    });
  });
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity += 1;
    else cart.push({ name, price, quantity: 1 });
    renderCart();
  });
});

document.getElementById("clearCart")?.addEventListener("click", () => {
  cart.splice(0, cart.length);
  renderCart();
  document.getElementById("orderMessage")?.classList.add("d-none");
});

document.getElementById("placeOrder")?.addEventListener("click", () => {
  const message = document.getElementById("orderMessage");
  message.classList.remove("d-none", "alert-warning", "alert-success");
  if (cart.length === 0) {
    message.classList.add("alert-warning");
    message.textContent = "Your order is empty. Add at least one menu item first.";
  } else {
    message.classList.add("alert-success");
    message.textContent = "Demo order created! Total: " + cartTotal.textContent + ". This is only a website demonstration.";
  }
});

// Demo forms: validate fields but do not store or send data.
document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("contactSuccess").classList.remove("d-none");
  event.target.reset();
});

document.querySelectorAll(".demo-account-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const message = document.getElementById("accountMessage");
    message.textContent = "Form validated for demonstration only. Login/sign-up is not connected to a real account system.";
    message.classList.remove("d-none");
    form.reset();
  });
});