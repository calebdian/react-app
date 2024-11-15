// login_process.js

document.addEventListener('DOMContentLoaded', function () {
 const loginForm = document.querySelector('form[action="/login"]');

 // Event listener for form submission
 loginForm.addEventListener('submit', function (event) {
     event.preventDefault(); // Prevent default form submission

     // Collect form data
     const email = document.querySelector('input[name="email"]').value;
     const password = document.querySelector('input[name="password"]').value;

     // Basic validation
     if (!email || !password) {
         alert('Please enter both email and password.');
         return;
     }

     // Send data to the backend for validation
     fetch('/login', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password })
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             alert('Login successful!');
             window.location.href = '/home'; // Redirect to home page
         } else {
             alert('Login failed: ' + data.message);
         }
     })
     .catch(error => {
         console.error('Error:', error);
         alert('An error occurred during login.');
     });
 });
});
