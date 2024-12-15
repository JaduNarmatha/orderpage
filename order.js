// Load cart from local storage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Populate order summary
function populateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const totalPriceEl = document.getElementById('totalPrice');
    let total = 0;

    cart.forEach(({ item, price }) => {
        const row = `<tr><td>${item}</td><td>Rs. ${price}</td></tr>`;
        orderSummary.innerHTML += row;
        total += price;
    });

    totalPriceEl.textContent = `Total Price: Rs. ${total}`;
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (name && address && payment) {
        alert(`Thank you for your purchase, ${name}!\nYour order will be delivered to ${address} within 3-5 days.`);
        localStorage.removeItem('cart'); // Clear the cart after purchase
        window.location.href = 'index.html'; // Redirect to homepage
    } else {
        alert('Please fill in all fields.');
    }
});

// Initialize the page
populateOrderSummary();
