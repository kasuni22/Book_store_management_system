import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Categories from './pages/Categories';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ManageCategories from './pages/admin/ManageCategories';
import ManageBooks from './pages/admin/ManageBooks';
import CategoryBooks from './pages/CategoryBooks';
import BookDetails from './pages/BookDetails';
import ManageStudents from './pages/admin/ManageStudents';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<StudentDashboard />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageCategories />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/books" element={<ManageBooks />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageStudents />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:name" element={<CategoryBooks />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>

    </>
  );
};

export default App;
