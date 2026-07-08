import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";
import CartItem from "./CartItem";

// Shows all items in the cart with a total and checkout button
function Cart() {
  // Get cart data from Redux store
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Show empty state if no items in cart
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet!</p>
        <Link to="/" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart ({cartItems.length} items)</h1>

      {/* List all cart items - each gets a unique key */}
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Cart total and checkout link */}
      <div className="cart-summary-box">
        <h3>Order Total: <span className="total-amount">${cartTotal.toFixed(2)}</span></h3>
        <Link to="/checkout" className="btn-checkout">
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}

export default Cart;
