// Check if cart exists in localStorage or initialize it
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existing = cart.find(item => item.name === product.name);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Attach click event if we’re on product page
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('.add-to-cart');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const product = {
        name: "Smartphone",
        price: 120000,
        image: "assets/images/phone.jpg"
      };

      addToCart(product);
    });
  }
});

// Display cart items on cart.html
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  cartSummary.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: ₦${item.price.toLocaleString()}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ₦${itemTotal.toLocaleString()}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartSummary.innerHTML = `<p>Total Cart Value: ₦${total.toLocaleString()}</p>`;
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Clear cart
const clearBtn = document.getElementById('clear-cart');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      cart = [];
      localStorage.removeItem('cart');
      renderCart();
    }
  });
}

// Run renderCart if we're on the cart page
document.addEventListener('DOMContentLoaded', renderCart);
