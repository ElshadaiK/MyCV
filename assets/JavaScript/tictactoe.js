let userValue;
let computerValue; 
let turn;
let messages;
let inputs = document.querySelectorAll("input[type=radio]");

x=inputs.length;

while(x--)
    inputs[x].addEventListener("change",function(){
        document.getElementById('user-form').style.display = 'none';
        var radios = document.getElementsByName('myradio');
        

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                turn = userValue = radios[i].value;
                computerValue = (userValue == 'O')? 'X':'O';
                break;
            }
        
        }
        document.getElementById('status').innerText = "You're " + userValue;
        document.getElementById('status').style.visibility= 'visible';
    },0);

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
    if(turn){
        messages = document.querySelector('h2');
    
    }
    /*----- app's state (variables) -----*/
    let board;
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
            
            $('td').css({'background-color':'white'});
            if(messages){
            messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;}
        };
        render();
    };

    init();
    function handleTurn(event) {
        let idx = squares.findIndex(function(square) {
        return square === event.target;
        });
        if(board[idx] === ""){
        choose(idx, event)
        if(turn === computerValue){
            computerTurn();
        }
        }
// check your console logs to make sure it's working!
        console.log(board);
        };
    function choose(num, event){
        board[num] = turn;
        if(event){
        event.target.textContent = board[num]
        event.target.style.backgroundColor = "lightgrey";
        }
        else{
            board[num] = turn;
            $('td').eq(num).css({'background-color':'lightgrey'});
            $('td').eq(num).html(turn);
// ADDING STYLE FOR THE COMPUTER
        }
        win = getWinner(); 
        turn = turn === 'X' ? 'O' : 'X';         
    }
    function computerTurn(){
        let indexes = [];
        board.forEach(function check(item, index){
            if(item === ""){
                indexes.push(index);
            }
        });
        let randomItem = indexes[Math.floor(Math.random()*indexes.length)];
        choose(randomItem, undefined);
    }
    function getWinner() {
        let winner = null;
        winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
    }