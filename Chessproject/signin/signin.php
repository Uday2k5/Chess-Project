<?php
include('../connection.php');
if (isset($_POST['signin'])) {

    $mail = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM userinfo WHERE email = '$mail'";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);

        
        if (password_verify($password, $row['password'])) {
                session_start();
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $username;
                header("Location: ../landing/landing.php");
            exit();
        } else {
            echo '<script>
                alert("Login failed. Invalid username or password!!");
                window.location.href = "signin.php";
            </script>';
        }
    } else {
        echo '<script>
            alert("Login failed. Invalid username or password!!");
            window.location.href = "signin.php";
        </script>';
    }
}
?>