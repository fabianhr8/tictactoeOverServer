const socket = io();

const turnChosen = document.getElementById("turnChosen");
const turn = document.getElementById("turn");
const button = document.getElementById("but");
const spaces = document.querySelectorAll("span");

let turnNum = 0;
let badNum = false;                         // Used to check if the number inputed is wrong
const player1Turns = [];
const player2Turns = [];

// let actualTurn = true;                    // True when it's player's 1 turn. False when it is player's 2 turn

// Every time a player sends their number
button.addEventListener("click", () => {
    badNum = false;

    // Check it is anumber between 1 and 9
    checkBetween1and9(turnChosen.value);

    //Check if number has been used before
    if(turn.textContent == "Player 1 turn"){
        checkNum(turnNum, player1Turns, player2Turns);
    }
    else {
        checkNum(turnNum, player2Turns, player1Turns);
    }

    // If the number is good, send it to the server / Else, do nothing
    if (!badNum){
        socket.emit("sendTurn", turnNum);
    }
});


// Response from server after sending the number
socket.on("sendTurnFromServer", (data) => {

    // Player 1 turn
    if(turn.textContent == "Player 1 turn"){
        for (let space of spaces){
            if(data == space.id){
                space.textContent = "X";
            }
        }

        checkWin(data, player1Turns, "Player 1 wins!");
        turn.textContent = "Player 2 turn";
    } 
    
    // Player 2 turn
    else {  
        for (let space of spaces){
            if(data == space.id){
                space.textContent = "O";
            }
        }
        checkWin(data, player2Turns, "Player 2 wins!");
        turn.textContent = "Player 1 turn";
    }
    turnChosen.value = "";                                  // Reset input
});

socket.on("winningMessageFromServer", (msg) => {
    alert(msg);
});

function checkBetween1and9(numChosen) {
    // Check that it is a number between 1 and 9
    if (numChosen < 1 || numChosen > 9){
        alert("Choose a number between 1 and 9");
        badNum = true;
    }

    turnNum = Number(numChosen);
}


function checkNum(num, playerTurn, otherPlayerTurn){

    // If the player has already chosen that cell
    if (playerTurn.includes(num)){
        alert("You already chose that");
        badNum = true;
        return;
    }

    // If the other player has chosen that cell
    else if (otherPlayerTurn.includes(num)){
        alert("That was already chosen by the other player");
        badNum = true;
        return;
    }

    // Add turn to player's array of turns
    playerTurn.push(num);
}


function checkWin(data, playerTurn, winningMsg){
    //Check if player has won
    // Horizontal win
    if (playerTurn.includes(1) && playerTurn.includes(2) && playerTurn.includes(3)){
        socket.emit("winningMessage", winningMsg);
    }
    if (playerTurn.includes(4) && playerTurn.includes(5) && playerTurn.includes(6)){
        socket.emit("winningMessage", winningMsg);
    }
    if (playerTurn.includes(7) && playerTurn.includes(8) && playerTurn.includes(9)){
        socket.emit("winningMessage", winningMsg);
    }

    //Vertical win
    if (playerTurn.includes(1) && playerTurn.includes(4) && playerTurn.includes(7)){
        socket.emit("winningMessage", winningMsg);
    }
    if (playerTurn.includes(2) && playerTurn.includes(5) && playerTurn.includes(8)){
        socket.emit("winningMessage", winningMsg);
    }
    if (playerTurn.includes(3) && playerTurn.includes(6) && playerTurn.includes(9)){
        socket.emit("winningMessage", winningMsg);
    }

    //Diagonal win
    if (playerTurn.includes(1) && playerTurn.includes(5) && playerTurn.includes(9)){
        socket.emit("winningMessage", winningMsg);
    }
    if (playerTurn.includes(3) && playerTurn.includes(5) && playerTurn.includes(7)){
        socket.emit("winningMessage", winningMsg);
    }
}