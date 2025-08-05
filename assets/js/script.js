/* assets/js/script.js
   Consolidated script — safe ordering, defensive checks
*/

// ---------------------- Utility & Storage ----------------------
const STORAGE_KEYS = { CART: 'cart', PRODUCTS: 'products', CHECKOUT: 'checkout_payload' };

function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.warn('readJSON parse error for', key, e);
    return null;
  }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------------------- Default Products (declared first) ----------------------
const DEFAULT_PRODUCTS = [
  {
    name: "iPhone 15",
    price: 120000,
    image: "assets/images/iphone15.jpg",
    desc: "iPhone 15 — A16 chip, 128GB storage, 6.1-inch Super Retina XDR, 48MP camera."
  },
  {
    name: "Wireless Earbuds",
    price: 25000,
    image: "assets/images/earbuds.jpg",
    desc: "True wireless earbuds — Bluetooth 5.3, ANC, up to 30 hours with case, touch controls."
  },
  {
    name: "Powerbank 50000mAh",
    price: 45000,
    image: "assets/images/powerbank50000.jpg",
    desc: "Powerbank 50000mAh — Multi-output (USB-A, USB-C), fast charge, intelligent protection."
  }
];

// ---------------------- Cart functions ----------------------
let cart = readJSON(STORAGE_KEYS.CART) || [];

function saveCart() {
  writeJSON(STORAGE_KEYS.CART, cart);
}

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
  try { alert(`${product.name} added to cart`); } catch(e) {}
}

// ---------------------- Products storage/load ----------------------
function loadStoredProducts() {
  const stored = readJSON(STORAGE_KEYS.PRODUCTS);
  if (Array.isArray(stored) && stored.length) return stored;
  return DEFAULT_PRODUCTS.slice();
}

function saveStoredProducts(list) {
  writeJSON(STORAGE_KEYS.PRODUCTS, list);
}

// ---------------------- XSS-safe helpers ----------------------
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeAttr(s) {
  if (s == null) return '';
  return String(s).replace(/"/g, '&quot;');
}

// ---------------------- Render product grid ----------------------
function renderProductsGrid() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const products = loadStoredProducts();
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${escapeAttr(p.name)}" onerror="this.style.opacity=0.6; this.nextElementSibling && (this.nextElementSibling.textContent='Image not found')" />
      <h3>${escapeHtml(p.name)}</h3>
      <p class="desc">${escapeHtml(p.desc || '')}</p>
      <p class="price">₦${Number(p.price).toLocaleString()}</p>
      <button class="add-to-cart" data-name="${escapeAttr(p.name)}" data-price="${Number(p.price)}" data-image="${escapeAttr(p.image)}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// ---------------------- URL product handling ----------------------
function handleUrlProduct() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('name')) return;

    const name = params.get('name');
    const price = parseFloat(params.get('price')) || 0;
    const image = params.get('image') || '';
    const desc = params.get('desc') || '';

    addToCart({ name, price, image, desc });

    const selectedSection = document.getElementById('selected-item-section');
    const selectedDiv = document.getElementById('selected-item');
    if (selectedSection && selectedDiv) {
      selectedSection.style.display = 'block';
      selectedDiv.innerHTML = `
        <div style="display:flex;gap:14px;align-items:center;">
          <img src="${escapeAttr(image)}" alt="${escapeAttr(name)}" style="width:110px;height:110px;object-fit:contain;border-radius:8px" onerror="this.style.opacity=0.6" />
          <div>
            <h3 style="margin:0">${escapeHtml(name)}</h3>
            <p style="margin:6px 0">₦${Number(price).toLocaleString()}</p>
            <p style="margin:0">${escapeHtml(desc || 'Added to cart')}</p>
            <p style="margin-top:8px"><a href="cart.html" class="btn">Go to Cart</a></p>
          </div>
        </div>
      `;
    }

    history.replaceState({}, document.title, window.location.pathname);
  } catch (e) {
    console.error('handleUrlProduct error', e);
  }
}

// ---------------------- Event delegation for Add to Cart ----------------------
document.addEventListener('click', function (ev) {
  const btn = ev.target.closest && ev.target.closest('.add-to-cart');
  if (!btn) return;
  const name = btn.getAttribute('data-name');
  const price = parseFloat(btn.getAttribute('data-price')) || 0;
  const image = btn.getAttribute('data-image') || '';
  addToCart({ name, price, image });
});

// ---------------------- Cart page rendering ----------------------
function renderCart() {
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!container) return;

  container.innerHTML = '';
  summary && (summary.innerHTML = '');

  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  cart.forEach((item, idx) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" />
      <div class="cart-item-details">
        <h3>${escapeHtml(item.name)}</h3>
        <p>Price: ₦${Number(item.price).toLocaleString()}</p>
        <p>Quantity: ${Number(item.quantity)}</p>
        <p>Total: ₦${Number(itemTotal).toLocaleString()}</p>
      </div>
      <button class="remove-btn" data-index="${idx}">Remove</button>
    `;
    container.appendChild(div);
  });

  summary && (summary.innerHTML = `<p>Total Cart Value: ₦${Number(total).toLocaleString()}</p>`);
}

// remove item handler
document.addEventListener('click', function (ev) {
  const btn = ev.target.closest && ev.target.closest('.remove-btn');
  if (!btn) return;
  const idx = parseInt(btn.getAttribute('data-index'), 10);
  if (!Number.isFinite(idx)) return;
  cart.splice(idx, 1);
  saveCart();
  renderCart();
});

// ---------------------- Clear cart & Checkout (if present on page) ----------------------
function setupClearAndCheckout() {
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm('Clear cart?')) return;
      cart = [];
      localStorage.removeItem(STORAGE_KEYS.CART);
      renderCart();
    });
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!cart.length) { alert('Cart empty'); return; }
      const total = cart.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
      if (!confirm(`Proceed to checkout? Total: ₦${total.toLocaleString()}`)) return;
      writeJSON(STORAGE_KEYS.CHECKOUT, { items: cart, total });
      window.location.href = 'checkout.html';
    });
  }
}

// ---------------------- Startup ----------------------
document.addEventListener('DOMContentLoaded', () => {
  cart = readJSON(STORAGE_KEYS.CART) || [];
  try {
    renderProductsGrid();
    handleUrlProduct();
  } catch (e) {
    console.error('Error rendering products or handling URL:', e);
  }
  try {
    renderCart();
    setupClearAndCheckout();
  } catch (e) {
    console.error('Error rendering cart or setup buttons:', e);
  }
});
