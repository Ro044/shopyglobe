import ProductList from "../components/ProductList";

// Home page - shows the hero banner and full product listing
function HomePage() {
  return (
    <div className="home-page">

      {/* Hero section at the top of the home page */}
      <div className="hero-banner">
        <h1>Welcome to ShoppyGlobe 🛍️</h1>
        <p>Discover amazing products at unbeatable prices!</p>
      </div>

      {/* Product list with search and filtering */}
      <ProductList />

    </div>
  );
}

export default HomePage;
