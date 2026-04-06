import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css';

const API = 'https://book-store-management-system-server.onrender.com';

const CATEGORIES = [
  { name: "New Arrivals", icon: "✨", desc: "Latest additions to our collection" },
  { name: "Education", icon: "🎓", desc: "Academic & learning resources" },
  { name: "Novels", icon: "📖", desc: "Fiction & storytelling masterpieces" },
  { name: "Science & Technology", icon: "🔬", desc: "STEM & innovation books" },
  { name: "Children's Books", icon: "🌈", desc: "Magical stories for young minds" },
  { name: "Romance", icon: "💕", desc: "Love stories & heartfelt tales" },
];

const TESTIMONIALS = [
  { name: "Dilani P.", role: "Student, Colombo", text: "Knova has the best collection of educational books. Delivery was super fast!", avatar: "DP" },
  { name: "Ravindu S.", role: "Book Enthusiast", text: "Found rare titles I couldn't find anywhere else. The wishlist feature is amazing!", avatar: "RS" },
  { name: "Amaya K.", role: "Teacher, Kandy", text: "Perfect platform for ordering books for my classroom. Highly recommended!", avatar: "AK" },
];

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const navigate = (path) => window.location.href = path;

  useEffect(() => {
    axios.get(`${API}/api/books`)
      .then(res => setFeaturedBooks(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className='hero'>
        <div className='hero-inner'>
          <div className='hero-content'>
            <div className='hero-badge'>✦ Sri Lanka's Premium Book Store</div>
            <h1 className='hero-text'>
              Discover Your
              <span className='gold-accent'>Next Great Read</span>
            </h1>
            <p className='hero-description'>
              Explore thousands of books across every genre — from timeless classics
              to the latest releases. Your next adventure starts here.
            </p>
            <div className='hero-cta'>
              <Link to='/categories' className='btn-primary'>Browse Categories →</Link>
              <Link to='/login' className='btn-outline'>Join Knova</Link>
            </div>
            <div className='hero-stats'>
              <div className='stat-card'>
                <div className='stat-number'>5,000+</div>
                <div className='stat-label'>Books</div>
              </div>
              <div className='stat-card'>
                <div className='stat-number'>10+</div>
                <div className='stat-label'>Categories</div>
              </div>
              <div className='stat-card'>
                <div className='stat-number'>1,200+</div>
                <div className='stat-label'>Readers</div>
              </div>
            </div>
          </div>
          <div className='hero-image-wrap'>
            <div className='hero-image-frame'>
              <img
                src='https://res.cloudinary.com/dgdpuo8og/image/upload/v1761309991/bookstore_kvde0n.jpg'
                alt='Knova Book Store Collection'
                className='hero-img'
              />
            </div>
            <div className='hero-float-card'>
              <div className='float-card-title'>10+ Genres</div>
              <div className='float-card-label'>From fiction to science</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div className='marquee-strip'>
        <div className='marquee-track'>
          {['New Arrivals', 'Education', 'Novels', 'Science & Tech', 'Children\'s Books', 'Romance', 'Cookery', 'Poems', 'Translations', 'Others',
            'New Arrivals', 'Education', 'Novels', 'Science & Tech', 'Children\'s Books', 'Romance', 'Cookery', 'Poems', 'Translations', 'Others'].map((cat, i) => (
            <span key={i} className='marquee-item'>
              <span className='marquee-dot'>✦</span> {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className='home-categories-section'>
        <div className='section-header'>
          <div className='section-eyebrow'>Browse By Genre</div>
          <h2 className='section-title'>Explore Our Collections</h2>
          <p className='section-subtitle'>Find your perfect book from our carefully curated categories</p>
        </div>
        <div className='home-cat-grid'>
          {CATEGORIES.map((cat) => (
            <Link to={`/category/${cat.name}`} key={cat.name} className='home-cat-card'>
              <div className='home-cat-icon'>{cat.icon}</div>
              <h3 className='home-cat-name'>{cat.name}</h3>
              <p className='home-cat-desc'>{cat.desc}</p>
              <span className='home-cat-arrow'>→</span>
            </Link>
          ))}
        </div>
        <div className='section-cta'>
          <Link to='/categories' className='btn-primary'>View All Categories →</Link>
        </div>
      </section>

      {/* ===== FEATURED BOOKS ===== */}
      {featuredBooks.length > 0 && (
        <section className='featured-section'>
          <div className='section-header'>
            <div className='section-eyebrow'>Hand Picked</div>
            <h2 className='section-title' style={{color:'#fff'}}>Featured Books</h2>
            <p className='section-subtitle' style={{color:'rgba(255,255,255,0.55)'}}>Discover what readers are loving right now</p>
          </div>
          <div className='featured-grid'>
            {featuredBooks.map(book => (
              <div key={book._id} className='featured-book-card' onClick={() => navigate(`/book/${book._id}`)}>
                <div className='featured-book-img-wrap'>
                  <img src={book.coverImage || '/placeholder.png'} alt={book.title} className='featured-book-img' />
                  <div className='featured-book-overlay'>
                    <span className='featured-view-btn'>View Details →</span>
                  </div>
                </div>
                <div className='featured-book-info'>
                  <h4 className='featured-book-title'>{book.title}</h4>
                  <p className='featured-book-author'>{book.author}</p>
                  <p className='featured-book-price'>Rs. {book.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='section-cta'>
            <Link to='/categories' className='btn-outline'>Browse All Books →</Link>
          </div>
        </section>
      )}

      {/* ===== FEATURES ===== */}
      <section className='features-section'>
        <div className='section-header'>
          <div className='section-eyebrow'>Why Choose Us</div>
          <h2 className='section-title'>Everything a Book Lover Needs</h2>
        </div>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>📦</div>
            <h3 className='feature-title'>Fast Island-wide Delivery</h3>
            <p className='feature-desc'>Get your books delivered to your doorstep in 5–7 working days across all of Sri Lanka.</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>📚</div>
            <h3 className='feature-title'>5,000+ Titles</h3>
            <p className='feature-desc'>Browse thousands of titles across all genres — children's, education, science, novels, and more.</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>❤️</div>
            <h3 className='feature-title'>Wishlist & Orders</h3>
            <p className='feature-desc'>Save your favourite books to your wishlist and track all your orders in one place.</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🔒</div>
            <h3 className='feature-title'>Secure & Trusted</h3>
            <p className='feature-desc'>Your personal data and orders are always protected with our secure platform.</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🌍</div>
            <h3 className='feature-title'>Global Authors</h3>
            <p className='feature-desc'>Access books from thousands of authors across the world, including local Sri Lankan writers.</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>💎</div>
            <h3 className='feature-title'>Premium Quality</h3>
            <p className='feature-desc'>Every book in our collection is carefully selected to ensure the highest quality for our readers.</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className='testimonials-section'>
        <div className='section-header'>
          <div className='section-eyebrow'>Reader Stories</div>
          <h2 className='section-title' style={{color:'#fff'}}>What Our Readers Say</h2>
        </div>
        <div className='testimonials-grid'>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className='testimonial-card'>
              <div className='testimonial-stars'>★★★★★</div>
              <p className='testimonial-text'>"{t.text}"</p>
              <div className='testimonial-author'>
                <div className='testimonial-avatar'>{t.avatar}</div>
                <div>
                  <div className='testimonial-name'>{t.name}</div>
                  <div className='testimonial-role'>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className='cta-section'>
        <div className='cta-content'>
          <div className='cta-eyebrow'>Start Reading Today</div>
          <h2 className='cta-title'>Your Next Favourite Book is Waiting</h2>
          <p className='cta-desc'>
            Join over 1,200 readers who trust Knova Book Store for their reading journey.
            Sign up free and start exploring today.
          </p>
          <div className='cta-buttons'>
            <Link to='/login' className='btn-primary'>Create Free Account →</Link>
            <Link to='/categories' className='btn-outline'>Browse Books</Link>
          </div>
        </div>
      </section>

      {/* ===== QUOTE ===== */}
      <section className='quote-section'>
        <p className='quote-text'>
          "A room without books is like a <span>body without a soul.</span>"
        </p>
        <p className='quote-author'>— Marcus Tullius Cicero</p>
      </section>
    </>
  );
};

export default Home;