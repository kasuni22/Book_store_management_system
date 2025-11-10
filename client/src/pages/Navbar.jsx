import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Link to="/" className='navbar-brand'>Book Store</Link>
      </div>

      <div className='navbar-right'>
        <Link to="/" className='navbar-link'>Home</Link>
        <Link to="/aboutus" className='navbar-link'>About Us</Link>
        <Link to="/categories" className='navbar-link'>Categories</Link>
        <Link to="/mycart" className='navbar-link'>My Cart</Link>
        <Link to="/profile" className='navbar-link'>My Profile</Link>

      
        {!token ? (
          <Link to="/login" className='navbar-link'>Sign Up / Login</Link>
        ) : (
          <button onClick={handleLogout} className='navbar-link logout-btn'>
            Logout ({role})
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
