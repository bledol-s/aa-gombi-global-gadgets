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
