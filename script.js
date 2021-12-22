"use strict";

let secretNumber;
let gamePaused = false;
let scoreCounter = 20;
let highscoreCounter = 0;

const NUMBER = document.querySelector(".number");
const AGAIN = document.querySelector(".again");
const CHECK = document.querySelector(".check");
const GUESS = document.querySelector(".guess");
const MESSAGE = document.querySelector(".message");
const SCORE = document.querySelector(".score");
const HIGHSCORE = document.querySelector(".highscore");

// change style
function _change_style(x, y) {
  document.querySelector("body").style.backgroundColor = x;
  NUMBER.style.width = y;
}

// start / reset game
function _reset_game() {
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  gamePaused = false;
  MESSAGE.textContent = "Start guessing...";
  scoreCounter = 20;
  SCORE.textContent = scoreCounter;
  NUMBER.textContent = "?";
  GUESS.value = "";

  _change_style("#222", "15rem");
}
_reset_game();

AGAIN.addEventListener("click", () => _reset_game());

// check button
CHECK.addEventListener("click", () => {
  if (gamePaused) return;

  let guessedNumber = GUESS.value;
  if (!guessedNumber) {
    MESSAGE.textContent = "🛑 No Number!";
  } else {
    if (guessedNumber == secretNumber) _guess_correct();
    if (guessedNumber < secretNumber) _guess_to_low();
    if (guessedNumber > secretNumber) _guess_to_high();
  }

  _update_score();
});

function _update_score() {
  SCORE.textContent = scoreCounter;
  HIGHSCORE.textContent = highscoreCounter;
}

function _guess_correct() {
  MESSAGE.textContent = "🎉 Correct Number!";
  NUMBER.textContent = secretNumber;
  gamePaused = true;
  if (highscoreCounter < scoreCounter) highscoreCounter = scoreCounter;
  _change_style("#60b347", "30rem");
}

function _guess_to_low() {
  MESSAGE.textContent = "⬇️ To Low!";
  scoreCounter--;
}

function _guess_to_high() {
  MESSAGE.textContent = "⬆️ To High!";
  scoreCounter--;
}
