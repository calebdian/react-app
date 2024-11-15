
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import json


# 1. Create an instance of the Flask class
app = Flask(__name__)
cors = CORS(app, origins='*')
# 2. Define a prediction function
def return_predictions(model, input_json):
    input_data = [[input_json[k] for k in input_json.keys()]]
    prediction = model.predict(input_data)[0] 
    return prediction

# 3. Load the pre-trained model
with open('../classifier1.pkl', 'rb') as file:
    model = pickle.load(file)

# 4. Set up the home page route
@app.route('/')
def index():
    return render_template('index.html')

# 5. Define a route that accepts POST requests for predictions
@app.route('/predict', methods=['POST'])
def price_prediction():
    content = request.get_json()  # Get the data from the POST request
    input_data = content['input']  # Extract the input data

    # Make a prediction using the loaded modl
    prediction = model.predict([input_data])[0]
    return jsonify({'prediction': prediction})  # Return the prediction as a JSON response
# 6. Allow running Flas
# k using `$ python script.py`

# Assuming `filtered_data` is loaded


filtered_data = pd.read_csv('../AgricultureData.csv', parse_dates=['sale_date'])

@app.route('/filter_product', methods=['POST'])
def filter_product():
    data = request.get_json()
    category = data.get('category').lower()
    product_name = data.get('product_name').lower()
    
    # Filter based on category and product_name
    product_data = filtered_data[
        (filtered_data['category'].str.lower() == category) &
        (filtered_data['product_name'].str.lower() == product_name) &
        (filtered_data['price_per_kg']) &
        (filtered_data['units_sold_kg']) 
    ]
    product_data['total_revenue'] = product_data['price_per_kg'] * product_data['units_sold_kg']

    # Monthly aggregation of sales
    monthly_sales = product_data.groupby(product_data['sale_date'].dt.to_period('M'))['total_revenue'].sum()
    
    # Convert PeriodIndex to string for JSON serialization
    monthly_sales.index = monthly_sales.index.astype(str)

    # Fit ARIMA model and forecast
    model = ARIMA(monthly_sales, order=(5, 1, 0)).fit()
    forecast = model.forecast(steps=3)

    # Prepare data for JSON response
    response = {
        "historical_sales": monthly_sales.to_dict(),
        "forecast_sales": forecast.to_list()
    }

    return jsonify(response)



@app.route('/get_products', methods=['POST'])
def get_products():
    data = request.get_json()
    category = data.get('category').lower()

    # Filter the data based on the category
    products = filtered_data[filtered_data['category'].str.lower() == category]['product_name'].unique().tolist()

    return jsonify({'products': products})


# # New route to fetch products by category
# @app.route('/products', methods=['GET'])
# def get_producto():
#     category = request.args.get('category', 'all')
    
#     if category == 'all':
#         products = filtered_data[['product_name', 'category']].to_dict(orient='records')
#     else:
#         products = filtered_data[filtered_data['category'] == category][['product_name']].to_dict(orient='records')
    
#     return jsonify({"products": products})




# data = {
#     'category': ['fruits', 'fruits', 'vegetables', 'vegetables'],
#     'product_name': ['Apple', 'Banana', 'Tomato', 'Cucumber'],
#     'sale_date': pd.date_range(start='2023-01-01', periods=4, freq='M'),
#     'price_per_kg': [10, 12, 8, 15],
#     'units_sold_kg': [100, 150, 120, 200]
# }
# Read data and handle missing values
category_recommendations = {
    'fruits': [
        {"title": "Top Trending Fruits", "content": "Try seasonal fruits like mangoes, oranges, and apples. They are high in demand."},
        {"title": "New Arrival: Avocados", "content": "Avocados are in high demand this season, perfect for salads and smoothies."},
        {"title": "Discount on Bananas", "content": "Bananas are on sale! Get your stock at a reduced price this week."}
    ],
    'vegetables': [
        {"title": "Fresh Leafy Greens", "content": "Spinach, kale, and lettuce are fresh and healthy options to add to your meals."},
        {"title": "Seasonal Carrots", "content": "Carrots are in peak season and perfect for soups and snacks."},
        {"title": "Onion Sale", "content": "We are offering discounts on onions. Stock up for your kitchens now."}
    ],
    'all': [
        {"title": "Seasonal Discounts", "content": "Get amazing discounts on various categories, from fruits to vegetables."},
        {"title": "Top Products This Month", "content": "Explore our best-selling fruits and vegetables this month."}
    ]
}

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    category = request.args.get('category', 'all')
    recommendations = []

    # Check if the selected category exists in the predefined recommendations
    if category in category_recommendations:
        recommendations = category_recommendations[category]
    else:
        recommendations = category_recommendations['all']  # Default to 'all' category

    return jsonify({"recommendations": recommendations})



if __name__ == '__main__':
    app.run(debug=True) 