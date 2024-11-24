var board = null;
var game = new Chess();

// Initialize the game and board
function init() {
  var config = {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: false,  // No extra pieces
    position: 'start',   // Ensure it's the starting position
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
  if (game.game_over()) return false;

  // Prevent the user from dragging the opponent's pieces
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
}

// Event handler when a piece is dropped
function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q',  // You might want to dynamically handle this promotion piece
  });

  // If move is illegal, snap the piece back
  if (move === null) return 'snapback';

  updateMoveHistory(move);
  updateStatus();
}

// Update the board position after each move
function onSnapEnd() {
  board.position(game.fen());
}

// Update the game status (check, checkmate, whose turn, etc.)
function updateStatus() {
  var status = '';
  var moveColor = game.turn() === 'w' ? 'White' : 'Black';

  // Checkmate or Draw
  if (game.in_checkmate()) {
    status = `Game over, ${moveColor} is in checkmate.`;
    $('#game-over-modal').show();
    $('#game-over-message').text(`${moveColor} has lost the game.`);
  } else if (game.in_draw()) {
    status = 'Game over, drawn position.';
    $('#game-over-modal').show();
    $('#game-over-message').text('The game is a draw.');
  } else {
    status = `${moveColor} to move`;
    if (game.in_check()) {
      status += `, ${moveColor} is in check.`;
    }
  }

  $('#status').html(status);
  $('#fen').html(game.fen());
  $('#pgn').html(game.pgn());
  renderMoveHistory();
}

// Render the move history
function renderMoveHistory() {
  var history = game.history();
  $('#moveHistory').empty();
  history.forEach(function(move) {
    $('#moveHistory').append(`<li>${move}</li>`);
  });
  $('#moveHistory').scrollTop($('#moveHistory')[0].scrollHeight);
}

// Update move history
function updateMoveHistory(move) {
  var history = game.history();
  $('#moveHistory').empty();
  history.forEach(function(move) {
    $('#moveHistory').append(`<li>${move}</li>`);
  });
  $('#moveHistory').scrollTop($('#moveHistory')[0].scrollHeight);
}

// Reset the game (new game)
$('#resetBtn').click(function() {
  game.reset();
  board.position(game.fen());
  updateMoveHistory();
  updateStatus();
});

// Undo the last move
$('#undoBtn').click(function() {
  var move = game.history().pop();
  if (!move) {
    alert("No move to undo!");
    return;
  }
  game.undo();
  board.position(game.fen());
  updateMoveHistory();
  updateStatus();
});

// Start the game when the page loads
$(document).ready(function() {
  init();
});
