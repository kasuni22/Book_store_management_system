import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/MyProfile.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("account");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!token || !userEmail) {
      setLoading(false);
      return;
    }
  }, [token, userEmail, navigate]);

  useEffect(() => {
    if (!userEmail) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://book-store-management-system-server.onrender.com/api/auth/${userEmail}`);
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
      const res = await axios.post("https://book-store-management-system-server.onrender.com/api/orders", {
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

  const getUserInitials = () => {
    if (user.firstName && user.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase();
    }
    return "U";
  };

  if (!token || !userEmail) {
    return (
      <div className="page-container">
        <h1>My Profile</h1>
        <div className="error-state">
          <div className="error-icon">🔒</div>
          <h3>Please Log In to View Your Profile</h3>
          <p>You need to be signed in to access your profile and wishlist.</p>
          <button className="btn" onClick={() => navigate('/login')}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div
        className="profile-header"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgdpuo8og/image/upload/v1762690488/7_dylrfs.jpg')",
        }}
      >
        <div className="overlay">
          <div className="profile-header-content">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-breadcrumb">Home / <span>My Profile</span></p>
          </div>
        </div>
      </div>

      <div className="profile-container">

        <div className="sidebar">
          <div className="sidebar-avatar">
            <div className="avatar-circle">
              {getUserInitials()}
            </div>
            <h3 className="avatar-name">{user.firstName} {user.lastName}</h3>
            <p className="avatar-email">{user.email}</p>
          </div>

          <ul>
            <li
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              <span className="sidebar-icon">👤</span> My Account
            </li>
            <li
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              <span className="sidebar-icon">❤️</span> Wishlist
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
                      `https://book-store-management-system-server.onrender.com/api/auth/${user.email}`,
                      user
                    );
                    alert(" Profile updated successfully!");
                  } catch (err) {
                    alert(" Failed to update profile. Try again later.");
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="wishlist-section">
              <h2>My Wishlist</h2>

              {wishlist.length === 0 ? (
                <div className="wishlist-empty">
                  <div className="empty-icon">📂</div>
                  <h3>Your wishlist is empty</h3>
                  <p>Browse categories and add some books to your wishlist.</p>
                </div>
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
                          <td className="wishlist-price">Rs. {book.price}</td>
                          <td>
                            <span className="in-stock">In Stock</span>
                          </td>
                          <td>
                            <button
                              className="order-btn"
                              onClick={() => handleOrder(book._id)}
                            >
                              Order Book
                            </button>
                          </td>
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemove(book._id)}
                            >
                              ✕
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
