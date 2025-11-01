import React, { useState } from 'react';
import axios from 'axios';
import '../css/Pages.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await axios.post('http://localhost:3001/api/auth/signup', form);
        alert('Signup successful! Please login.');
        setIsSignup(false);
      } else {
        const res = await axios.post('http://localhost:3001/api/auth/login', form);
        alert(`Login successful as ${res.data.role}`);
        localStorage.setItem('token', res.data.token);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
