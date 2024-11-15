from flask import Flask, request, jsonify
import sqlite3
import bcrypt

app = Flask(__name__)

# Function to check credentials in the database
def verify_user(email, password):
    conn = sqlite3.connect('database.db')  # Connect to your database
    cursor = conn.cursor()

    # Fetch the hashed password for the given email
    cursor.execute("SELECT password FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if user:
        hashed_password = user[0]
        # Compare the provided password with the hashed password
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            return True
    return False

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if verify_user(email, password):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"})

if __name__ == '__main__':
    app.run(debug=True)
