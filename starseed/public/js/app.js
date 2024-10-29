const iconCart = document.querySelector('.icon-cart');
const body = document.querySelector('body');
const closeCart = document.querySelector('.close');
const listProductHTML = document.querySelector('.listProducts');
const listCartHTML = document.querySelector('.listCart');
const iconCartSpan = document.querySelector('.icon-cart span');
const checkOutButton = document.querySelector('.checkOut');
let cartTotalElement = document.createElement('div');

let cart = [];

// Event listeners for cart display
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Load cart from local storage
window.addEventListener('DOMContentLoaded', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartHTML();
        updateCartCount();
    }
});

// Add products to the cart
listProductHTML.addEventListener('click', (event) => {
    let clickedElement = event.target;
    if (clickedElement.classList.contains('addCart')) {
        let productElement = clickedElement.closest('.item-product');
        if (!productElement) return;

        let productId = productElement.dataset.id;
        let productName = productElement.querySelector('h2').innerText;
        let productPriceText = productElement.querySelector('.price')?.innerText || '0';
        let productPrice = parseFloat(productPriceText.replace(/[^\d.-]/g, '')) || 0;
        let productImage = productElement.querySelector('img').src;

        let product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        addToCart(product);
    }
});

// Function to add products to the cart
function addToCart(product) {
    // Check if the product already exists in the cart
    let existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex >= 0) {
        // Increment quantity if already in cart
        cart[existingProductIndex].quantity += 1; 
    } else {
        // Add new product to cart
        cart.push(product); 
    }

    updateCartHTML();
    updateCartCount();
    updateCartTotal();
    saveCartToLocalStorage();
}

// Function to update the cart's HTML
function updateCartHTML() {
    listCartHTML.innerHTML = ''; // Clear current cart HTML

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('item-product');
        cartItem.dataset.id = item.id;

        cartItem.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="name">${item.name}</div>
            <div class="totalPrice">P ${item.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;

        listCartHTML.appendChild(cartItem); // Append the cart item to the cart HTML
    });

    updateCartTotal();
}

// Function to update cart item count
function updateCartCount() {
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    iconCartSpan.innerText = totalQuantity;
}

// Function to update cart total
function updateCartTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.classList.add('cart-total');
    cartTotalElement.textContent = `Total: P ${total.toFixed(2)}`;
    
    // Remove existing total if present to prevent duplicates
    if (listCartHTML.contains(cartTotalElement)) {
        listCartHTML.removeChild(cartTotalElement);
    }
    
    listCartHTML.appendChild(cartTotalElement);
}

// Function to save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add event listener for quantity change
listCartHTML.addEventListener('click', (event) => {
    let clickedElement = event.target;
    if (clickedElement.classList.contains('plus') || clickedElement.classList.contains('minus')) {
        let cartItem = clickedElement.closest('.item-product');
        if (!cartItem) return;

        let productId = cartItem.dataset.id;
        if (clickedElement.classList.contains('plus')) {
            changeQuantity(productId, 1);
        } else if (clickedElement.classList.contains('minus')) {
            changeQuantity(productId, -1);
        }
    }
});

// Function to change the quantity of products in the cart
function changeQuantity(productId, delta) {
    let productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex >= 0) {
        cart[productIndex].quantity += delta;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove item if quantity is zero
        }
        updateCartHTML();
        updateCartCount();
        updateCartTotal();
        saveCartToLocalStorage();
    }
}

// Checkout button functionality
checkOutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Proceeding to checkout...');
        cart = [];
        updateCartHTML();
        updateCartCount();
        updateCartTotal();
        saveCartToLocalStorage();
    }
});

// Search functionality
const searchBar = document.querySelector('#searchBar');
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const products = document.querySelectorAll('.listProducts .item-product');

    products.forEach(product => {
        const productName = product.querySelector('h2').innerText.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Add products to the cart from another section
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCartBtn')) {
        let productElement = event.target.closest('.item-inside-content');
        let productId = productElement.dataset.id;
        let productName = productElement.querySelector('.productName').innerText;
        let productPriceText = productElement.querySelector('.productPrice').innerText;
        let productPrice = parseFloat(productPriceText.replace(/[^\d.-]/g, '')) || 0;
        let productImage = productElement.querySelector('img').src;

        let product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        addToCart(product);
    }
});
