import React from 'react';
import '../css/Pages.css';

const AboutUs = () => {
  return (
    <div className="page-container">
      <h1>About Us</h1>
      <div className="book-description" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Welcome to <b style={{ color: 'var(--navy-light)' }}>Book Store</b>!  
          We are passionate about books and committed to delivering the best reading experience.  
          Our platform connects readers with thousands of authors and categories worldwide.
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--gold-dark)', fontSize: '1.3rem', marginTop: '30px' }}>
          📖 "A room without books is like a body without a soul." <br/>
          <span style={{ fontSize: '1rem', color: '#64748b' }}>— Marcus Tullius Cicero</span>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
