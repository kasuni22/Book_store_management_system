import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Pages.css';

const API = 'https://book-store-management-system-server.onrender.com';

const SkeletonCard = () => (
  <div className="category-card skeleton-card">
    <div className="skeleton-img" />
    <div className="skeleton-text" />
  </div>
);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    setError(false);
    setRetrying(false);
    try {
      const res = await axios.get(`${API}/api/categories`, { timeout: 60000 });
      setCategories(res.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    const timer = setTimeout(() => {
      if (loading) setRetrying(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='categories-page'>
      <div className='page-header'>
        <div className='page-eyebrow'>Explore Our Collection</div>
        <h1 className='page-title'>Book Categories</h1>
        <p className='page-subtitle'>Find your next favourite read from our curated selection</p>
      </div>

      {loading && retrying && (
        <div className="loading-banner">
          <div className="loading-spinner" />
          <span>Waking up the server... this takes up to 30 seconds on first load.</span>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <span>⚠️ Could not load categories.</span>
          <button className="retry-btn" onClick={fetchCategories}>Try Again</button>
        </div>
      )}

      <div className='category-list'>
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : categories.map((cat) => (
              <div
                key={cat._id}
                className='category-card'
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                {cat.image && <img src={cat.image} alt={cat.name} className='cat-img' />}
                <h3>{cat.name}</h3>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Categories;
