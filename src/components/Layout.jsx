import { Outlet } from "react-router-dom";
import Header from "./Header";

// Layout wraps all pages that should have the Header
// Outlet renders the active child route
function Layout() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
