import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Pages.css";
import "../css/BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const userEmail = localStorage.getItem("email");

  const handleAddToWishlist = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add books to your wishlist!");
      navigate("/login");
      return;
    }

    let storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (storedWishlist.find((item) => item._id === book._id)) {
      alert(" This book is already in your wishlist!");
      return;
    }

    storedWishlist.push({
      _id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage,
    });

    localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
    setWishlist(storedWishlist);
    alert(" Book added to your wishlist!");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://book-store-management-system-server.onrender.com/api/categories");
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
        const res = await axios.get(`https://book-store-management-system-server.onrender.com/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log("Error fetching book:", err.message);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p className="loading-text">Loading...</p>;

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");

    if (!token || !userEmail) {
      alert("Please log in to place an order!");
      navigate("/login");
      return;
    }

    if (!book.inStock) {
      alert("Sorry, this book is out of stock.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://book-store-management-system-server.onrender.com/api/orders", {
        userEmail,
        bookId: book._id,
      });
      alert(" Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert(" Failed to place order. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-books-page">

      <div className="category-hero book-banner">
        <div className="overlay">
          <h1 className="header-title">Book Details</h1>
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
            <span className="old-price">Rs. {(book.price + 100).toFixed(2)}</span>
            <span className="new-price">Rs. {book.price.toFixed(2)}</span>
            <span className="discount">Save Rs. 100</span>
          </div>

          <p className="delivery-text">📦 Delivery everywhere in Sri Lanka in 5–7 working days</p>

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
              onClick={handleOrder}
            >
              {loading ? "Processing..." : "📘 Order Book"}
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
                {book.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>
            </p>
          </div>

          <button className="wishlist-btn" onClick={handleAddToWishlist}>
            ♡ Add to Wishlist
          </button>

        </div>
      </div>

      <div className="book-description">
        <h2>About This Book</h2>
        <p>{book.description || "No description available for this book."}</p>
      </div>
    </div>
  );
};

export default BookDetails;
