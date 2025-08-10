const gameboard = (function(){
    const board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    const getPosition = function(position) {
        return board.at(position);
    }

    //TODO input validation
    const setPosition = function(position, marker) {
        board.at(position) = marker;
    }

    const displayInConsole = function() {
        const displayBoard = board.map((e) => {
            if (e == null){
                return " ";
            }
            else {
                return e;
            }
        });

        console.log('   |   |');
        console.log(` ${displayBoard[0]} | ${displayBoard[1]} | ${displayBoard[2]}`);
        console.log('------------');
        console.log(` ${displayBoard[3]} | ${displayBoard[4]} | ${displayBoard[5]}`);
        console.log('------------');
        console.log(` ${displayBoard[6]} | ${displayBoard[7]} | ${displayBoard[8]}`);
        console.log('   |   |');
    }

    return {getPosition, setPosition, displayInConsole};
})()

function createPlayer(name){
    const playerName = name;

    const getName = () => playerName;

    return {getName};
}