/* -----------------------
   Data: Products
------------------------ */
const PRODUCTS = [
  {
    name: "iPhone 15",
    description: "Apple iPhone 15 with A16 Bionic chip, 128GB storage, 6.1-inch OLED display, 48MP main camera, and iOS 17.",
    price: 950000,
    image: "assets/images/iphone15.png"
  },
  {
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation, Bluetooth 5.3, touch controls, and 30 hours battery life.",
    price: 25000,
    image: "assets/images/earbuds.png"
  },
  {
    name: "50000mAh Power Bank",
    description: "Massive 50000mAh capacity power bank with fast charging, dual USB output, LED display, and rugged build.",
    price: 18000,
    image: "assets/images/powerbank.png"
  }
];

/* -----------------------
   Cart: Persistent store
------------------------ */
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    countEl.textContent = totalItems;
  }
}

/* -----------------------
   Toast Notifications
------------------------ */
function showToast(message, duration = 3000) {
  try {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    container.appendChild(t);
    // allow CSS transition
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, duration);
  } catch (e) {
    alert(message);
  }
}

/* -----------------------
   Add to Cart
------------------------ */
function addToCart(product) {
  if (!product || !product.name) return;
  const existing = cart.find(it => it.name === product.name);
  if (existing) {
    existing.quantity = (existing.quantity || 0) + 1;
  } else {
    const toAdd = Object.assign({}, product);
    toAdd.quantity = toAdd.quantity || 1;
    cart.push(toAdd);
  }
  saveCart();
  updateCartCount();
  showSelectedPreview(product);
  showToast(`${product.name} added to cart`);
}

/* -----------------------
   Render Selected Preview
------------------------ */
function showSelectedPreview(product) {
  const container = document.getElementById("selected-item");
  if (!container) return;
  container.innerHTML = `
    <div style="display:flex; align-items:center;">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h4>${product.name}</h4>
        <p style="margin:4px 0;">₦${product.price.toLocaleString()}</p>
      </div>
    </div>
  `;
  container.style.display = "block";
}

/* -----------------------
   Render Products
------------------------ */
function renderProductsGrid(list = PRODUCTS) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <h3 class="card-name">${product.name}</h3>
      <p class="card-desc">${product.description}</p>
      <div class="card-price-action">
        <span class="card-price">₦${product.price.toLocaleString()}</span>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
    card.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));
    grid.appendChild(card);
  });
}

/* -----------------------
   Search Filter
------------------------ */
function filterProducts(query) {
  query = query.toLowerCase();
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );
  renderProductsGrid(filtered);
}

/* -----------------------
   Init
------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsGrid(PRODUCTS);
  updateCartCount();
});

/* ---------- Enhanced cart rendering: quantities + modal confirmations ---------- */

/**
 * showConfirmModal(message, onConfirm)
 * - message: string displayed in modal
 * - onConfirm: function to call if user confirms
 */
function showConfirmModal(message, onConfirm) {
  const modal = document.getElementById('confirm-modal');
  const msgEl = document.getElementById('confirm-message');
  const okBtn = document.getElementById('confirm-ok');
  const cancelBtn = document.getElementById('confirm-cancel');

  if (!modal || !msgEl || !okBtn || !cancelBtn) {
    // fallback
    if (confirm(message)) onConfirm();
    return;
  }

  msgEl.textContent = message;
  modal.setAttribute('aria-hidden', 'false');

  // focus management
  okBtn.focus();

  function cleanup() {
    modal.setAttribute('aria-hidden', 'true');
    okBtn.removeEventListener('click', onOk);
    cancelBtn.removeEventListener('click', onCancel);
    // allow any other handlers to detach
  }

  function onOk() {
    cleanup();
    try { onConfirm(); } catch (e) { console.error(e); }
  }
  function onCancel() {
    cleanup();
  }

  okBtn.addEventListener('click', onOk);
  cancelBtn.addEventListener('click', onCancel);

  // close on backdrop click
  modal.querySelector('.confirm-modal-backdrop')?.addEventListener('click', onCancel, { once: true });
}

/**
 * updateQuantity(index, newQty)
 * - Clamp qty to >=1, update cart, save, re-render cart page and update header count
 */
