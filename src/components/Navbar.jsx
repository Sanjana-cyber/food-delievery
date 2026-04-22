import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav className="navbar">
        <div className="brand" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          <span className="brand-name">Sethi burger</span>
          <span className="burger-emoji">🍔</span>
        </div>
        <ul className="nav-links">
          <li><a href="/home" className={isActive("/home") ? "active" : ""}>Home</a></li>
          <li><a href="/menu" className={isActive("/menu") ? "active" : ""}>Menu</a></li>
          <li><a href="/order" className={isActive("/order") ? "active" : ""}>Order</a></li>
          <li><a href="/reviews" className={isActive("/reviews") ? "active" : ""}>Reviews</a></li>
        </ul>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>
    </header>
  );
}
