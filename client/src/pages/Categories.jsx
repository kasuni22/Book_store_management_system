import React from 'react';
import '../css/Pages.css';

const Categories = () => {
  const categories = [
    "Fiction",
    "Science & Technology",
    "Education",
    "Romance",
    "History",
    "Comics",
    "Fantasy",
    "Biography",
  ];

  return (
    <div className="page-container">
      <h1>Book Categories</h1>
      <div className="category-list">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <h3>{cat}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
