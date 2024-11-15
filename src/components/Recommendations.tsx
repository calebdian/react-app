import React, {useEffect, useState} from 'react';
import '../styles.css'; // Optional external CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      // Specify the backend URL including the port number
      const response = await axios.get(`http://localhost:5000/recommendations?category=${selectedCategory}`);
      setFilteredRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [selectedCategory]);
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

      <div>
      <h2>Product and Sales Recommendations</h2>
      
      {/* Dropdown for selecting recommendation category */}
      <label>
        Select Category:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>
      </label>

      {/* Display recommendations */}
      <div>
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((rec, index) => (
            <div key={index} className="recommendation-section">
              <h3 className="recommendation-title">{rec.title}</h3>
              <p>{rec.content}</p>
            </div>
          ))
        ) : (
          <p>No recommendations available for this category.</p>
        )}
      </div>
    </div>
      {/* Recommendation Sections */}
      <div className="recommendation-section">
        <h3 className="recommendation-title">Trending Products</h3>
        <p>
          Based on recent sales data, <span className="highlight">Fruits</span> and 
          <span className="highlight"> Vegetables</span> have shown an upward trend. 
          Consider focusing on these categories with targeted promotions during peak 
          seasons to maximize revenue.
        </p>
      </div>

      <div className="recommendation-section">
        <h3 className="recommendation-title">Pricing Strategy</h3>
        <p>
          Implement dynamic pricing for high-demand products like 
          <span className="highlight"> Oranges</span> and <span className="highlight">Bananas</span>. 
          Adjust prices during peak demand periods while offering discounts during off-peak 
          times to boost sales.
        </p>
      </div>

      <div className="recommendation-section">
        <h3 className="recommendation-title">Seasonal Promotions</h3>
        <p>
          Consider offering seasonal discounts for <span className="highlight">Fruits</span> and 
          <span className="highlight"> Vegetables</span> products. Holidays and special events 
          are ideal times for bundled offers and discounts, which can attract more customers.
        </p>
      </div>

      <div className="recommendation-section">
        <h3 className="recommendation-title">Inventory Management</h3>
        <p>
          To prevent stockouts, keep adequate inventory for fast-moving items. Monitor products 
          like <span className="highlight">Tomatoes</span> and <span className="highlight"></span> 
          closely, as they tend to sell out quickly. Adjust your restocking frequency based on 
          sales data.
        </p>
      </div>

      <div className="recommendation-section">
        <h3 className="recommendation-title">Marketing Campaigns</h3>
        <p>
          Leverage digital marketing strategies, including social media and email marketing, 
          to reach a wider audience. Highlight fresh and seasonal products to engage customers 
          effectively.
        </p>
      </div>

      <div className="recommendation-section">
        <h3 className="recommendation-title">Customer Loyalty Programs</h3>
        <p>
          Introduce loyalty rewards for repeat customers, particularly in categories like 
          <span className="highlight"> Fruits</span> and <span className="highlight">Vegetables</span>. 
          Reward points, discounts, and special offers can boost customer retention and increase sales.
        </p>
      </div>
    </div>
  );
};

export default Recommendations;
