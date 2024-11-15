// signup_process.js

document.addEventListener('DOMContentLoaded', function () {
 const signupForm = document.querySelector('form[action="/register"]');

 // Event listener for form submission
 signupForm.addEventListener('submit', function (event) {
     event.preventDefault(); // Prevent the default form submission

     // Collect form data
     const fullName = document.querySelector('input[name="full_name"]').value;
     const email = document.querySelector('input[name="email"]').value;
     const password = document.querySelector('input[name="password"]').value;
     const phone = document.querySelector('input[name="phone"]').value;

     // Basic validation
     if (!fullName || !email || !password || !phone) {
         alert('Please fill in all the fields.');
         return;
     }

     // Send data to the backend using the Fetch API
     fetch('/register', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ fullName, email, password, phone })
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             alert('Signup successful!');
             window.location.href = '/login'; // Redirect to login page
         } else {
             alert('Signup failed: ' + data.message);
         }
     })
     .catch(error => {
         console.error('Error:', error);
         alert('An error occurred while signing up.');
     });
 });
});
