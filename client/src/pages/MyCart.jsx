import React, { useState } from 'react';
import '../css/Pages.css';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "JavaScript Essentials", price: 1200 },
    { id: 2, title: "Learn React", price: 1500 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h1>🛒 My Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>Rs. {item.price}</span>
              </li>
            ))}
          </ul>
          <h3>Total: Rs. {total}</h3>
          <button className="btn">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default MyCart;
