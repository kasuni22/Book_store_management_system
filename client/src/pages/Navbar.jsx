import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to="/home" className='navbar-brand'>Book Store</Link>
            </div>
            <div className='navbar-right'>
                <Link to="/home" className='navbar-link'>Home</Link>
                <Link to="/aboutus" className='navbar-link'>About Us</Link>
                <Link to="/categories" className='navbar-link'>Categories</Link>
                <Link to="/mycart" className='navbar-link'>My Cart</Link>
                <Link to="/login" className='navbar-link'>Sign Up/ Login</Link>
            </div>
        </nav>
        
    )
}

export default Navbar