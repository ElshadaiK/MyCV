let userValue;
let computerValue; 
let turn;
let messages;
let inputs = document.querySelectorAll("input[type=radio]");
document.getElementById('board').style.visibility = 'hidden';
document.getElementById('gameInfo').style.display = 'none';
document.getElementById('info').style.display = 'none';
        
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
        document.getElementById('board').style.visibility = 'visible';
        document.getElementById('gameInfo').style.display = 'flex';
        document.getElementById('info').style.display = 'inline';
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
    }
    let handleTurn = event => {
        let idx = squares.findIndex(function(square) {
        return square === event.target;
        });
        if(board[idx] === ""){
        choose(idx, event)
        if(turn === computerValue){
            let move = computerTurn();
            if(move){
            choose(move, undefined);
            }
        }
        }
// check your console logs to make sure it's working!
        console.log(board);
        };
    /*----- functions -----*/
    let init = () => {
        board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];
        let render = () => {
            board.forEach((mark, index) => {
                squares[index].textContent = mark;
            });
            
            $('td').css({'background-color':'white'});
            if(messages){
            messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;}
        };
        render();
        document.getElementById('board').addEventListener('click', handleTurn);
    };

    init();

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
        if(!win){
        turn = turn === 'X' ? 'O' : 'X';    
        }     
        if(win){
            gameOver(win);
        }
    }
    function computerTurn(){
        let indexes = [];
        let move;
        let seePossibles = (value) => {
            let boardCopy = board.slice();
            boardCopy[value] = computerValue;
            if(getWinner() == computerValue){
                move = value;

            }
        }
        board.forEach(function check(item, index){
            if(item === ""){
                indexes.push(index);
            }
        });
        indexes.forEach(seePossibles)
        let cornerFilter = (value) => {
            if([0, 2, 6, 8].includes(value)){
                return value;
            }
        }
        let cornersOpen = indexes.filter(cornerFilter);
        
        if(cornersOpen.length > 0){
            move = cornersOpen[Math.floor(Math.random()*indexes.length)];
            return move;
        }
        if(indexes.includes(4)){
            move = 4;
            return move;
        }
        let edgeFilter = (value) => {
            if([1, 3, 5, 7].includes(value)){
                return value;
            }
        }
        let edgesOpen = indexes.filter(edgeFilter);
        if(edgesOpen.length > 0){
            move = edgesOpen[Math.floor(Math.random()*indexes.length)];
            return move;
        }
    }
    
    function getWinner() {
        let winner = null;
        winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
    }
    function gameOver(winner){
        document.getElementById('status').innerText = winner + " Won ";
        document.getElementById('board').removeEventListener('click', handleTurn);
    
    }
    /*----- event listeners -----*/
    document.getElementById('board').addEventListener('click', handleTurn);
    document.getElementById('reset-button').addEventListener('click', init);