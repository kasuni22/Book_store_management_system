import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminNavbar.css";
import axios from "axios";

const AdminNavbar = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;


        const res = await axios.get("http://localhost:3001/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminName(res.data.firstName);
      } catch (err) {
        console.error("Error fetching admin:", err.message);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <Link to="/admin" className="admin-brand">📊 Admin Panel</Link>
        {adminName && <span className="welcome-text">Welcome, {adminName}!</span>}
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
