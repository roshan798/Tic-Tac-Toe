let value = { 1: "X", 2: "O" };
let score = { 1: 0, 2: 0 };
let curr_user = 1;
let count = 0;
let board;
window.onload = function () {
    board = createBoard();
    let items = document.querySelectorAll(".box");
    items.forEach((item) => {
        item.addEventListener("click", () => {
            if (item.innerHTML == "") {
                let html = `<div class="inner">${value[curr_user]}</div>`;
                item.innerHTML = html;
                clickSound(curr_user);
                let row = Math.floor((item.id - 1) / 3),
                    col = (item.id - 1) % 3;
                board[row][col] = value[curr_user];
                setTimeout(checkWin, 50, row, col);
            }
        });
    });
    let reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
        if (count != 0) createBoard();
    });
};

const audio = [new Audio(`sound/click1.wav`), new Audio(`sound/click2.wav`)];
function clickSound(player) {
    audio[player - 1].volume = 0.1;
    audio[player - 1].play();
}
function checkWin(row, col) {
    count++;
    let flag = false;
    flag = checkRow(row) | checkCol(col) | checkDiagonal();
    if (flag == true) {
        let winCard = document.getElementsByClassName("win-card");
        winCard[0].style.display = "block";
        let winner_text = document.getElementById("winner");
        winner_text.innerText = `Player ${curr_user} Won`;
        score[curr_user]++;
        setTimeout(
            function (Class) {
                winCard[0].style.display = "none";
                winner_text.innerText = "";
            },
            2000,
            "win-card"
        );
        board = createBoard();
        return;
    }
    if (count == 9) {
        let winCard = document.getElementsByClassName("win-card");
        winCard[0].style.display = "block";
        let announcment = document.getElementById("greeting-bg");
        announcment.innerText = `Match Draw!`;
        announcment.style.left = "15%";
        setTimeout(
            function (Class) {
                winCard[0].style.display = "none";
                announcment.innerText = "congratulations";
                announcment.style.left = "15px";
            },
            1500,
            "win-card"
        );
        board = createBoard();
        return;
    }
    curr_user = curr_user == 1 ? 2 : 1;
}

function createBoard() {
    let arr = Array(3);
    document.querySelectorAll(".box").forEach((item) => {
        item.innerHTML = "";
    });
    for (let i = 0; i < 3; i++) {
        arr[i] = Array("0", "0", "0");
    }
    let player_score = document.getElementById(`score${curr_user}`);
    player_score.innerText = score[curr_user];
    count = 0;
    curr_user = 1;
    return arr;
}
function checkRow(row) {
    if (
        board[row][0] == board[row][1] &&
        board[row][1] == board[row][2] &&
        board[row][2] == value[curr_user]
    )
        return true;
    return false;
}

function checkCol(col) {
    if (
        board[0][col] == board[1][col] &&
        board[1][col] == board[2][col] &&
        board[2][col] == value[curr_user]
    )
        return true;
    return false;
}

function checkDiagonal() {
    if (
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2] &&
        board[2][2] == value[curr_user]
    )
        return true;
    else if (
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0] &&
        board[2][0] == value[curr_user]
    )
        return true;
    return false;
}
