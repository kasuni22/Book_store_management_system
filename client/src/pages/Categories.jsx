import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Pages.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://book-store-management-system-server.onrender.com/api/categories',
          { timeout: 30000 }
        );
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to load categories:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h1>Book Categories</h1>
        <div className="skeleton-grid">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img shimmer" />
              <div className="skeleton-text shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Book Categories</h1>
        <div className="error-state">
          <div className="error-icon">📡</div>
          <h3>Server is waking up...</h3>
          <p>Our server was sleeping. Please wait a moment and try again.</p>
          <button className="btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Book Categories</h1>
      <div className="category-list">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="category-card"
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="cat-img"
                loading="lazy"
              />
            )}
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
