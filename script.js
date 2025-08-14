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

    const displayInConsole = function() {
        console.log('   |   |');
        console.log(` ${board[0]} | ${board[1]} | ${board[2]}`);
        console.log('------------');
        console.log(` ${board[3]} | ${board[4]} | ${board[5]}`);
        console.log('------------');
        console.log(` ${board[6]} | ${board[7]} | ${board[8]}`);
        console.log('   |   |');
    }

    return {getPosition, setPosition, displayInConsole, getBoard};
})()

function createPlayer(name, marker){
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

function createCPU(name, marker){
    const {getName, getMarker} = createPlayer(name, marker);

    const generateMove = () => {
        const availableMoves = gameboard.getBoard().filter((e) => typeof e == "number");

        return Math.floor(Math.random() * availableMoves.length);
    }

    return {getName, getMarker, generateMove};
}

const human = createPlayer('Player1', 'X');
const computer = createCPU('cpu', 'O');

const game = (function(){
    //TODO convert from console to DOM
    const playRound = function(){
        gameboard.displayInConsole();
        const playerChoice = prompt('Choose your play (0-9): ');

        //TODO validate legal move
        gameboard.setPosition(playerChoice, human.getMarker());

        //TODO check for winner

        gameboard.setPosition(computer.generateMove(), computer.getMarker());

        gameboard.displayInConsole();
    }

    return {playRound};
})()