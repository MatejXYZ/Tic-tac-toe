function playerMaker(name, symbol) {
    let player = {name, symbol};
    return player;
}

const player1 = playerMaker('Matej', 'X');
const player2 = playerMaker('Jakie', 'O');

const gameFlow = (function () {
    let field = [];
    let currentPlayer = player1;
    let versus = ['human'];
    
    function robotSwitch() {
        versus[0] = 'AI';
    }

    function render() {
        for (let i = 0; i < 9; i++) {
            squares[i].textContent = field[i];
        }
    }
    function draw(position, player) {
        field[position] = player.symbol;
    }
    const winningArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const checkWinner = symbol => winningArray.some(triplet => triplet.every(number => field[number] === symbol));
    const checkDraw = () => field.filter(realItem => realItem).length === 9;
    function play(position, player) {
        draw(position, player);
        render();
        if (checkWinner('X')) return 'X';
        if (checkWinner('O')) return 'O';
        if (checkDraw()) return 'draw';
    }
    function makeMove(position) {
        let result = play(position, currentPlayer);
        if (result) return result;
        if (versus[0] === 'AI') {
            function findRandomMove() {
                let num = Math.floor(9 * Math.random());
                if (field[num]) return findRandomMove();
                return num;
            }
            return play(findRandomMove(), player2);
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    return {
        makeMove,
        robotSwitch,
        currentPlayer
    }
})();

//

const squares = document.querySelectorAll('.square');

//

const test1 = () => {
    gameFlow.play(0, player2)
    gameFlow.play(1, player2)
    gameFlow.play(2, player2)
}
const test2 = () => {
    gameFlow.play(0, player1);
    gameFlow.play(1, player2);
    gameFlow.play(2, player1);
    gameFlow.play(3, player2);
    gameFlow.play(4, player1);
    gameFlow.play(6, player2);
    gameFlow.play(5, player1);
    gameFlow.play(8, player2);
    gameFlow.play(7, player1);
}
const test3 = () => {
    gameFlow.play(0,player1)
    gameFlow.play(1,player2)
    gameFlow.play(2,player1)
    gameFlow.play(3,player2)
    gameFlow.play(4,player1)
    gameFlow.play(5,player2)
    gameFlow.play(6,player1)
}