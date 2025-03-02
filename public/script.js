let cart = [];
let total = 0;

// Add to Cart Function
function addToCart(item, price) {
  const existingItem = cart.find((cartItem) => cartItem.item === item);

  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if item already exists
  } else {
    cart.push({ item, price, quantity: 1 }); // Add new item to cart
  }

  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((cartItem) => {
    const li = document.createElement("li");

    // Item Name
    li.appendChild(document.createTextNode(cartItem.item));

    // Quantity Controls
    const quantityControls = document.createElement("div");
    quantityControls.style.display = "flex";
    quantityControls.style.alignItems = "center";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.onclick = () => updateQuantity(cartItem.item, -1);
    quantityControls.appendChild(minusBtn);

    const quantity = document.createElement("span");
    quantity.textContent = cartItem.quantity;
    quantity.className = "quantity";
    quantityControls.appendChild(quantity);

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.onclick = () => updateQuantity(cartItem.item, 1);
    quantityControls.appendChild(plusBtn);

    li.appendChild(quantityControls);

    // Price
    const priceElement = document.createElement("span");
    priceElement.textContent = `₹${cartItem.price * cartItem.quantity}`;
    li.appendChild(priceElement);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => removeFromCart(cartItem.item);
    li.appendChild(deleteBtn);

    cartItems.appendChild(li);

    // Update Total
    total += cartItem.price * cartItem.quantity;
  });

  totalElement.textContent = total;
  cartCount.textContent = cart.length;
}

// Update Quantity Function
function updateQuantity(item, change) {
  const cartItem = cart.find((cartItem) => cartItem.item === item);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      removeFromCart(item); // Remove item if quantity is 0 or less
    } else {
      updateCart(); // Update cart display
    }
  }
}

// Remove from Cart Function
function removeFromCart(item) {
  cart = cart.filter((cartItem) => cartItem.item !== item);
  updateCart();
}

// Checkout Function
function checkout() {
  alert(`Total Amount: ₹${total}\nThank you for your purchase!`);
  cart = [];
  updateCart();
}

// Theme Toggle Function
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.innerHTML = document.body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i> Light Mode'
    : '<i class="fas fa-moon"></i> Dark Mode';
});

// Login Modal Functionality
const loginModal = document.getElementById("login-modal");
const loginBtn = document.getElementById("login-btn");
const closeLoginModal = document.querySelector("#login-modal .close");

loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

closeLoginModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
});

// Location Modal Functionality
const locationModal = document.getElementById("location-modal");
const locationBtn = document.getElementById("location-btn");
const closeLocationModal = document.querySelector("#location-modal .close");

locationBtn.addEventListener("click", () => {
  locationModal.style.display = "flex";
  initMap(); // Initialize the map when the modal is opened
});

closeLocationModal.addEventListener("click", () => {
  locationModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === locationModal) {
    locationModal.style.display = "none";
  }
});

// Initialize Map (Leaflet.js)
function initMap() {
  const map = L.map("map").setView([20.5937, 78.9629], 5); // Center on India
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const confirmLocationBtn = document.getElementById("confirm-location");
  confirmLocationBtn.addEventListener("click", () => {
    alert("Location confirmed!");
    locationModal.style.display = "none";
  });
}