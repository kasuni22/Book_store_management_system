import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Pages.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.log("Error fetching categories:", err.message);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log("Error fetching book:", err.message);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p className="loading-text">Loading...</p>;

  const handleAddToCart = () => {
    alert(`${book.title} added to cart (Qty: ${quantity})`);
  };

  return (
    <div className="category-books-page">


      <div
        className="category-hero"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgdpuo8og/image/upload/v1762168368/9_bk0mab.jpg')",
        }}
      >
        <div className="overlay">
          <h1 className="header-title">📖 Book Details</h1>


          <div className="category-bar">
            {categories.map((cat) => (
              <span
                key={cat._id}
                className="category-link"
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="book-details-wrapper">
        <div className="book-details-image">
          <img
            src={book.coverImage || "/placeholder.png"}
            alt={book.title}
            className="detail-img"
          />
        </div>

        <div className="book-details-info">
          <h1 className="detail-title">{book.title}</h1>

          <div className="price-section">
            <span className="old-price">Rs. {(book.price + 200).toFixed(2)}</span>
            <span className="new-price">Rs. {book.price.toFixed(2)}</span>
            <span className="discount">10% OFF</span>
          </div>

          <p className="vat-text">*inclusive of VAT</p>
          <p className="delivery-text">📦 Delivery in 5–7 working days</p>

          <div className="quantity-cart">
            <label>Qty</label>
            <input
              type="number"
              min="1"
              max={book.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="btn add-to-cart"
              disabled={!book.inStock}
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
          </div>

          <div className="additional-info">
            <p><b>Author(s):</b> {book.author}</p>
            <p><b>Publisher:</b> {book.publisher}</p>
            <p><b>ISBN:</b> {book.isbn}</p>
            <p><b>Category:</b> {book.category}</p>
            <p><b>Year:</b> {book.year}</p>
            <p><b>Format:</b> Paperback</p>
            <p>
              <b>Availability:</b>{" "}
              <span className={book.inStock ? "in-stock" : "out-stock"}>
                {book.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>

          <button className="wishlist-btn">♡ Add to Wishlist</button>
        </div>
      </div>

      <div className="book-description">
        <h2>Description</h2>
        <p>{book.description || "No description available for this book."}</p>
      </div>
    </div>
  );
};

export default BookDetails;
