import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Pages.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("email") || "student@example.com";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/orders");

        const userOrders = res.data.filter(order => order.userEmail === userEmail);
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userEmail]);

  const total = orders.reduce((sum, item) => sum + (item.bookPrice || 0), 0);

  return (
    <div className="page-container">
      <h1>📦 My Orders</h1>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <>
          <ul className="cart-list">
            {orders.map((order, index) => (
              <li key={index} className="cart-item">
                <span>
                  <strong>{order.bookName}</strong> <br />
                  <small>{new Date(order.orderDate).toLocaleDateString()}</small>
                </span>
                <span>Rs. {order.bookPrice}</span>
              </li>
            ))}
          </ul>
          <h3>Total Spent: Rs. {total}</h3>
        </>
      )}
    </div>
  );
};

export default MyOrders;
