import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Pages.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    if (!token || !userEmail) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          'https://book-store-management-system-server.onrender.com/api/orders',
          { timeout: 30000 }
        );
        const userOrders = res.data.filter(
          order => order.userEmail === userEmail
        );
        setOrders(userOrders);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, userEmail]);

  const total = orders.reduce((sum, item) => sum + (item.bookPrice || 0), 0);

  if (!token || !userEmail) {
    return (
      <div className="page-container">
        <h1>📦 My Orders</h1>
        <div className="error-state">
          <div className="error-icon">🔒</div>
          <h3>Please Log In to View Your Orders</h3>
          <p>You need to be signed in to see your order history.</p>
          <button className="btn" onClick={() => navigate('/login')}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <h1>📦 My Orders</h1>
        <p style={{ color: '#8a9ab5', marginTop: '40px' }}>
          Loading your orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="page-container">
        <h1>📦 My Orders</h1>
        <div className="error-state">
          <div className="error-icon">📭</div>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet. Browse our categories!</p>
          <button className="btn" onClick={() => navigate('/categories')}>
            Browse Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>📦 My Orders</h1>
      <ul className="cart-list">
        {orders.map((order, index) => (
          <li key={index} className="cart-item">
            <span>
              <strong>{order.bookName}</strong>
              <br />
              <small style={{ color: '#8a9ab5' }}>
                {new Date(order.orderDate).toLocaleDateString()}
              </small>
            </span>
            <span style={{ fontWeight: 700, color: '#C9A84C' }}>
              Rs. {order.bookPrice}
            </span>
          </li>
        ))}
      </ul>
      <div style={{
        maxWidth: '760px',
        margin: '28px auto 0',
        background: 'linear-gradient(135deg, #0C2D6B, #1A4DB5)',
        borderRadius: '14px',
        padding: '20px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
          Total Spent
        </span>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#C9A84C'
        }}>
          Rs. {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default MyOrders;
