import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Categories from './pages/Categories';
import MyCart from './pages/MyCart';
import Login from './pages/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </>
  );
};

export default App;
