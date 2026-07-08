import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

// Displays a single product as a card
// Receives product data as a prop from ProductList
function ProductItem({ product }) {
  const dispatch = useDispatch();

  // Add this product to the Redux cart state
  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="product-card">
      {/* loading="lazy" defers image loading until it enters the viewport */}
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="product-card-image"
      />

      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-category">{product.category}</p>
        <p className="product-card-price">${product.price}</p>
        <p className="product-card-rating">⭐ {product.rating}</p>

        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="btn-details">
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn-add-cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
