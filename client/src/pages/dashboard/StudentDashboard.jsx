import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Dashboard.css';

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/books');
        setBooks(res.data);
      } catch (err) {
        console.log('Error fetching books:', err.message);
      }
    };
    fetchBooks();
  }, []);

  const handleOrder = async (bookId) => {
    try {
      await axios.post('http://localhost:3001/api/orders', { bookId });
      alert('Book ordered successfully!');
    } catch (err) {
      alert('Error placing order');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>🎓 Student Dashboard</h1>
      <p>Welcome! Browse available books and place your order.</p>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={book.coverImage || "/placeholder.png"}
              alt={book.title}
              className="book-image"
            />
            <h3 className="book-title">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: Rs. {book.price}</p>
            <button className="btn" onClick={() => handleOrder(book._id)}>
              🛒 Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;