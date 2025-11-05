import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Dashboard.css';
import AdminNavbar from "../../components/AdminNavbar";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    price: "",
    category: "",
    quantity: "",
    coverImage: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log("Error fetching books:", err.message);
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/books/${editingId}`, form);
        alert("Book updated successfully!");
      } else {
        await axios.post("http://localhost:3001/api/books", form);
        alert("Book added successfully!");
      }

      setForm({
        isbn: "",
        title: "",
        author: "",
        publisher: "",
        year: "",
        price: "",
        category: "",
        quantity: "",
        coverImage: ""
      });
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving book");
    }
  };


  const handleEdit = (book) => {
    setForm(book);
    setEditingId(book._id);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await axios.delete(`http://localhost:3001/api/books/${id}`);
      fetchBooks();
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <h1>📚 Book Details</h1>

        <div className="toolbar">
          <label className="form-label">Search:</label>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <form className="book-form" onSubmit={handleSubmit}>
          <h2 className="form-title">{editingId ? "✏️ Edit Book" : "➕ Add New Book"}</h2>

          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">ISBN (Unique)</label>
              <input
                type="text"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="e.g. 978-3-16-148410-0"
                required
              />
            </div>


            <div className="form-group">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>


            <div className="form-group">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>


            <div className="form-group">
              <label className="form-label">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                placeholder="Enter publisher"
              />
            </div>


            <div className="form-group">
              <label className="form-label">Published Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="e.g. 2024"
              />
            </div>


            <div className="form-group">
              <label className="form-label">Price (Rs)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>


            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
            </div>


            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="Paste image URL"
              />
            </div>
          </div>


          <div className="form-actions">
            <button type="submit" className="btn save-btn">
              {editingId ? "💾 Update Book" : "📘 Add Book"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    isbn: "",
                    title: "",
                    author: "",
                    publisher: "",
                    year: "",
                    price: "",
                    category: "",
                    quantity: "",
                    coverImage: "",
                  });
                }}
              >
                ✖ Cancel
              </button>
            )}
          </div>
        </form>


        <table className="book-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books
              .filter((b) =>
              (b.title?.toLowerCase().includes(search.toLowerCase()) ||
                b.isbn?.includes(search))
              )
              .map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td><img src={book.coverImage} alt={book.title} className="book-cover" /></td>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.year}</td>
                  <td>{book.category}</td>
                  <td>Rs. {book.price}</td>
                  <td style={{ color: book.quantity > 0 ? "green" : "red" }}>
                    {book.quantity > 0 ? "In Stock" : "Out of Stock"} ({book.quantity})
                  </td>
                  <td>
                    <button className="btn edit" onClick={() => handleEdit(book)}>✏️</button>
                    <button className="btn delete" onClick={() => handleDelete(book._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageBooks;
