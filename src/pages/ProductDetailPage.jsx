import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

// Shows full details of a single product based on the URL id param
function ProductDetailPage() {
  // Get the product id from the URL (e.g. /product/5)
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details when the component mounts or id changes
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://dummyjson.com/products/${id}`);

        // Handle errors like invalid product id
        if (!response.ok) {
          throw new Error(`Product not found (ID: ${id})`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Add this product to the cart
  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  if (loading) {
    return <div className="loading-msg">⏳ Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="error-msg">
        ❌ Error: {error}
        <br />
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to Products</Link>

      <div className="detail-container">

        {/* Product images section */}
        <div className="detail-image-section">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="detail-main-image"
            loading="lazy"
          />
          {/* Show extra images if available */}
          <div className="detail-extra-images">
            {product.images && product.images.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} view ${index + 1}`}
                className="detail-thumb"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Product info section */}
        <div className="detail-info-section">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-brand">by {product.brand}</p>
          <p className="detail-price">${product.price}</p>
          <p className="detail-rating">⭐ {product.rating} / 5</p>
          <p className="detail-stock">
            {product.stock > 0 ? (
              <span className="in-stock">✅ {product.stock} in stock</span>
            ) : (
              <span className="out-of-stock">❌ Out of stock</span>
            )}
          </p>
          <p className="detail-description">{product.description}</p>
          <button onClick={handleAddToCart} className="btn-add-cart btn-large">
            🛒 Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailPage;
