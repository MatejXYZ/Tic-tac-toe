const board = document.querySelector('.board');
const start = document.getElementById('startContainer');
const message = document.getElementById('message');
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
                if (result) {
                    board.classList.toggle('hidden');
                    message.classList.toggle('hidden');
                    message.textContent = result === 'finish' ? (current.player.name || current.player.symbol) + ' wins!' : 'It\'s a draw.'
                }
                current['player'] = current['player'] === players['first'] ? players['second'] : players['first'];
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
let players = {};
start.querySelector('button').addEventListener('click', () => {
    const hideReveal = element => element.classList.toggle('hidden');
    hideReveal(start);
    hideReveal(board);
    players['first'] = gameboard.playerMaker(start.querySelectorAll('input')[0].value, 'X');
    players['second'] = gameboard.playerMaker(start.querySelectorAll('input')[1].value, 'O')
})