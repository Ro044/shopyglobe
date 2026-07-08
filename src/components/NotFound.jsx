import { Link, useLocation } from "react-router-dom";

// 404 page shown when user visits an unknown route
// This component does NOT use Layout, so no Header is shown
function NotFound() {
  // useLocation gives us info about the current URL
  const location = useLocation();

  return (
    <div className="notfound-page">
      <div className="notfound-box">
        <h1 className="notfound-code">404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>

        {/* Show the invalid URL that the user tried to visit */}
        <div className="notfound-url">
          <p>You tried to visit:</p>
          <code>{location.pathname}</code>
        </div>

        <Link to="/" className="btn-primary">Go Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
