import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import "./App.css";

// Lazy load all page components - this splits the code into smaller chunks
// so the browser only downloads what it needs for the current page
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFound = lazy(() => import("./components/NotFound"));

// Loading spinner shown while lazy components are being downloaded
function PageLoader() {
  return <div className="page-loader">⏳ Loading...</div>;
}

// Using createBrowserRouter (modern data router approach)
// This supports better features like loaders and data handling
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout wraps all main pages (includes Header)
    children: [
      {
        index: true, // Default route for "/"
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "product/:id", // Dynamic route - id changes per product
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    // 404 route - outside Layout so the Header is NOT shown on this page
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
