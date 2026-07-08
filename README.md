# ShoppyGlobe E-Commerce Application

A basic e-commerce React application built with Vite, React Router, and Redux Toolkit.

## GitHub Repository

https://github.com/Ro044/shoppyglobe

## Features

- Browse products fetched from a live API
- Search products by name, category, or brand (powered by Redux state)
- View detailed product information on a separate page
- Add products to a shopping cart
- Adjust quantity or remove items in the cart
- Checkout form with order summary
- "Place Order" clears cart and redirects to home
- 404 page for unknown routes (no header shown)
- Lazy loading for all pages and images
- Fully responsive design

## How to Run

1. Make sure **Node.js** is installed on your computer.

2. Clone or download the project folder.

3. Open a terminal inside the project folder.

4. Install the dependencies:

```
npm install
```

5. Start the development server:

```
npm run dev
```

6. Open your browser and go to:

```
http://localhost:5173
```

## Project Structure

```
src/
  components/
    Header.jsx          - Navbar with logo and cart icon badge
    Layout.jsx          - Shared layout with Header using Outlet
    ProductList.jsx     - Fetches and displays products with search
    ProductItem.jsx     - Single product card with Add to Cart button
    Cart.jsx            - Full cart view with items and total
    CartItem.jsx        - Single cart item with quantity controls
    NotFound.jsx        - 404 page (no header)
  pages/
    HomePage.jsx        - Hero banner + ProductList
    ProductDetailPage.jsx - Single product details (fetched by id)
    CartPage.jsx        - Cart page
    CheckoutPage.jsx    - Form + order summary + place order
  hooks/
    useFetchProducts.js - Custom hook for fetching API data
  store/
    store.js            - Redux store configuration
    cartSlice.js        - Cart state: add, remove, update qty, clear
    searchSlice.js      - Search query state
  App.jsx               - createBrowserRouter with lazy loaded routes
  main.jsx              - Redux Provider + app entry point
```

## API Used

- Products: https://dummyjson.com/products
- Single Product: https://dummyjson.com/products/:id

## Built With

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM v6](https://reactrouter.com/) - createBrowserRouter
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
