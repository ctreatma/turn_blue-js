var clicks;
var level;

function initializeBoard() {
    var squares = document.getElementById('board').getElementsByTagName('input');
    var clicked = [];
    var target;

    document.getElementById('board').style.display = 'none';
    clicks = 0; // Reset click counter

    // Click random squares to set up the board for play
    while (clicked.length < level) {
        target = Math.floor(Math.random()*(squares.length));
        for (var i = 0; i < clicked.length; ++i) {
	    if (clicked[i] === target) target = -1;
	}
	if (target >= 0) {
	    squares[target].click();
            clicked.push(target);
	}
    }
    i = 1000;
    clicks = 0; // Reset click counter again after initializing board

    document.getElementById('clickCounter').innerHTML = clicks;
    document.getElementById('currentLevel').innerHTML = level;
    document.getElementById('board').style.display = '';
}

function clickSquare(square) {
    var boardSize = 8;
    var idx;
    var squares = document.getElementById('board').getElementsByTagName('input');
    // Check all squares to see if the level is completed
    for (var i = 0; i < squares.length; ++i) {
	if (squares[i] === square) idx = i;
    }
    // Change the color of the clicked square
    changeSquareColor(idx);
    // Click the squares above and below
    if (idx >= boardSize)
	changeSquareColor(idx-boardSize);
    if (idx < (boardSize * (boardSize - 1)))
	changeSquareColor(idx+boardSize);
    // If the clicked square is not on the left
    // edge, click the square to the left
    if (idx % boardSize > 0)
	changeSquareColor(idx-1);
    // If the clicked square is not on the right
    // edge, click the square to the right
    if (idx % boardSize < boardSize - 1)
	changeSquareColor(idx+1);

    clicks++;
    document.getElementById('clickCounter').innerHTML = clicks;

    if (clicks >= level + 5) {
	alert("You lost the game.  Try again!");
        disableBoard();
    }
    else if (checkBoard()) {
	if (level < 32) {
            level++;
	    alert("Congratulations!  You've reached level " + level + "!");
	    initializeBoard();
	}
	else {
	    alert("Congratulations! You've beaten the game!");
	    disableBoard();
	}
    }
}

function changeSquareColor(idx) {
    var square = document.getElementById('board').getElementsByTagName('input')[idx];
    var color = (square.style.backgroundColor === 'blue') ? 'red' : 'blue';
    square.style.backgroundColor = color;
}

function checkBoard() {
    var squares = document.getElementById('board').getElementsByTagName('input');
    // Check all squares to see if the level is completed
    for (var i = 0; i < squares.length; ++i) {
	if (squares[i].style.backgroundColor !== 'blue')
	    return false;
    }
    return true;
}

function disableBoard() {
    var squares = document.getElementById('board').getElementsByTagName('input');
    // Check all squares to see if the level is completed
    for (var i = 0; i < squares.length; ++i) {
	squares[i].onclick = '';
    }
    return true;
}

function startNewGame() {
    var squares = document.getElementById('board').getElementsByTagName('input');
    level = 1;
    document.getElementById('boardLoading').innerHTML = 'Loading Level...';
    document.getElementById('board').style.display = 'none';
    for (var i = 0; i < squares.length; ++i) {
	var test = squares[i];
	squares[i].style.backgroundColor = 'blue';
	squares[i].onclick = function() {
	    clickSquare(this);
	};
    }
    initializeBoard();
}