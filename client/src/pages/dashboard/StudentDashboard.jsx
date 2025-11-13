import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/MyProfile.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("account");
  const [wishlist, setWishlist] = useState([]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      alert("Please log in first!");
      navigate("/login");
    }
  }, [userEmail, navigate]);

  useEffect(() => {
    if (!userEmail) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/auth/${userEmail}`);
        setUser(res.data);
      } catch (err) {
        console.log("Error fetching user:", err.message);
      }
    };
    fetchUser();
  }, [userEmail]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const handleOrder = async (bookId) => {
    try {
      const res = await axios.post("http://localhost:3001/api/orders", {
        userEmail,
        bookId,
      });
      alert(" Book ordered successfully!");

      const updatedWishlist = wishlist.filter((b) => b._id !== bookId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (err) {
      alert("Failed to place order. Please try again later.");
    }
  };

  const handleRemove = (bookId) => {
    const updatedWishlist = wishlist.filter((b) => b._id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="profile-page">

      <div
        className="profile-header"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgdpuo8og/image/upload/v1762690488/7_dylrfs.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 0",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <h1 className="profile-title">My Profile</h1>
        <p>Home / My Profile</p>
      </div>

      <div className="profile-container">

        <div className="sidebar">
          <ul>
            <li
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              <i className="fas fa-user"></i> My Account
            </li>
            <li
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              <i className="fas fa-heart"></i> Wishlist
            </li>
          </ul>
        </div>

        <div className="main-content">

          {activeTab === "account" && (
            <div className="account-section">
              <h2>Personal Details</h2>

              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={user.firstName || ""}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={user.lastName || ""}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="text" value={user.email || ""} readOnly />
              </div>

              <div className="form-group">
                <label>Change Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <button
                className="btn"
                onClick={async () => {
                  try {
                    await axios.put(
                      `http://localhost:3001/api/auth/${user.email}`,
                      user
                    );
                    alert(" Profile updated successfully!");
                  } catch (err) {
                    alert(" Failed to update profile. Try again later.");
                  }
                }}
              >
                💾 Save Changes
              </button>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="wishlist-section">
              <h2>My Wishlist 💙</h2>

              {wishlist.length === 0 ? (
                <p>You haven’t added any books yet.</p>
              ) : (
                <div className="wishlist-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Stock Status</th>
                        <th colSpan="2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((book) => (
                        <tr key={book._id}>
                          <td className="wishlist-item">
                            <img
                              src={book.coverImage || "/placeholder.png"}
                              alt={book.title}
                              className="wishlist-img"
                            />
                            <span>{book.title}</span>
                          </td>
                          <td>Rs. {book.price}</td>
                          <td>
                            <span className="in-stock">In Stock</span>
                          </td>
                          <td>
                            <button
                              className="btn order-btn"
                              onClick={() => handleOrder(book._id)}
                            >
                              📘 Order Book
                            </button>
                          </td>
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemove(book._id)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
