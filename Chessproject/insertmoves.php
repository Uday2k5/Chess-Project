<?php
include('./connection.php');

function insertOrUpdateMoveHistory($game_id, $move_number, $white_move, $black_move) {
    global $conn;

    // Sanitize inputs to prevent SQL injection
    $game_id = (int)$game_id;  // Ensure game_id is an integer
    $move_number = (int)$move_number;  // Ensure move_number is an integer
    $white_move = $conn->real_escape_string($white_move);  // Escape special characters for SQL
    $black_move = $conn->real_escape_string($black_move);  // Escape special characters for SQL

    // Check if a row with the given game_id and move_number exists
    $stmt = $conn->prepare("SELECT id FROM game_moves WHERE game_id = ? AND move_number = ?");
    $stmt->bind_param("ii", $game_id, $move_number);
    $stmt->execute();
    $stmt->store_result();

    // If a row exists, update the black_move for the same move_number
    if ($stmt->num_rows > 0) {
        // Prepare an UPDATE statement to update the existing row
        $update_stmt = $conn->prepare("UPDATE game_moves SET black_move = ? WHERE game_id = ? AND move_number = ?");
        $update_stmt->bind_param("sii", $black_move, $game_id, $move_number);

        // Execute the update
        if ($update_stmt->execute()) {
            echo "Move history updated successfully!";
        } else {
            echo "Error updating move history: " . $update_stmt->error;
        }
        $update_stmt->close();
    } else {
        // If no row exists, insert both white and black moves
        $insert_stmt = $conn->prepare("INSERT INTO game_moves (game_id, move_number, white_move, black_move) VALUES (?, ?, ?, ?)");
        $insert_stmt->bind_param("iiss", $game_id, $move_number, $white_move, $black_move);

        // Execute the insert
        if ($insert_stmt->execute()) {
            echo "Move history saved successfully!";
        } else {
            echo "Error saving move history: " . $insert_stmt->error;
        }
        $insert_stmt->close();
    }

    $stmt->close();
}

// Ensure the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the required data is passed via POST
    if (isset($_POST['game_id'], $_POST['move_number'], $_POST['white_move'], $_POST['black_move'])) {
        $game_id = $_POST['game_id'];
        $move_number = $_POST['move_number'];
        $white_move = $_POST['white_move'];
        $black_move = $_POST['black_move'];

        // Insert or update the move into the database
        insertOrUpdateMoveHistory($game_id, $move_number, $white_move, $black_move);
    } else {
        echo "Error: Missing parameters!";
    }
} else {
    echo "Error: Invalid request method!";
}
// Close the connection
$conn->close();
?>