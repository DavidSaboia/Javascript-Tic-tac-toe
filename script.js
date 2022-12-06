// INITIAL DATA
let board = {

    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''

};

let player = '';
let warning = '';
let playing = false;

// Cleaning evering at the begining. 
reset();

// EVENTS

// Button event.
document.querySelector('.reset').addEventListener('click', reset);

// Clicking the empty space.
document.querySelectorAll('.item').forEach(item => {

    item. addEventListener('click', itemClick);

});

// FUNCTIONS
function itemClick(event) {

    let item = event.target.getAttribute('data-item');

    if(playing && board[item] === '') {

        board[item] = player;
        renderBoard();
        togglePlayer();

    }

}

function reset() {

    // Clearing warnings.
    warning = '';

    // Chosing new player.
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    // Clearing the board.
    for(let i in board) {

        board[i] = '';

    }

    playing = true;

    renderBoard();
    renderInfo();

}

// Looking if each element of the board is empty or not.
function renderBoard() {

    for(let i in board) {

        let item = document.querySelector(`div[data-item=${i}]`);

        item.innerHTML = board[i];

    }

    checkGame();

}

function renderInfo() {

    document.querySelector('.turn').innerHTML = player;
    document.querySelector('.result').innerHTML = warning;

}

// Change the player.
function togglePlayer() {

    player = (player === 'x') ? 'o' : 'x';
    renderInfo();

}

// Check if it has a winner.
function checkGame() {

    if(checkWinnerFor('x')) {

        warning = 'The "X" won.';
        playing = false;

    } else if(checkWinnerFor('o')) {

        warning = 'The "O" won.';
        playing = false;

    } else if(isFull()) {

        warning = 'The game tied.';
        playing = false;

    }

}

function checkWinnerFor(player) {

    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {

        let pArray = pos[w].split(','); // Ex.: a1, a2, a3.

        let hasWon = pArray.every(option=>board[option] === player);

        if(hasWon) {

            return true;

        }

    }

    return false;

}

function isFull() {

    for(let i in board) {

        if(board[i] === ''){

            return false;

        }

    }

    return true;

}