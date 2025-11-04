import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Dashboard.css";
import AdminNavbar from "../../components/AdminNavbar";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    totalStudents: 0,
    totalOrders: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, categoriesRes, studentsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:3001/api/books"),
          axios.get("http://localhost:3001/api/categories"),
          axios.get("http://localhost:3001/api/auth"),
          axios.get("http://localhost:3001/api/orders"),
        ]);

        setStats({
          totalBooks: booksRes.data.length,
          totalCategories: categoriesRes.data.length,
          totalStudents: studentsRes.data.length,
          totalOrders: ordersRes.data.length,
        });
      } catch (err) {
        console.log("Error fetching stats:", err.message);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
    <AdminNavbar />
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
      </div>

      
      <div className="stats-grid">
        <div className="card">
          <h2>{stats.totalBooks}</h2>
          <p>Total Books</p>
        </div>
        <div className="card">
          <h2>{stats.totalCategories}</h2>
          <p>Total Categories</p>
        </div>
        <div className="card">
          <h2>{stats.totalStudents}</h2>
          <p>Total Students</p>
        </div>
        <div className="card">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>
      </div>

      
      <div className="admin-actions">
        <button className="btn" onClick={() => navigate("/admin/books")}>
          📚 Manage Books
        </button>
        <button className="btn" onClick={() => navigate("/admin/categories")}>
          🗂️ Manage Categories
        </button>
        <button className="btn" onClick={() => navigate("/admin/students")}>
          👩‍🎓 Manage Students
        </button>
        <button className="btn" onClick={() => navigate("/admin/orders")}>
          🛍️ View Orders
        </button>
      </div>
    </div>
    </>

  );
};

export default AdminDashboard;
