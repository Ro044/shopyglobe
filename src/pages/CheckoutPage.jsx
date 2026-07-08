import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectCartItems, selectCartTotal, clearCart } from "../store/cartSlice";

// Checkout page with user details form and order summary
function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Track whether order has been placed
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form fields state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Update form state when user types
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle the "Place Order" button click
  function handlePlaceOrder(e) {
    e.preventDefault();

    // Show success message
    setOrderPlaced(true);

    // Clear all items from the cart
    dispatch(clearCart());

    // Automatically redirect to home page after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  // If order was just placed, show success message
  if (orderPlaced) {
    return (
      <div className="order-success-page">
        <div className="order-success-box">
          <div className="success-icon">✅</div>
          <h2>Order Placed!</h2>
          <p>Thank you for shopping with ShoppyGlobe.</p>
          <p className="redirect-msg">Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  // If cart is empty, show message
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn-primary">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">

        {/* User details form */}
        <div className="checkout-form-section">
          <h2>Your Details</h2>
          <form onSubmit={handlePlaceOrder} className="checkout-form">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your street address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-place-order">
              Place Order ✅
            </button>

          </form>
        </div>

        {/* Order summary section */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.thumbnail} alt={item.title} loading="lazy" className="summary-item-img" />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.title}</p>
                  <p className="summary-item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="summary-total-row">
            <span>Total</span>
            <span className="summary-total-amount">${cartTotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;
