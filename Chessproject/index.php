<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Game</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="lib/chessboardjs/css/chessboard-1.0.0.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <div class="sidebar">
            <div class="player-info">
                <div class="player player-white">
                    <img src="player1.png" alt="Player White" class="player-avatar" id="player1-avatar">
                    <h3 id="player1-name">Player 1</h3>
                    <p>Rating: 1500</p>
                </div>
                <div class="player player-black">
                    <img src="player2.png" alt="Player Black" class="player-avatar" id="player2-avatar">
                    <h3 id="player2-name">Player 2</h3>
                    <p>Rating: 1600</p>
                </div>
            </div>

            
            <div class="game-controls">
                <button id="resetBtn">Reset Game</button>
                <!-- <button id="undoBtn">Undo</button> -->
                <button id="resignBtn">Resign</button>
                <button id="drawBtn">Offer Draw</button>
            </div>
        </div>
        
        <div id="myBoard" class="chessboard-container"></div>
        
        <!-- <div class="game-info"> -->
            <div class="move-history">
                <div id="gameStatus" class="game-status">
                    <!-- <h4>Game Status</h4> -->
                    <p id="status">White to move</p>
                </div>
                <h4>Move History</h4>
                <table id="moveHistoryTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>White</th>
                            <th>Black</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        <!-- </div> -->
    </div>

    <div id="timer">
        <span id="white-timer">00:00</span> - <span id="black-timer">00:00</span>
    </div>

    

    <script src="./lib/chessboardjs/js/chessboard-1.0.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>