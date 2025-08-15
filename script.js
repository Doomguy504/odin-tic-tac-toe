const gameboard = (function(){
    const gameContainer = document.querySelector('.game-container');
    const board = [];
 
    for (let i = 0; i < 9; i++ ){
        const cell = document.createElement('div');

        cell.setAttribute('class', 'cell');
        gameContainer.appendChild(cell);
        
        board[i] = cell;
    }

    const getBoard = () => board;

    const getPosition = function(position) {
        return board.at(position);
    }

    const setPosition = function(position, marker) {
        board[position] = marker;
    }

    const getAvailableMoves = function(){
        return board.filter((e) => typeof e == 'number');
    }

    const displayInConsole = function() {
        console.clear();
        console.log(` ${board[0]} | ${board[1]} | ${board[2]}`);
        console.log('------------');
        console.log(` ${board[3]} | ${board[4]} | ${board[5]}`);
        console.log('------------');
        console.log(` ${board[6]} | ${board[7]} | ${board[8]}`);
    }

    const resetBoard = function(){
        for (let i=0; i < 9; i++){
            board[i] = i;
        }
    }

    return {getPosition, setPosition, displayInConsole, getBoard, getAvailableMoves, resetBoard};
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
    let turnCounter = 1;

    //TODO convert from console to DOM
    const playRound = function(){
        gameboard.displayInConsole();

        let playerChoice = prompt('Choose your play (0-9): ');

        while (!gameboard.getAvailableMoves().includes(Number.parseInt(playerChoice))){
            playerChoice = prompt('Invalid move.\nChoose your play (0-9): ');
        }
        
        gameboard.setPosition(playerChoice, human.getMarker());

        if (checkWinner()){
            return;
        }

        gameboard.setPosition(computer.generateMove(), computer.getMarker());

        if (checkWinner()){
            return;
        }

        gameboard.displayInConsole();

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
            if ( typeof gameboard.getPosition(a) != 'number' && gameboard.getPosition(a) == gameboard.getPosition(b) && gameboard.getPosition(a) == gameboard.getPosition(c)){
                //TODO change to DOM
                gameboard.displayInConsole();
                console.log(`${gameboard.getPosition(a)} wins!`);
                gameboard.resetBoard();
                turnCounter = 1;
                return true;
            }
        }

        if (gameboard.getAvailableMoves().length == 0){
            gameboard.displayInConsole();
            console.log("It's a draw!");
            gameboard.resetBoard();
            turnCounter = 1;
            return true;
        }

        return false;
    }

    return {playRound, checkWinner};
})()