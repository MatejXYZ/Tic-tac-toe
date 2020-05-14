//const gameboard = (function () {
//    let field = [];
//    return {
//       field,
//    } 
//})();

const gameFlow = (function () {
    function render() {
        tempField.textContent = field;
    }
    function draw(position, player) {
        field[position] = player.symbol;
    }
    function play(position, player) {
        draw(position, player);
        render();
        if (condition) {
            let result = condition();
            if (result = 'draw') {
                draw();
            } else {
                congratulatePlayer(firstOrSecond)
            }
        }
    }
    let field = [];
    let hello = 'hi';
    return {
        draw,
    }
})();

function playerMaker(name, symbol) {
    let player = {name, symbol};
    return player;
}

//

let tempField = document.querySelector('div');

const player1 = playerMaker('Matej', 'X');
const player2 = playerMaker('Jakie', 'O');