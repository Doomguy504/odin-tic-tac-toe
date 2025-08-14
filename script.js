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
        return Math.floor(Math.random() * gameboard.getAvailableMoves().length);
    }

    return {getName, getMarker, generateMove};
}

const human = createPlayer('Player1', 'X');
const computer = createCPU('cpu', 'O');

const game = (function(){
    const turnCounter = 0;
    //TODO convert from console to DOM
    const playRound = function(){
        gameboard.displayInConsole();
        const playerChoice = prompt('Choose your play (0-9): ');

        //TODO validate legal move
        gameboard.setPosition(playerChoice, human.getMarker());

        //TODO check for winner

        gameboard.setPosition(computer.generateMove(), computer.getMarker());

        gameboard.displayInConsole();
        
        turnCounter++;
    }

    const checkWinner = function(){

    }

    return {playRound};
})()