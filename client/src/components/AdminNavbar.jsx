import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminNavbar.css";


const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <Link to="/admin" className="admin-brand">📊 Admin Panel</Link>
      </div>
      <div className="admin-nav-right">
        <Link to="/admin/books" className="admin-link">Books</Link>
        <Link to="/admin/categories" className="admin-link">Categories</Link>
        <Link to="/admin/students" className="admin-link">Students</Link>
        <Link to="/admin/orders" className="admin-link">Orders</Link>
        <button className="admin-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
