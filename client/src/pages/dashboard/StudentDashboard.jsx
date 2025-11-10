import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/MyProfile.css";

const StudentDashboard = () => {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("account");
  const userEmail = localStorage.getItem("email") || "student@example.com";

  useEffect(() => {
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

  return (
    <div className="profile-page">

      <div className="profile-header" style={{
        backgroundImage: "url('https://res.cloudinary.com/dgdpuo8og/image/upload/v1762690488/7_dylrfs.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 0",
        color: "white",
        textAlign: "center",
        position: "relative",
      }}>
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
                <input type="text" value={user.firstName || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" value={user.lastName || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="text" value={user.email || ""} readOnly />
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="wishlist-section">
              <h2>My Wishlist 💙</h2>
              <p>You haven’t added any books yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
