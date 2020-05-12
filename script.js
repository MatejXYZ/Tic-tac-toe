const board = document.getElementById('board')

for (let i = 0; i < 9; i++) {
    board.children[i].classList.add('square')
}

const gameboard = (function () {
    const current = {player: null};
    let table = [];
    for (let i = 0; i < 9; i++) {
        board.children[i].addEventListener('click', () => {
            if (table[i]) return;
            current['player'].draw(i);
        })
    }
    function render() {
        for (let i = 0; i < 9; i++) {
            board.children[i].textContent = table[i];
        }
    }
    function playerMaker(name, symbol) {
        let obj = {
            name,
            symbol,
            draw: position => {
                table[position] = symbol;
                render();
                let result = check();
                if (result === 'finish') return console.log(current['player'].name + ' wins!');
                else if (result === 'draw') return console.log('I\'s a draw.');
                current['player'] = current['player'] === player1 ? player2 : player1;
            }
        };
        current['player'] = obj;
        return obj;
    }
    function check() {
        let result;
        const compare = array => {
            array.forEach(group => {
                if (table[group[0]] !== undefined && table[group[0]] === table[group[1]] && table[group[1]] === table[group[2]]) {
                    result = 'finish'
                }
            });
            if (result === undefined && table.filter(item => item).length === 9) result = 'draw';
            return result;
        }
        return compare([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]);
    }
    return {
        playerMaker,
        render,
    }
})();



//

const player1 = gameboard.playerMaker('Player 1', 'X');
const player2 = gameboard.playerMaker('Player 2', 'O');