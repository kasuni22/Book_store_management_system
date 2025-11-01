import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        const books = await axios.get('http://localhost:3001/api/books');
        const students = await axios.get('http://localhost:3001/api/users');
        const orders = await axios.get('http://localhost:3001/api/orders');

        setStats({
          totalBooks: books.data.length,
          totalStudents: students.data.length,
          totalOrders: orders.data.length,
        });
      } catch (err) {
        console.log('Error fetching stats:', err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>📊 Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="card">
          <h2>{stats.totalBooks}</h2>
          <p>Total Books</p>
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
        <button className="btn">📚 Manage Books</button>
        <button className="btn">🗂️ Manage Categories</button>
        <button className="btn">👩‍🎓 Manage Students</button>
        <button className="btn">🛍️ View Orders</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
