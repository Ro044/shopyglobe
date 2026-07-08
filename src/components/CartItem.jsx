import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

// Represents a single item inside the cart
// Receives item data as a prop from Cart component
function CartItem({ item }) {
  const dispatch = useDispatch();

  // Remove this item completely from cart
  function handleRemove() {
    dispatch(removeFromCart(item.id));
  }

  // Increase quantity by 1
  function handleIncrease() {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  }

  // Decrease quantity by 1 (Redux will prevent going below 1)
  function handleDecrease() {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  }

  return (
    <div className="cart-item">
      {/* Lazy load cart item image */}
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">${item.price} each</p>

        {/* Quantity controls */}
        <div className="quantity-controls">
          <button onClick={handleDecrease} className="qty-btn">−</button>
          <span className="qty-value">{item.quantity}</span>
          <button onClick={handleIncrease} className="qty-btn">+</button>
        </div>

        <p className="cart-item-subtotal">
          Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        </p>
      </div>

      <button onClick={handleRemove} className="btn-remove">
        🗑️ Remove
      </button>
    </div>
  );
}

export default CartItem;
