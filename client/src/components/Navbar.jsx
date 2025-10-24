import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to="/" className='navbar-brand'>Book Store</Link>
            </div>
            <div className='navbar-right'>
                <Link to="/books" className='navbar-link'>Books</Link>
                <Link to="/login" className='navbar-link'>Login</Link>
            </div>
        </nav>
        
    )
}

export default Navbar