import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">

        <div className="footer-brand">
          <div className="footer-brand-logo">📚 Book Store</div>
          <p className="footer-brand-desc">
            Sri Lanka's premium online book store. Connecting readers with
            thousands of titles across every genre — delivered to your door.
          </p>
          <div className="footer-social">
            <a href="#" className="social-btn" title="Facebook">f</a>
            <a href="#" className="social-btn" title="Instagram">in</a>
            <a href="#" className="social-btn" title="Twitter">𝕏</a>
            <a href="#" className="social-btn" title="YouTube">▶</a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">→ Home</Link></li>
            <li><Link to="/aboutus">→ About Us</Link></li>
            <li><Link to="/categories">→ Categories</Link></li>
            <li><Link to="/myorders">→ My Orders</Link></li>
            <li><Link to="/profile">→ My Profile</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Categories</h4>
          <ul className="footer-links">
            <li><Link to="/category/New Arrivals">→ New Arrivals</Link></li>
            <li><Link to="/category/Education">→ Education</Link></li>
            <li><Link to="/category/Novels">→ Novels</Link></li>
            <li><Link to="/category/Science & Technology">→ Science & Tech</Link></li>
            <li><Link to="/category/Children's Books">→ Children's Books</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Contact Us</h4>
          <div className="footer-contact-item">
            <span className="contact-icon">📍</span>
            <span>123 Book Lane, Colombo 03, Sri Lanka</span>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">📞</span>
            <span>+94 11 234 5678</span>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">✉️</span>
            <span>hello@bookstore.lk</span>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">🕐</span>
            <span>Mon – Sat: 9am – 6pm</span>
          </div>
        </div>

      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 <span>Book Store</span>. All rights reserved. Built with ❤️ in Sri Lanka.
        </p>
        <div className="footer-badge">
          📚 <span>5,000+</span> books &nbsp;•&nbsp; <span>10+</span> categories &nbsp;•&nbsp; Fast delivery
        </div>
      </div>
    </footer>
  );
};

export default Footer;
