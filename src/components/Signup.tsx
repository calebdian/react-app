import React from 'react';
import '../styles.css'; // Optional external CSS file for styling
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
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

      {/* Signup Form */}
      <div className="signup-container">
        <h2>Create Your Account</h2>
        <form action="/register" method="POST">
          <input type="text" name="full_name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email Address" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="tel" name="phone" placeholder="Phone Number" required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
