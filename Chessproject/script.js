var board = null;
var game = new Chess();
var whiteTime = 300; // 5 minutes in seconds
var blackTime = 300; // 5 minutes in seconds
var whiteTimerInterval = null;
var blackTimerInterval = null;
var isWhiteTurn = true;

function init() {
    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
    };

    board = Chessboard('myBoard', config);
    updateStatus();
    resetTimer(); // Initialize the timer
}

function onDragStart(source, piece) {
    if (game.game_over()) return false;

    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';

    updateMoveHistory();
    updateStatus();
    startTimer(); // Start timer after a valid move
}

function onSnapEnd() {
    board.position(game.fen());
}

function updateStatus() {
    const moveColor = game.turn() === 'w' ? 'White' : 'Black';
    const status = game.in_checkmate()
        ? `Checkmate! ${moveColor} loses.`
        : game.in_draw()
        ? 'Draw!'
        : `${moveColor} to move`;
    $('#status').text(status);
}

function updateMoveHistory() {
    const history = game.history();
    const tableBody = document.querySelector('#moveHistoryTable tbody');
    tableBody.innerHTML = '';

    for (let i = 0; i < history.length; i += 2) {
        const moveNumber = Math.floor(i / 2) + 1;
        const whiteMove = history[i] || '';
        const blackMove = history[i + 1] || '';
        const row = `<tr>
                        <td>${moveNumber}</td>
                        <td>${whiteMove}</td>
                        <td>${blackMove}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}

$('#resetBtn').click(() => {
    game.reset();
    board.position('start');
    updateMoveHistory();
    updateStatus();
    resetTimer(); // Reset the timer when the game is reset
    isWhiteTurn = true; // White starts
});

// Timer Functions
function startTimer() {
    // Stop the existing timer
    if (whiteTimerInterval !== null) clearInterval(whiteTimerInterval);
    if (blackTimerInterval !== null) clearInterval(blackTimerInterval);

    // Start the timer for the active player
    if (isWhiteTurn) {
        whiteTimerInterval = setInterval(function() {
            whiteTime--;
            $('#white-timer').text(formatTime(whiteTime));
            if (whiteTime <= 0) {
                gameOver('Black wins, White ran out of time');
            }
        }, 1000);
    } else {
        blackTimerInterval = setInterval(function() {
            blackTime--;
            $('#black-timer').text(formatTime(blackTime));
            if (blackTime <= 0) {
                gameOver('White wins, Black ran out of time');
            }
        }, 1000);
    }

    // Toggle the player's turn
    isWhiteTurn = !isWhiteTurn;
}

function resetTimer() {
    // Stop all timers and reset the time to 5 minutes
    clearInterval(whiteTimerInterval);
    clearInterval(blackTimerInterval);
    whiteTime = 300; // 5 minutes in seconds
    blackTime = 300; // 5 minutes in seconds
    $('#white-timer').text('05:00');
    $('#black-timer').text('05:00');
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

// Game over function when a player runs out of time
function gameOver(message) {
    clearInterval(whiteTimerInterval);
    clearInterval(blackTimerInterval);
    $('#game-over-modal').show();
    $('#game-over-message').text(message);
}

// Hide the game over modal and reset the game
function resetGame() {
    $('#game-over-modal').hide();
    game.reset();
    board.position('start');
    updateMoveHistory();
    updateStatus();
    resetTimer();
    isWhiteTurn = true; // White starts first
}

// Initialize the game
init();
