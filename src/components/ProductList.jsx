import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectSearchQuery } from "../store/searchSlice";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";

// Fetches and displays the full product list with search filtering
function ProductList() {
  const dispatch = useDispatch();

  // Get the current search query from Redux state
  const searchQuery = useSelector(selectSearchQuery);

  // Use our custom hook to fetch products from the API
  const { data, loading, error } = useFetchProducts(
    "https://dummyjson.com/products?limit=30"
  );

  // Show a loading message while waiting for the API
  if (loading) {
    return <div className="loading-msg">⏳ Loading products...</div>;
  }

  // Show error if the API call failed
  if (error) {
    return (
      <div className="error-msg">
        ❌ Something went wrong: {error}
      </div>
    );
  }

  // Filter products based on the search query from Redux
  const allProducts = data?.products || [];
  const filteredProducts = allProducts.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.brand && product.brand.toLowerCase().includes(query))
    );
  });

  return (
    <div className="product-list-section">

      {/* Search bar - dispatches to Redux on every keystroke */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="🔍 Search products by name, category or brand..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
      </div>

      {/* Show message if search returns nothing */}
      {filteredProducts.length === 0 ? (
        <p className="no-products-msg">
          No products found for "<strong>{searchQuery}</strong>"
        </p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            // Each ProductItem gets a unique key using the product id
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
