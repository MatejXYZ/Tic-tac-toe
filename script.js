const board = document.querySelector('.board');
const start = document.querySelector('.startContainer');
const startButton = document.querySelector('.startButton')
const finish = document.querySelector('.finish');
const gameboard = (function () {
    let vsBot = 0;
    let players = {};
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
                    finish.classList.toggle('hidden');
                    finish.textContent = result === 'finish' ? (current.player.name || current.player.symbol) + ' wins!' : 'It\'s a draw.'
                }
                console.log(vsBot)
                if (vsBot) console.log('ROBOOTS!');
                return current['player'] = current['player'] === players['first'] ? players['second'] : players['first'];
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
    function clear() {
        table = [];
        render();
    }
    return {
        playerMaker,
        render,
        clear,
        players,
        vsBot
    }
})();

const gameMechanism = (function () {
const hideReveal = (array) => array.forEach(element => element.classList.toggle('hidden'));
const isVisible = element => !element.classList.contains('hidden');
return startButton.addEventListener('click', () => {
    if (isVisible(start)) {
        gameboard.players['first'] = gameboard.playerMaker(start.querySelectorAll('input')[0].value, 'X');
        gameboard.players['second'] = gameboard.playerMaker(start.querySelectorAll('input')[1].value, 'O');
        startButton.textContent = 'Restart';
        hideReveal([start, board]);
    }
    else if (isVisible(board)) {
        gameboard.clear();
    }
    else {
        gameboard.clear();
        hideReveal([finish, board])
    }
    if (Array.from(document.querySelectorAll('.choice')[1].classList).includes('chosen')) {
        gameboard.players.second.name = 'AI';
        gameboard.vsBot = 'on';
        let aiMove = Math.round(Math.random() * 8);
        gameboard.players.second.draw(aiMove);
    }
 })
})();
const ai = (function () {
    const choices = document.querySelectorAll('.choice');
    return choices.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('chosen')) {
                item.classList.add('chosen')
                choices[1 - index].classList.remove('chosen')
            }
        })
      })
})();