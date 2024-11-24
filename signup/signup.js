document.getElementById("signupForm").addEventListener("submit", function(event) {
   // event.preventDefault();

    // Get the input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        document.getElementById("errorMessage").textContent = "All fields are required!";
    } else if (password !== confirmPassword) {
        document.getElementById("errorMessage").textContent = "Passwords do not match!";
    } else {
        // Simulate a successful signup
        document.getElementById("errorMessage").textContent = "";
        alert("Signup successful!");
        // Redirect to the welcome page (or any other page)
        window.location.href = "welcome.html";
    }
});
