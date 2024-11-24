document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting immediately

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

        // Submit the form via AJAX if you want to avoid reloading the page
        const formData = new FormData(document.getElementById("signupForm"));
        fetch("signup.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("errorMessage").textContent = data;
            if (data.includes("Signup successful")) {
                // Redirect to a welcome page
                window.location.href = "welcome.html";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("errorMessage").textContent = "An error occurred.";
        });
    }
});
