import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/AdminOrders.css";
import AdminNavbar from "../../components/AdminNavbar";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://book-store-management-system-server.onrender.com/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.log("Error fetching orders:", err.message);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard-container">
        <h1>🛍️ All Book Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Student Email</th>
                <th>Book Name</th>
                <th>Price (Rs.)</th>
                <th>Quantity</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userEmail}</td>
                  <td>{order.bookName || "Unknown"}</td>
                  <td>{order.bookPrice}</td>
                  <td>{order.quantity}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
