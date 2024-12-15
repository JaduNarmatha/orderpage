// Load order data from localStorage
const orderSummaryTable = document.querySelector("#order-summary tbody");
const totalSummaryPrice = document.querySelector("#summary-total-price");
const payButton = document.querySelector("#pay-button");
// Retrieve cart from localStorage
const savedCart = localStorage.getItem("currentCart");
const cart = savedCart ? JSON.parse(savedCart) : [];
// Display order summary in the table
function displayOrderSummary() {
  let total = 0;
  orderSummaryTable.innerHTML = "";
  cart.forEach(item => {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${subtotal.toFixed(2)}</td>
    `;
    orderSummaryTable.appendChild(row);
  });
  totalSummaryPrice.textContent = total.toFixed(2);
}
// Handle form submission
payButton.addEventListener("click", () => {
  const fullName = document.querySelector("#full-name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const address = document.querySelector("#address").value.trim();
  const paymentMethod = document.querySelector("#payment-method").value;
  // Validate all fields
  if (!fullName || !email || !address || !paymentMethod) {
    alert("Please fill out all fields.");
    return;
  }
  // Calculate delivery date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  // Display thank-you message
  alert(`Thank you for your purchase, ${fullName}! 
Your order will be delivered to:
${address}
Delivery Date: ${deliveryDate.toDateString()}`);
  // Clear localStorage and redirect to homepage
  localStorage.removeItem("currentCart");
  window.location.href = "index.html";
});
// Display order summary on page load
displayOrderSummary();
