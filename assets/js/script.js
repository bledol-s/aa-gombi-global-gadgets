/* assets/js/script.js
   Homepage-centered product listing with search & cart (localStorage)
*/

// ---- Storage keys ----
const STORAGE_KEYS = { CART: 'cart', PRODUCTS: 'products', CHECKOUT: 'checkout_payload' };

// ---- Defaults ----
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
    desc: "Wireless Earbuds — True wireless, Bluetooth 5.3, ANC, up to 30 hours with case."
  },
  {
    name: "Powerbank 50000mAh",
    price: 45000,
    image: "assets/images/powerbank50000.jpg",
    desc: "Powerbank 50000mAh — Multi-output (USB-A, USB-C), fast charge, intelligent protection."
  }
];

// ---- Helpers ----
function readJSON(key){ try { return JSON.parse(localStorage.getItem(key)); } catch(e){ return null; } }
function writeJSON(key,val){ localStorage.setItem(key, JSON.stringify(val)); }
function fmt(n){ return Number(n).toLocaleString(); }

// ---- Products (can be extended via admin) ----
function loadProducts(){
  const stored = readJSON(STORAGE_KEYS.PRODUCTS);
  return (Array.isArray(stored) && stored.length) ? stored : DEFAULT_PRODUCTS.slice();
}
function saveProducts(list){ writeJSON(STORAGE_KEYS.PRODUCTS, list); }

// ---- Cart management ----
let cart = readJSON(STORAGE_KEYS.CART) || [];
function saveCart(){ writeJSON(STORAGE_KEYS.CART, cart); }
function updateCartCount(){
  const el = document.getElementById('cart-count');
  if (!el) return;
  const count = cart.reduce((s,i)=> s + (i.quantity||0), 0);
  el.textContent = count;
}
function addToCart(product){
  if (!product || !product.name) return;
  const ex = cart.find(i => i.name === product.name);
  if (ex) ex.quantity = (ex.quantity||0) + 1;
  else cart.push(Object.assign({}, product, { quantity: 1 }));
  saveCart();
  updateCartCount();
  showSelectedPreview(product);
}

// ---- Selected preview ----
function showSelectedPreview(p){
  const sel = document.getElementById('selected-item');
  if (!sel) return;
  sel.style.display = 'block';
  sel.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <img src="${p.image}" alt="${p.name}" style="width:90px;height:90px;object-fit:contain;border-radius:8px;" onerror="this.style.opacity=0.6" />
      <div>
        <strong>${escapeHtml(p.name)}</strong>
        <div>₦${fmt(p.price)}</div>
        <div style="margin-top:8px;"><button class="btn" onclick="window.location.href='cart.html'">Review Cart</button></div>
      </div>
    </div>
  `;
  // auto-hide after 5s
  clearTimeout(window._selTimeout);
  window._selTimeout = setTimeout(()=>{ sel.style.display='none'; }, 5000);
}

// ---- Safe escaping ----
function escapeHtml(s){ if (s == null) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ---- Rendering products grid ----
let CURRENT_PRODUCTS = loadProducts(); // in-memory list
function renderProducts(list){
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${escapeHtml(p.name)}" />
      <h3>${escapeHtml(p.name)}</h3>
      <p class="desc">${escapeHtml(p.desc||'')}</p>
      <div class="meta">
        <p class="price">₦${fmt(p.price)}</p>
        <div>
          <button class="add-to-cart" data-name="${escapeHtml(p.name)}" data-price="${p.price}" data-image="${escapeHtml(p.image)}" data-desc="${escapeHtml(p.desc||'')}">Add to Cart</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  updateCartCount();
}

// ---- Filtering (search) ----
function filterProducts(q){
  q = (q || '').trim().toLowerCase();
  if (!q) {
    CURRENT_PRODUCTS = loadProducts();
    renderProducts(CURRENT_PRODUCTS);
    return;
  }
  const all = loadProducts();
  const filtered = all.filter(p => {
    return (p.name || '').toLowerCase().includes(q) || (p.desc || '').toLowerCase().includes(q);
  });
  CURRENT_PRODUCTS = filtered;
  renderProducts(filtered);
}

// ---- Click delegation for add-to-cart (works on homepage) ----
document.addEventListener('click', function(e){
  const btn = e.target.closest && e.target.closest('.add-to-cart');
  if (!btn) return;
  const name = btn.getAttribute('data-name');
  const price = parseFloat(btn.getAttribute('data-price')) || 0;
  const image = btn.getAttribute('data-image') || '';
  const desc = btn.getAttribute('data-desc') || '';
  // Add and show preview — stays on homepage
  addToCart({ name, price, image, desc });
});

// ---- Cart page rendering (cart.html) ----
function renderCart(){
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!container) return;
  container.innerHTML = '';
  (summary) && (summary.innerHTML = '');
  if (!cart.length) { container.innerHTML = '<p>Your cart is empty.</p>'; return; }
  let total = 0;
  cart.forEach((it, idx) => {
    const itemTotal = (it.price||0) * (it.quantity||1);
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${it.image}" alt="${escapeHtml(it.name)}" />
      <div class="cart-item-details">
        <h3>${escapeHtml(it.name)}</h3>
        <p>Price: ₦${fmt(it.price)}</p>
        <p>Quantity: ${it.quantity}</p>
        <p>Total: ₦${fmt(itemTotal)}</p>
      </div>
      <button class="remove-btn" data-index="${idx}">Remove</button>
    `;
    container.appendChild(div);
  });
  (summary) && (summary.innerHTML = `<p>Total Cart Value: ₦${fmt(total)}</p>`);
}

// remove item handler for cart page
document.addEventListener('click', function(e){
  const btn = e.target.closest && e.target.closest('.remove-btn');
  if (!btn) return;
  const idx = parseInt(btn.getAttribute('data-index'), 10);
  if (!Number.isFinite(idx)) return;
  cart.splice(idx,1);
  saveCart();
  renderCart();
  updateCartCount();
});

// clear and checkout handlers
function setupCartButtons(){
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (!confirm('Clear cart?')) return;
    cart = []; saveCart(); renderCart(); updateCartCount();
  });
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (!cart.length) { alert('Cart empty'); return; }
    const total = cart.reduce((s,i)=> s + (i.price||0)*(i.quantity||1), 0);
    if (!confirm(`Proceed to checkout? Total: ₦${fmt(total)}`)) return;
    writeJSON(STORAGE_KEYS.CHECKOUT, { items: cart, total });
    window.location.href = 'checkout.html';
  });
}

// ---- Init on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
  // init products and render
  CURRENT_PRODUCTS = loadProducts();
  renderProducts(CURRENT_PRODUCTS);

  // wire cart from storage
  cart = readJSON(STORAGE_KEYS.CART) || [];
  updateCartCount();

  // if on cart page, render cart & setup buttons
  renderCart();
  setupCartButtons();
});

// ---- Expose filter function globally for index inline script to call ----
window.filterProducts = filterProducts;
window.updateCartCount = updateCartCount;
