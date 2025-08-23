const gameboard = (function(){
    const gameContainer = document.querySelector('.game-container');
    const board = [];
 
    for (let i = 0; i < 9; i++ ){
        const cell = document.createElement('div');

        cell.addEventListener('click', (e) => {
            e.currentTarget.textContent = 'X';
            game.playRound();
        });
        cell.setAttribute('class', 'cell');
        gameContainer.appendChild(cell);
        
        board[i] = cell;
    }

    const getBoard = () => board;

    const getPositionMarker = function(position) {
        return board[position].textContent;
    }

    const setPositionMarker = function(position, marker) {
        board[position].textContent = marker;
    }

    const getAvailableMoves = function(){
        return board.map((e, i) => {
            if (e.textContent == ''){
                return i;
            }
    }).filter((e) => typeof e == 'number');
    }

    // depricated
    // const displayInConsole = function() {
    //     console.clear();
    //     console.log(` ${board[0]} | ${board[1]} | ${board[2]}`);
    //     console.log('------------');
    //     console.log(` ${board[3]} | ${board[4]} | ${board[5]}`);
    //     console.log('------------');
    //     console.log(` ${board[6]} | ${board[7]} | ${board[8]}`);
    // }

    const resetBoard = function(){
        board.forEach((e) => {
            e.textContent = '';
        });
    }

    return {getPositionMarker, setPositionMarker, getBoard, getAvailableMoves, resetBoard};
})()

function createPlayer(name, marker){
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

function createCPU(name, marker){
    const {getName, getMarker} = createPlayer(name, marker);

    const generateMove = () => {
        const availableMoves = gameboard.getAvailableMoves();
        const randIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randIndex];
    }

    return {getName, getMarker, generateMove};
}

const human = createPlayer('Player1', 'X');
const computer = createCPU('cpu', 'O');

const game = (function(){
    const winDisplay = document.querySelector('.win-display');
    let turnCounter = 1;

    const playRound = function(){
        if (checkWinner()){
            return;
        }

        gameboard.setPositionMarker(computer.generateMove(), computer.getMarker());

        if (checkWinner()){
            return;
        }

        //gameboard.displayInConsole();

        turnCounter++;
    }

    const checkWinner = function(){
        if (turnCounter < 3){
            return false;
        }

        const wins = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal
            [2, 4, 6]  // Diagonal
        ];

        for (const [a, b, c] of wins){
            if ( gameboard.getPositionMarker(a) != '' && gameboard.getPositionMarker(a) == gameboard.getPositionMarker(b) && gameboard.getPositionMarker(a) == gameboard.getPositionMarker(c)){
                displayWinner(gameboard.getPositionMarker(a));
                return true;
            }
        }

        if (gameboard.getAvailableMoves().length == 0){
            gameboard.displayInConsole();
            displayWinner('draw');
            return true;
        }

        return false;
    }

    const displayWinner = (marker) => {        
        if (marker == 'X' || marker == 'O'){
            winDisplay.textContent = `${marker} wins!`;
        }
        else if (marker == 'draw'){
            winDisplay.textContent = "It's a draw!";
        }
        else {
            winDisplay.textContent = 'Whoops, something unexpected happened!';
        }

        const body = document.querySelector('body');
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Play again';

        resetButton.addEventListener('click', (ev) => {
            gameboard.resetBoard();
            winDisplay.textContent = '';
            turnCounter = 1;
            ev.currentTarget.remove();
        });

        body.append(resetButton);
    }

    return {playRound, checkWinner};
})()