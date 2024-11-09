var board = null;
var game = new Chess();
var $status = $('#status');
var $fen = $('#fen');
var $pgn = $('#pgn');
var $moveHistory = $('#moveHistory'); // Container for move history
var $gameStatus = $('#gameStatus'); // Container for game status
var whiteTime = 300;  // 5 minutes for White
var blackTime = 300;  // 5 minutes for Black
var whiteTimer, blackTimer;

// Initialize the game and board
function init() {
  var config = {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
  };

  board = ChessBoard('myBoard', config);
  updateStatus();
  startTimer();
}

// Event handler when the user starts dragging a piece
function onDragStart(source, piece, position, orientation) {
  // Do not allow moving pieces when the game is over
  if (game.game_over()) return false;

  // Prevent picking up pieces from the wrong side
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
}

// Event handler when a piece is dropped
function onDrop(source, target) {
  // Try making the move
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q', // Always promote to a queen for simplicity
  });

  // If the move is illegal, return the piece to its original position
  if (move === null) return 'snapback';

  updateMoveHistory(move);
  updateStatus();
}

// Update the board position after each move or special move (castling, en passant, pawn promotion)
function onSnapEnd() {
  board.position(game.fen());
}

// Update the game status (check, checkmate, whose turn, etc.)
function updateStatus() {
  var status = '';
  var moveColor = game.turn() === 'w' ? 'White' : 'Black';

  // Checkmate?
  if (game.in_checkmate()) {
    status = `Game over, ${moveColor} is in checkmate.`;
    $('#game-over-modal').show();
    $('#game-over-message').text(`${moveColor} has lost the game.`);
  }
  // Draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position.';
    $('#game-over-modal').show();
    $('#game-over-message').text('The game is a draw.');
  }
  // Game still on
  else {
    status = `${moveColor} to move`;

    // Check?
    if (game.in_check()) {
      status += `, ${moveColor} is in check.`;
    }
  }

  // Update status, FEN, and PGN in the UI
  $status.html(status);
  $fen.html(game.fen());
  $pgn.html(game.pgn());
  renderMoveHistory();
}

// Render the move history in the UI
function renderMoveHistory() {
  var history = game.history();
  $moveHistory.empty();
  history.forEach(function(move) {
    $moveHistory.append(`<li>${move}</li>`);
  });
  $moveHistory.scrollTop($moveHistory[0].scrollHeight); // Scroll to the latest move
}

// Update the move history and refresh the status
function updateMoveHistory(move) {
  var history = game.history();
  $moveHistory.empty();
  history.forEach(function(move) {
    $moveHistory.append(`<li>${move}</li>`);
  });
  $moveHistory.scrollTop($moveHistory[0].scrollHeight);
}

// Reset the game (new game)
$('#resetBtn').click(function() {
  if (game.game_over()) {
    alert("The game is over. Resetting the game.");
  }
  game.reset();
  board.position(game.fen());
  updateMoveHistory();
  updateStatus();
});

// Undo the last move
$('#undoBtn').click(function() {
  var move = game.history().pop(); // Undo the last move
  if (!move) {
    alert("No move to undo!");
    return;
  }
  game.undo();
  board.position(game.fen());
  updateMoveHistory();
  updateStatus();
});

// Offer a draw
$('#drawBtn').click(function() {
  if (game.game_over()) {
    alert("The game is already over!");
    return;
  }
  alert("Draw offered!");
  // Logic to handle draw offer can be added here (e.g., sending request to opponent)
});

// Resign the game
$('#resignBtn').click(function() {
  if (game.game_over()) {
    alert("The game is already over!");
    return;
  }
  const resigningPlayer = game.turn() === 'w' ? 'White' : 'Black';
  alert(`${resigningPlayer} has resigned!`);
  game.game_over(); // End the game
  updateStatus();
});

// Player Info Update
$('#updateInfoBtn').click(function() {
  var player1Name = $('#player1-name-input').val();
  var player2Name = $('#player2-name-input').val();
  var player1Avatar = $('#player1-avatar-input')[0].files[0];
  var player2Avatar = $('#player2-avatar-input')[0].files[0];

  if (player1Name) $('#player1-name').text(player1Name);
  if (player2Name) $('#player2-name').text(player2Name);

  if (player1Avatar) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#player1-avatar').attr('src', e.target.result);
    };
    reader.readAsDataURL(player1Avatar);
  }

  if (player2Avatar) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#player2-avatar').attr('src', e.target.result);
    };
    reader.readAsDataURL(player2Avatar);
  }
});

// Timer logic
function startTimer() {
  whiteTimer = setInterval(function() {
    if (whiteTime > 0 && game.turn() === 'w') {
      whiteTime--;
      $('#white-timer').text(formatTime(whiteTime));
    }
  }, 1000);

  blackTimer = setInterval(function() {
    if (blackTime > 0 && game.turn() === 'b') {
      blackTime--;
      $('#black-timer').text(formatTime(blackTime));
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

// Initialize the board and game on page load
init();
