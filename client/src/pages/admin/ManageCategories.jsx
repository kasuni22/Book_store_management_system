import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Pages.css";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" })
  const [editMode, setEditMode] = useState(null);

  
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:3001/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/categories", newCategory);
      setNewCategory({ name: "", image: "" });
      fetchCategories();
      alert("Category added!");
    } catch (err) {
      alert("Error adding category");
    }
  };

  
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/categories/${id}`, newCategory);
      setEditMode(null);
      setNewCategory({ name: "", image: "" });
      fetchCategories();
      alert("Category updated!");
    } catch (err) {
      alert("Error updating category");
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await axios.delete(`http://localhost:3001/api/categories/${id}`);
      fetchCategories();
      alert("Deleted!");
    }
  };

  return (
    <div className="page-container">
      <h1>📚 Manage Categories</h1>

      
      <form className="form-card" onSubmit={handleAdd}>
          <label htmlFor="categoryName" className="form-label">Category Name</label>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          required
        />
        <label htmlFor="categoryImage" className="form-label">Image URL</label>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={newCategory.image}
          onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
        />
        <button className="btn" type="submit">Add Category</button>
      </form>

      
      <div className="category-list">
        {categories.map((cat) => (
          <div key={cat._id} className="category-card">
            {editMode === cat._id ? (
              <>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <button className="btn" onClick={() => handleUpdate(cat._id)}>Save</button>
                <button className="btn" onClick={() => setEditMode(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{cat.name}</h3>
                {cat.image && <img src={cat.image} alt={cat.name} className="cat-img" />}
                <div>
                  <button className="btn" onClick={() => { setEditMode(cat._id); setNewCategory(cat); }}>✏️ Edit</button>
                  <button className="btn" onClick={() => handleDelete(cat._id)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
