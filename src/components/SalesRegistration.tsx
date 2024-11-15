import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css'; // Optional external CSS file for styling
import axios from 'axios';


const SalesRegistration: React.FC = () => {
  const navigate = useNavigate();

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    // Collect input values with type safety
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
    const unitsAvailable = parseFloat((document.getElementById('unitsAvailable') as HTMLInputElement).value);

    // Extract the month from the date field
    const dateValue = (document.getElementById('date_reg') as HTMLInputElement).value;
    const date = new Date(dateValue);
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so we add 1

    // Collect all feature values
    const inputData = [ price, unitsAvailable, month ];

    // Send data to the backend using axios
    const response = await axios.post('http://localhost:5000/predict', { input: inputData });

    // Handle the response
    alert('Predicted Value: ' + response.data.prediction);
    navigate('/dashboard'); // Redirect to the dashboard after successful submission
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during submission.');
  }
};

  return (
    <div>
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

      {/* Registration Form */}
      <div className="registration-container">
        <h2>Register New Product</h2>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="product_name" placeholder="Product Name" required />
          <select name="category" required defaultValue="">
            <option value="" disabled>Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>
          <input type="number" name="price_per_kg" step="0.01" id="price" placeholder="Price per Kg" required />
          <input type="number" name="units_available" id="unitsAvailable" placeholder="Units Available (kg)" required />
          <input type="text" name="supplier" placeholder="Supplier Name" required />
          <input type="text" name="farm_location" placeholder="Farm Location" required />
          <input type="date" name="registration_date" id="date_reg" required />
          <button type="submit">Register Product</button>
        </form>
      </div>
    </div>
  );
};

export default SalesRegistration;
