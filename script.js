const gameboard = (function(){
    const board = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];

    const getBoard = () => board;

    const getPosition = function(position) {
        return board.at(position);
    }

    //TODO input validation
    const setPosition = function(position, marker) {
        board[position] = marker;
    }

    const getAvailableMoves = function(){
        return board.filter((e) => typeof e == 'number');
    }

    const displayInConsole = function() {
        console.log(` ${board[0]} | ${board[1]} | ${board[2]}`);
        console.log('------------');
        console.log(` ${board[3]} | ${board[4]} | ${board[5]}`);
        console.log('------------');
        console.log(` ${board[6]} | ${board[7]} | ${board[8]}`);
    }

    return {getPosition, setPosition, displayInConsole, getBoard, getAvailableMoves};
})()

function createPlayer(name, marker){
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

function createCPU(name, marker){
    const {getName, getMarker} = createPlayer(name, marker);

    const generateMove = () => {
        return Math.floor(Math.random() * gameboard.getAvailableMoves().length);
    }

    return {getName, getMarker, generateMove};
}

const human = createPlayer('Player1', 'X');
const computer = createCPU('cpu', 'O');

const game = (function(){
    let turnCounter = 0;

    //TODO convert from console to DOM
    const playRound = function(){
        gameboard.displayInConsole();
        const playerChoice = prompt('Choose your play (0-9): ');

        //TODO validate legal move
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
                return true;
            }
            else {
                return false;
            }
        }
    }

    return {playRound, checkWinner};
})()