/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winstate; // we only need one variable called winstate which will be 1 for win, -1 for loose and 0 for tie 

/*------------------------ Cached Element References ------------------------*/
const squareEI = document.getElementsByClassName("sqr");
const message = document.getElementById("message");
const boardElement = document.getElementsByClassName("board")[0];
const resetBtn = document.getElementById("reset");

document.addEventListener("DOMContentLoaded", init());

/*-------------------------------- Functions --------------------------------*/
function init() {
    winstate = null;
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "x";
    render();
}

function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    let index = 0;
    for (const cell of squareEI) {
        cell.innerHTML = board[index++];
    }

}
function updateMessage(params) {
    switch (winstate) {
        case "x":
            message.innerHTML = " X wins!"
            break;
        case "t":
            message.innerHTML = " It is a tie!"
            break;
        case "0":
            message.innerHTML = " 0 wins!"
            break;
        case null://in case it is null and a endstate has not been reached
            turn == "x" ? message.innerHTML = "X turn" : message.innerHTML = "0 turn";
            break;
    }
}
function handleClick(e) {
    let currentElement = e.target;

    if (currentElement.classList.contains("sqr") && winstate == null) {
        placePiece(currentElement.id);
        checkWinstate();
        checkForTie();
        render();
        e.stopPropagation();
    }
}

function placePiece(index) {
    console.log(board[index]);
    if (board[index] == "") {
        board[index] = turn;
        turn = turn === "x" ? "0" : "x";
        console.log(board);
    }
}
function checkWinstate() {
    winningCombos.forEach(combo => {
        let a = board[combo[0]];
        let b = board[combo[1]];
        let c = board[combo[2]];
        if (a !== "" && a === b && a === c) {
            winstate = a;
            return;
        }
    });
}
function checkForTie() {
    if (board.indexOf("") === -1 && winstate !== null) {
        winstate = "t";
    }
}
//i dont really need change turn as it is switched when 

/*----------------------------- Event Listeners -----------------------------*/
boardElement.addEventListener("click", handleClick)
resetBtn.addEventListener("click", init);

