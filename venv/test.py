from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the saved model
with open('classifier.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_data = data['input']
    
    # Make prediction
    prediction = model.predict([input_data])
    
    return jsonify({"prediction": prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
