import Puzzle from "./puzzle/Puzzle.js";

const el = (css) => document.querySelector(css);
const group = (css) => document.querySelectorAll(css);
const create = (html) => document.createElement(html);

// Function to start the puzzle
function start() {
  // Get the selected puzzle dimension from the dropdown menu
  const dimension = el("#dimension-select").value;

  // Create a new Puzzle instance with the selected dimension
  // Also, pass callback functions for before and after game events
  const puzzle = new Puzzle(dimension, beforeGameStart, afterGameEnd);

  // Hide the dialogue box when the game starts
  el("#dialogue-overlay").style.display = "none";

  // Initialize and start the puzzle game
  puzzle.startGame();
}

// Function to reset the game and show the start menu
function newGame() {
  const shuffleBtn = el("#shuffle");
  shuffleBtn.classList.remove("disabled");
  shuffleBtn.removeAttribute("disabled");
  shuffleBtn.style.display = "none";
  el("#container").style.display = "none";
  el("#change-level").style.display = "none";
  el("#win-container").style.display = "none";
  el("#dialogue-overlay").style.display = "flex";
}

// Callback function to set up the game environment before starting
const beforeGameStart = () => {
  const container = el("#container");

  // reset UI
  container.innerHTML = "";
  container.style.display = "block";

  el("#shuffle").style.display = "block";
  el("#change-level").style.display = "block";
};

// Callback function to handle the end of the game
const afterGameEnd = (gameDuration, movesCount) => {
  const shuffleBtn = el("#shuffle");
  shuffleBtn.classList.add("disabled");
  shuffleBtn.setAttribute("disabled", "true");
  el("#win-container").style.display = "block";
  el("#win-message").textContent = "Well done! You won!";
  el("#win-time").textContent = `You finished in ${gameDuration} seconds.`;
  el("#win-moves").textContent =
    `You solved the puzzle in ${movesCount} moves.`;
  playWinSound();
};

function playWinSound() {
  const sound = new Audio();
  sound.volume = 0.1;
  sound.src = "sound/winner.mp3";
  sound.play();
}

el("#start-button").addEventListener("click", start);
el("#shuffle").addEventListener("click", start);
el("#change-level").addEventListener("click", newGame);
