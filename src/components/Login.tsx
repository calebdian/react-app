import React from 'react';
import '../styles.css'; // Optional external CSS file for styling
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-link">Dashboard</Link>
        <Link to="/recommendations" className="navbar-link">Recommendations</Link>
        <Link to="/sales-registration" className="navbar-link">Register Product</Link>
        <div className="right">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="login-container">
        <h2>Login to Sales Marketing</h2>
        <form action="/login" method="POST">
          <input type="email" name="email" placeholder="Email Address" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
