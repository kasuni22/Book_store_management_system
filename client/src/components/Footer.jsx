import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glass">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">📚 Book Store</div>
            <p>
              Sri Lanka's premium online book store.
              Connecting readers with thousands of
              titles across every genre — delivered
              to your door.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">→ Home</Link></li>
              <li><Link to="/about">→ About Us</Link></li>
              <li><Link to="/categories">→ Categories</Link></li>
              <li><Link to="/my-orders">→ My Orders</Link></li>
              <li><Link to="/my-profile">→ My Profile</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/categories/new">→ New Arrivals</Link></li>
              <li><Link to="/categories/education">→ Education</Link></li>
              <li><Link to="/categories/novels">→ Novels</Link></li>
              <li><Link to="/categories/science">→ Science & Tech</Link></li>
              <li><Link to="/categories/children">→ Children's Books</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>123 Book Lane,<br />Colombo 03, Sri Lanka</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span>+94 11 234 5678</span>
            </div>
            <div className="footer-contact-item">
              <span>✉</span>
              <span>hello@bookstore.lk</span>
            </div>
            <div className="footer-contact-item">
              <span>🕐</span>
              <span>Mon – Sat: 9am – 6pm</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© 2026 <strong>Book Store</strong>. All rights reserved. Built with ❤️ in Sri Lanka.</span>
        <span className="footer-badge">📚 5,000+ books · 10+ categories · Fast delivery</span>
      </div>
    </footer>
  );
};

export default Footer;