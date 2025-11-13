import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/Pages.css";

const CategoryBooks = () => {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const categories = [
    "New Arrivals",
    "Children's Books",
    "Education",
    "Science & Technology",
    "Poems",
    "Cookery",
    "Novels",
    "Translations",
    "Romance",
    "Others",
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-store-management-system-server.onrender.com/api/books");
        const filtered = res.data.filter(
          (book) => book.category.toLowerCase() === name.toLowerCase()
        );
        setBooks(filtered);
        setFilteredBooks(filtered);
      } catch (err) {
        console.log("Error fetching books:", err.message);
      }
    };
    fetchBooks();
  }, [name]);

  useEffect(() => {
    let filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOption === "price-low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "title-az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-za") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredBooks(filtered);
  }, [search, sortOption, books]);

  return (
    <div className="category-books-page">

      <div
        className="category-hero"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgdpuo8og/image/upload/v1762445111/1_vx5sxv.jpg')",
        }}
      >
        <div className="overlay">
          <h1 className="hero-title">{name} </h1>

          <div className="category-nav">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className={`cat-link ${cat.toLowerCase() === name.toLowerCase() ? "active" : ""
                  }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>


      <div className="sort-bar">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="">Sort by</option>
          <option value="price-low-high">Price: Low → High</option>
          <option value="price-high-low">Price: High → Low</option>
          <option value="title-az">Title: A → Z</option>
          <option value="title-za">Title: Z → A</option>
        </select>
      </div>


      <div className="book-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <img
                src={book.coverImage || "/placeholder.png"}
                alt={book.title}
                className="book-image"
              />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-price">Rs. {book.price}</p>
              <p
                className={`book-stock ${book.inStock ? "in-stock" : "out-stock"
                  }`}
              >
                {book.inStock ? "In stock" : "Out of stock"}
              </p>
            </div>
          ))
        ) : (
          <p className="no-books">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryBooks;
