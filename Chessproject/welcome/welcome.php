<?php
session_start();

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
} else {
    $username = "Guest";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chessmates</title>
    <link rel="stylesheet" href="welcome.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
<header>
        <nav>
            <div class="logo">
                <a href="#">
                <img src="../img/chess.png" alt="Chessmates"  class = "logoimg"></a>
                ChessMates
            </div>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="../index.php">Play</a></li>
                <li><a href="#Learn">Learn</a></li>
                <li><a href="#Community">Community</a></li>
                <li><a href="#news">News</a></li>
            </ul>
            <div class="auth-buttons">
                <a href="logout.php" class="btn btn-logout">Log Out</a>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>
                <p>We are excited to have you on Chessmates! Ready to start playing?</p>
                <a href="../index.php" class="btn btn-playnow">Play Now</a>
            </div>
        </section>           
    </main>

    <footer>
        <p>&copy; 2024 Chessmates. All rights reserved.</p>
        <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </footer>
</body>
</html>
