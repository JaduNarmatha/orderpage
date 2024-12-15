// Initialize cart and favorites
let cart = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    let item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCartTable();
}

// Function to add items to favorites
function addToFavourites(itemName) {
    if (!favorites.includes(itemName)) {
        favorites.push(itemName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Function to update the cart table
function updateCartTable() {
    let tableBody = document.querySelector('#cart-table tbody');
    let total = 0;
    tableBody.innerHTML = ''; // Clear the current table body

    // Add rows for each cart item
    cart.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(event, '${item.name}')"></td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    // Update total price
    document.querySelector('#total-price').textContent = `$${total.toFixed(2)}`;
}

// Function to update item quantity in the cart
function updateQuantity(event, itemName) {
    let newQuantity = parseInt(event.target.value);
    let item = cart.find(i => i.name === itemName);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        updateCartTable();
    }
}

// Function to save current cart to favorites
document.getElementById('save-favorites').addEventListener('click', () => {
    let favoriteItems = cart.map(item => item.name);
    localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    alert('Cart saved as favorites!');
});

// Function to apply favorites to the cart
document.getElementById('apply-favorites').addEventListener('click', () => {
    if (favorites.length > 0) {
        cart = favorites.map(itemName => ({
            name: itemName,
            price: getItemPrice(itemName),
            quantity: 1
        }));
        updateCartTable();
    } else {
        alert('No favorites saved yet!');
    }
});

// Function to get price of a medicine item by name
function getItemPrice(itemName) {
    const prices = {
        'Lisinopril': 12.00, 'Amlodipine': 14.00, 'Metoprolol': 13.00, 'Losartan': 16.00,
        'Hydrochlorothiazide': 11.00, 'Carvedilol': 15.00, 'Clonidine': 10.00, 'Diltiazem': 17.00,
        'Enalapril': 12.50, 'Verapamil': 18.00, 'Spironolactone': 13.50, 'Loratadine': 8.00,
        'Cetirizine': 7.00, 'Diphenhydramine': 6.50, 'Fexofenadine': 9.00, 'Promethazine': 10.00
    };
    return prices[itemName] || 0;
}

// Buy now button functionality
document.getElementById('buy-now').addEventListener('click', () => {
    if (cart.length > 0) {
        window.location.href = 'order.html'; // Navigate to the checkout page
    } else {
        alert('Your cart is empty!');
    }
});
