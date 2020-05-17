function playerMaker(name, symbol) {
    let player = {name, symbol};
    return player;
}
const start = document.querySelector('.start');
const versus = document.querySelector('.versus');
const gameplay = document.querySelector('.gameplay');
const fine = document.querySelector('.fine');
const message = fine.querySelector('p');
let player1;
let player2;
start.querySelector('button').addEventListener('click', () => {
    player1 = playerMaker(start.querySelector('input').value, 'X');
    gameFlow.updatePlayer();
    toggleVisibility([start, versus]);
})

versus.querySelectorAll('button')[0].addEventListener('click', () => {
    player2 = playerMaker(versus.querySelector('input').value, 'O');
    toggleVisibility([versus, gameplay]);
})
versus.querySelectorAll('button')[1].addEventListener('click', () => {
    player2 = playerMaker('AI', 'O');
    gameFlow.robotSwitch();
    toggleVisibility([versus, gameplay]);
})
gameplay.querySelector('button').addEventListener('click', () => {
    gameFlow.restart();
})
fine.querySelector('button').addEventListener('click', () => {
    gameFlow.restart();
    toggleVisibility([fine, gameplay])
})


function toggleVisibility(array) {
    array.forEach(item => item.classList.toggle('hidden'));
}

const gameFlow = (function () {
    let field = [];
    let currentPlayer;
    let versus = ['human'];
    const winningArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    
//
    function checkHuman(positions, move) {
        if ([0,1,2].some((position, index, array) => {
            return array.slice(0, index).concat(array.slice(index + 1)).every(position => gameFlow.field[position] === 'X')
        })) console.log('Got\'em.');
    }
    function counterMove() {
        if (!field[4]) return 4;
        checkSelf([1,2])
    }
//

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
    const checkWinner = symbol => winningArray.some(triplet => triplet.every(number => field[number] === symbol));
    const checkDraw = () => field.filter(realItem => realItem).length === 9;
    function play(position, player) {
        draw(position, player);
        render();
        if (checkWinner('X')) return message.textContent = player1.name + ' won!';
        if (checkWinner('O')) return message.textContent = player2.name + ' won!';
        if (checkDraw()) return message.textContent = 'It\'s a draw!'
    }
    function findRandomMove() {
        let num = Math.floor(9 * Math.random());
        if (field[num]) return findRandomMove();
        return num;
    }
    function makeMove(position) {
        if (field[position]) return;
        let result = play(position, currentPlayer);
        if (result) return toggleVisibility([gameplay, fine]);
        if (versus[0] === 'AI') {
            result = play(findRandomMove(), player2);
            if (result) return toggleVisibility([gameplay, fine]);
            return;
        }
        updatePlayer();
    }
    function updatePlayer() {currentPlayer = currentPlayer === player1 ? player2 : player1;}
    function restart() {
        field = [];
        render();
    }
    return {
        makeMove,
        robotSwitch,
        updatePlayer,
        restart,
        field
    }
})();


const squares = document.querySelectorAll('.square');
squares.forEach((item, index) => {
    item.addEventListener('click', () => {
        gameFlow.makeMove(index);
    })
})

//

function test1() {
    gameFlow.makeMove(0);
    gameFlow.makeMove(1);
    gameFlow.makeMove(2);
    gameFlow.makeMove(4);
    gameFlow.makeMove(3);
    gameFlow.makeMove(6);
    gameFlow.makeMove(7);
    gameFlow.makeMove(5);
    gameFlow.makeMove(8);
}