const gameboard = (function(){
    const board = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];

    const getPosition = function(position) {
        return board.at(position);
    }

    //TODO input validation
    const setPosition = function(position, marker) {
        board.at(position) = marker;
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

    return {getPosition, setPosition, displayInConsole};
})()

const game = (function(){
    //TODO convert from console to DOM
    const playRound = function(){
        const playerChoice = prompt('Choose your play (0-9): ');
        
    }

    return {playRound};
})()

function createPlayer(name, marker){
    const playerName = name;
    const playerMarker = marker;

    const getName = () => playerName;
    const getMarker = () => playerMarker;

    return {getName, getMarker};
}

const human = createPlayer('Player1');
const computer = createPlayer('cpu');