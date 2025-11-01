import React from 'react'
import '../css/Home.css'

const Home = () => {
    return (
        <div className='hero'>
            <div className='hero-content'>
                <h1 className='hero-text'>📚 Welcome to the Book Store</h1>
                <p className='hero-description'>
                    Explore a wide collection of books across various genres.  
                    From fiction to education — find your next favorite book here!
                </p>
            </div>
            <div className='hero-image'></div>
        </div>
    )
}

export default Home