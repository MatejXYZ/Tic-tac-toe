const board = document.getElementById('board')
function playerMaker(name, symbol) {
    let obj = {name, symbol};
    return obj;
}
const gameboard = (function () {
    let table = [,,,,,,,,];
    function draw(position, symbol) {
        table[position] = symbol;
    }
    function render() {
        board.children.array.forEach((element, index) => {
            element.gridarea = table[index];
        });
    }
    return {
        draw,
        render
    }
})();


//

for (let i = 0; i < 9; i++) {
    board.children[i].classList.add('square')
}