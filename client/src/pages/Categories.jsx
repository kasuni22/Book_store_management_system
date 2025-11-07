import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Pages.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:3001/api/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

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
            {cat.image && <img src={cat.image} alt={cat.name} className="cat-img" />}
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
