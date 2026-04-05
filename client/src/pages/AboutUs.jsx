import React from 'react';
import '../css/Pages.css';

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <div className="about-eyebrow">✦ Our Story</div>
          <h1 className="about-hero-title">
            This is <span>Knova.</span><br />Your Next Chapter <span>Starts Here.</span>
          </h1>
          <p className="about-hero-sub">
            Knova Book Store is Sri Lanka's premier destination for readers of all
            ages and interests — where knowledge meets discovery.
          </p>
        </div>
        <div className="about-hero-image">
          <img
            src="https://res.cloudinary.com/dgdpuo8og/image/upload/q_auto/f_auto/v1775380138/photo6jpg_duv2ox.jpg"
            alt="Knova Book Store"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="about-stats-bar">
        <div className="about-stat">
          <div className="about-stat-number">5,000+</div>
          <div className="about-stat-label">Books Available</div>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <div className="about-stat-number">10+</div>
          <div className="about-stat-label">Categories</div>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <div className="about-stat-number">1,200+</div>
          <div className="about-stat-label">Happy Readers</div>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <div className="about-stat-number">5★</div>
          <div className="about-stat-label">Customer Rating</div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-mission">
        <div className="about-mission-text">
          <div className="about-section-eyebrow">Our Mission</div>
          <h2 className="about-section-title">Why We Exist</h2>
          <p>
            At Knova Book Store, we believe every person deserves access to great books.
            We are committed to making reading accessible, affordable, and delightful
            for everyone across Sri Lanka.
          </p>
          <p>
            Our platform bridges the gap between passionate readers and the world's
            best authors — from local Sri Lankan writers to international bestsellers.
          </p>
          <div className="about-values">
            <div className="about-value-item">
              <span className="value-icon">📖</span>
              <span>Curated Collections</span>
            </div>
            <div className="about-value-item">
              <span className="value-icon">🚀</span>
              <span>Fast Island-wide Delivery</span>
            </div>
            <div className="about-value-item">
              <span className="value-icon">💎</span>
              <span>Premium Quality Books</span>
            </div>
            <div className="about-value-item">
              <span className="value-icon">🤝</span>
              <span>Trusted by Thousands</span>
            </div>
          </div>
        </div>
        <div className="about-mission-cards">
          <div className="about-feature-card">
            <div className="about-feature-icon">🌍</div>
            <h3>Global Authors</h3>
            <p>Access books from thousands of authors across the world, all in one place.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-icon">📦</div>
            <h3>Reliable Delivery</h3>
            <p>Island-wide delivery in 5–7 working days, right to your doorstep.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-icon">🔒</div>
            <h3>Secure Orders</h3>
            <p>Your orders and personal data are always safe and protected with us.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-icon">💬</div>
            <h3>Reader Community</h3>
            <p>Join a growing community of book lovers sharing their passion for reading.</p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="about-quote-section">
        <div className="about-quote-mark">"</div>
        <blockquote className="about-quote-text">
          A room without books is like a body without a soul.
        </blockquote>
        <p className="about-quote-author">— Marcus Tullius Cicero</p>
      </div>

      {/* Team Section */}
      <div className="about-team-section">
        <div className="about-section-eyebrow" style={{textAlign:'center'}}>The People Behind It</div>
        <h2 className="about-section-title" style={{textAlign:'center'}}>Built With Love</h2>
        <div className="about-team-grid">
          <div className="about-team-card">
            <div className="team-avatar" style={{background:'linear-gradient(135deg,#0C2D6B,#1A4DB5)'}}>KK</div>
            <h4>Kasuni Kariyawasam</h4>
            <p>Founder & Developer</p>
          </div>
          <div className="about-team-card">
            <div className="team-avatar" style={{background:'linear-gradient(135deg,#9a7a2e,#C9A84C)'}}>📚</div>
            <h4>Our Curators</h4>
            <p>Book Selection Team</p>
          </div>
          <div className="about-team-card">
            <div className="team-avatar" style={{background:'linear-gradient(135deg,#1A4DB5,#2E86AB)'}}>🚀</div>
            <h4>Delivery Partners</h4>
            <p>Island-wide Network</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
