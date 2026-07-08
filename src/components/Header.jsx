import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../store/cartSlice";

// Header shown on all main pages - has logo and navigation links
function Header() {
  // Get total cart item count to show in the badge
  const cartCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">🛍️ ShoppyGlobe</Link>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link cart-nav-link">
          🛒 Cart
          {/* Show badge only if there are items in cart */}
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
