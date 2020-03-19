let userValue;
let inputs = document.querySelectorAll("input[type=radio]"),
    x=inputs.length;
while(x--)
    inputs[x].addEventListener("change",function(){
        document.getElementById('user-form').style.display = 'none';
        var radios = document.getElementsByName('myradio');
        

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                userValue = radios[i].value;
                break;
            }
        
        }
        document.getElementById('status').innerText = "You're " + userValue;
        document.getElementById('status').style.visibility= 'visible';
    },0);
let computerValue = (userValue == 'O')? 'X':'O';

    /*----- constants -----*/
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];
    /*----- cached element references -----*/
    const squares = Array.from(document.querySelectorAll('td'));
    console.log(squares);
    const messages = document.querySelector('h2');
    /*----- app's state (variables) -----*/
    let board;
    let turn = userValue;
    let win;
    if(board){
    win = board[0] && board[0] === board[1] && board[0] === board[2] ? board[0] : null;
    /*----- event listeners -----*/
    }
    document.getElementById('board').addEventListener('click', handleTurn);
    document.getElementById('reset-button').addEventListener('click', init);
    /*----- functions -----*/
    function init() {
        board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];
        function render() {
            board.forEach(function(mark, index){
                squares[index].textContent = mark;
            });
            messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
        render();
    };
};
    init();
    function handleTurn(event) {
        let idx = squares.findIndex(function(square) {
        return square === event.target;
        });
        board[idx] = turn;
        win = getWinner(); 
        turn = turn === 'X' ? 'O' : 'X'; 
// check your console logs to make sure it's working!
        console.log(board);
        };
    function getWinner() {
        let winner = null;
        winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
    }