function updateQuantity(index, newQty) {
  newQty = parseInt(newQty, 10);
  if (!Number.isFinite(newQty) || newQty < 1) newQty = 1;
  if (!cart[index]) return;
  cart[index].quantity = newQty;
  try { saveCart(); } catch(e) { localStorage.setItem('cart', JSON.stringify(cart)); }
  renderCartPage();
  updateCartCount && updateCartCount();
}

/**
 * renderCartPage()
 * - Renders the cart page with quantity controls and remove buttons.
 * - Uses showConfirmModal for removal and clear cart confirmation.
 */
function renderCartPage() {
  // Ensure cart is read from storage (sync)
  try { cart = JSON.parse(localStorage.getItem('cart') || '[]'); } catch(e) { cart = cart || []; }

  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!container) return;

  container.innerHTML = '';
  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    if (summary) summary.innerHTML = '';
    updateCartCount && updateCartCount();
    return;
  }

  let total = 0;
  cart.forEach((item, idx) => {
    const qty = Number(item.quantity || 1);
    const itemTotal = (Number(item.price || 0) * qty);
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: ₦${Number(item.price).toLocaleString()}</p>
        <p>Quantity:</p>
        <div class="qty-control">
          <button class="qty-btn qty-decrease" data-index="${idx}" aria-label="Decrease quantity">-</button>
          <input class="qty-input" type="number" min="1" value="${qty}" data-index="${idx}" />
          <button class="qty-btn qty-increase" data-index="${idx}" aria-label="Increase quantity">+</button>
        </div>
        <p style="margin-top:10px;font-weight:700;">Subtotal: ₦${Number(itemTotal).toLocaleString()}</p>
      </div>
      <div class="controls">
        <button class="remove-btn" data-index="${idx}">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });

  if (summary) summary.innerHTML = `<p style="font-weight:800;">Total: ₦${Number(total).toLocaleString()}</p>`;

  // Wire up quantity controls
  container.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = Number(btn.getAttribute('data-index'));
      if (!Number.isFinite(i)) return;
      const current = Number((cart[i] && cart[i].quantity) || 1);
      updateQuantity(i, Math.max(1, current - 1));
    });
  });
  container.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = Number(btn.getAttribute('data-index'));
      if (!Number.isFinite(i)) return;
      const current = Number((cart[i] && cart[i].quantity) || 1);
      updateQuantity(i, current + 1);
    });
  });
  container.querySelectorAll('.qty-input').forEach(inp => {
    inp.addEventListener('change', (e) => {
      const i = Number(inp.getAttribute('data-index'));
      if (!Number.isFinite(i)) return;
      let v = parseInt(inp.value, 10);
      if (!Number.isFinite(v) || v < 1) v = 1;
      updateQuantity(i, v);
    });

    // also handle keyboard enter
    inp.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') inp.dispatchEvent(new Event('change'));
    });
  });

  // Wire remove buttons to use modal
  container.querySelectorAll('.remove-btn').forEach(rb => {
    rb.addEventListener('click', (e) => {
      const i = Number(rb.getAttribute('data-index'));
      if (!Number.isFinite(i)) return;
      showConfirmModal(`Remove "${cart[i].name}" from cart?`, () => {
        cart.splice(i, 1);
        try { saveCart(); } catch (e) { localStorage.setItem('cart', JSON.stringify(cart)); }
        renderCartPage();
        updateCartCount && updateCartCount();
        showToast('Item removed from cart');
      });
    });
  });

  // Wire Clear Cart button (if present) to use modal
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.onclick = () => {
      showConfirmModal('Clear your entire cart?', () => {
        cart = [];
        try { saveCart(); } catch (e) { localStorage.removeItem('cart'); }
        renderCartPage();
        updateCartCount && updateCartCount();
        showToast('Cart cleared');
      });
    };
  }

  // Wire Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (!cart.length) { showToast('Your cart is empty'); return; }
      const totalValue = cart.reduce((s, it) => s + (Number(it.price || 0) * (Number(it.quantity) || 1)), 0);
      localStorage.setItem('checkout_payload', JSON.stringify({ items: cart, total: totalValue }));
      // go to checkout page (placeholder)
      window.location.href = 'checkout.html';
    };
  }
}

// Auto-run when cart page present
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) {
    renderCartPage();
  }
});
