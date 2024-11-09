document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (username === "" || password === "") {
        document.getElementById("errorMessage").textContent = "Both fields are required!";
    } else {
        // Simulate a successful login
        document.getElementById("errorMessage").textContent = "";
        alert("Login successful!");
        // Here you could redirect the user to another page, for example:
        // window.location.href = "dashboard.html";
    }
});
