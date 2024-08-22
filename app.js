const input = document.querySelector("#guessField");
const button = document.querySelector("button");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let randomNum = parseInt(Math.random() * 10);

const p = document.createElement("p");

let prevGuess = [];
let noOfgame = 1;
let playGame = true;

if (playGame) {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const guess = parseInt(input.value);
        console.log(guess);
        validateGuess(guess);
    });
}

validateGuess = (guess) => {
    if (isNaN(guess) || guess < 1 || guess > 100)
        alert("Enter a valid Number between 1 and 100");
    else {
        prevGuess.push(guess);
        if (noOfgame === 11) {
            displayGuess(guess);
            displayMessage(`Random number was ${randomNum}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
};

function checkGuess(guess) {
    if (guess === randomNum) {
        displayWin(`You guessed it RIGHT`);
        endGame();
    } else if (guess < randomNum) {
        displayMessage(`Number is TOOO low`);
    } else if (guess > randomNum) {
        displayMessage(`Number is TOOO High`);
    }
}

displayGuess = (guess) => {
    input.value = "";
    guessSlot.innerHTML += `${guess}, `;
    noOfgame++;
    remaining.innerHTML = `${11 - noOfgame} `;
};

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

displayWin = (msg) => {
    lowOrHi.innerHTML = `<h2>${msg}</h2>`;
    lowOrHi.style.color = "#BEDC74";
};

function endGame() {
    input.value = "";
    input.setAttribute("disabled", "");
    // p.classList.add("button");
    // p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

let gameActive = false;

function resetGame() {
    randomNum = parseInt(Math.random() * 100);
    prevGuess = [];
    noOfgame = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - noOfgame} `;
    input.value = "";
    input.removeAttribute("disabled");
    playGame = true;
    gameActive = false;
}

function startNewGame() {
    if (guess === randomNum) {
        resetGame();
        gameActive = true;
    }
}

document.getElementById("reset-btn").addEventListener("click", resetGame);
document.getElementById("new-game-btn").addEventListener("click", startNewGame);

button.addEventListener("click", (event) => {
    event.preventDefault();
    const guess = parseInt(input.value);
    validateGuess(guess);
    gameActive = true;
});
