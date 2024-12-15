
function toggleCategory(categoryId) {
    const category = document.getElementById(categoryId);
    category.style.display = category.style.display === 'grid' ? 'none' : 'grid';
}

let cart = [];

function addToCart(item, price, qtyId) {
    const quantity = parseInt(document.getElementById(qtyId).value);
    if (quantity > 0) {
        cart.push({ item, quantity, price: price * quantity });
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(({ item, quantity, price }) => {
        total += price;
        const row = `<tr><td>${item}</td><td>${quantity}</td><td>Rs. ${price}</td></tr>`;
        cartItems.innerHTML += row;
    });
    totalPrice.textContent = `Rs. ${total.toFixed(2)}`;
}

function saveToFavorites() {
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
    alert('Order saved to favorites!');
}

function applyFavorites() {
    const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));
    if (favoriteOrder) {
        cart = favoriteOrder;
        updateCart();
    } else {
        alert('No favorite order found!');
    }
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "./order.html";
}