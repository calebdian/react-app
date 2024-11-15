import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {Chart, ChartType} from 'chart.js/auto';
import '../styles.css'; // Optional external CSS file

const Dashboard: React.FC = () => {
  const salesChartRef = useRef<Chart | null>(null);
  const categoryChartRef = useRef<Chart | null>(null);

  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState<string[]>([]); // List of products based on category

  const fetchProducts = async (category: string) => {
    try {
      const response = await fetch('http://localhost:5000/get_products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category })
      });
      const data = await response.json();
      setProducts(data.products); // Set the fetched products for the selected category
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  const fetchAndPlotProductSales = async (category: string, productName: string) => {
    try {
      const response = await fetch('http://localhost:5000/filter_product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category, product_name: productName })
      });
      const data = await response.json();
  
      console.log('Fetched data:', data);  // Log the data to check the response
  
      if (!data.historical_sales || !data.forecast_sales) {
        console.error('Invalid data structure received');
        return;
      }
  
      const labels = Object.keys(data.historical_sales);
      const historicalSales = Object.values(data.historical_sales);
      const forecastSales = data.forecast_sales;
  
      // Destroy the existing chart instance if it exists
      if (salesChartRef.current) {
        salesChartRef.current.destroy();
      }
  
      const salesCanvas = document.getElementById('salesChart') as HTMLCanvasElement;
      if (salesCanvas) {
        const ctx = salesCanvas.getContext('2d');
        if (ctx) {
          salesChartRef.current = new Chart(ctx, {
            type: 'line' as ChartType,
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Historical Sales',
                  data: historicalSales,
                  borderColor: 'blue',
                  fill: false
                },
                {
                  label: 'Forecast Sales',
                  data: forecastSales,
                  borderColor: 'red',
                  borderDash: [5, 5],
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `${productName} Sales Forecast`
                }
              },
              scales: {
                x: { title: { display: true, text: 'Month' } },
                y: { title: { display: true, text: 'Total Revenue' } }
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch product sales:', error);
    }
  };

  // Handle category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    fetchProducts(selectedCategory);  // Fetch products for the selected category
  };

  // Handle product selection change
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductName(e.target.value);  // Update selected product
  };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      fetchAndPlotProductSales(category, productName);
    };

    
  useEffect(() => {
    // Destroy any existing charts to avoid reusing the canvas
    if (salesChartRef.current) {
      salesChartRef.current.destroy();
    }
    if (categoryChartRef.current) {
      categoryChartRef.current.destroy();
    }

    // Initialize Sales by Category Chart
    const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (categoryCanvas) {
      const categoryCtx = categoryCanvas.getContext('2d');
      if (categoryCtx) {
        categoryChartRef.current = new Chart(categoryCtx, {
          type: 'pie' as ChartType,
          data: {
            labels: ['Fruits', 'Vegetables', 'Dairy', 'Livestock'],
            datasets: [{
              label: 'Sales by Category',
              data: [40, 30, 15, 15],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'bottom' },
            },
          },
        });
      }
    }

    // Example call to fetch and plot data for a specific product
    fetchAndPlotProductSales('fruits', 'oranges');

  }, []);

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

      {/* Dashboard Content */}
      <div className="container">
        <h2>Sales Marketing Dashboard</h2>

        {/* Dashboard Cards */}
        <div className="dashboard">
          <div className="card">
            <h3>Total Sales</h3>
            <p>$1,200,000</p>
          </div>
          <div className="card">
            <h3>Top Product</h3>
            <p>Oranges</p>
          </div>
          <div className="card">
            <h3>Monthly Growth</h3>
            <p>12%</p>
          </div>
          <div className="card">
            <h3>New Customers</h3>
            <p>320</p>
          </div>
        </div>
  
        <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={category}
            onChange={handleCategoryChange} // Update category and fetch products
          >
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="livestock">Livestock</option>
          </select>
        </label>

        <label>
          Product Name:
      
          <select
            value={productName}
            onChange={handleProductChange} // Update product selection
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <option key={index} value={product}>{product}</option>
              ))
            ) : (
              <option value="">Select a category first</option> // Show this message if no products are available
            )}
          </select>
        </label>

        <button type="submit">Fetch Sales Data</button>
      </form>
        
        
        {/* Sales Trend Chart */}
        <div className="chart-container">
          <h3>Sales Trend Over the Last Year</h3>
          <canvas id="salesChart"></canvas>
        </div>

        {/* Sales by Category Chart */}
        <div className="chart-container">
          <h3>Sales Distribution by Category</h3>
          <canvas id="categoryChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
