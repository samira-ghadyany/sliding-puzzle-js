import MoveHandler from "./MoveHandler.js";
import state from "./PuzzleState.js";

const el = (css) => document.querySelector(css);
const create = (html) => document.createElement(html);

export default class Puzzle {
  #moveHandler;
  #state;
  static TILE_SIZE = 80;
  static GAP_SIZE = 3;

  constructor(dimension, beforeGameStartCallback, afterGameEndCallback) {
    this.#state = new state();

    // Store the puzzle grid dimension (e.g., 3 for a 3x3 grid)
    this.#state.boardDimension = parseInt(dimension);

    this.beforeGameStartCallback = beforeGameStartCallback;
    this.afterGameEndCallback = afterGameEndCallback;

    this.#moveHandler = new MoveHandler(this.#state, this.#finishTheGame);
  }

  startGame() {
    if (this.beforeGameStartCallback) {
      this.beforeGameStartCallback();
    }

    // Initialize a 2D array (matrix) with the given dimension,
    this.#state.winState = Array.from(
      { length: this.#state.boardDimension },
      () => Array(this.#state.boardDimension).fill(0),
    );

    const container = el("#container");
    this.#setContainerSize(container);
    // Generate the puzzle grid dynamically
    this.#generatePuzzleGrid();
    // Shuffle the game array
    this.#shuffle(this.#state.winState);
    // Create the game tiles and put into the container
    this.#appendTilesToGrid(container);
    // Register the game sart time into a variable
    this.#setStartTime();
  }

  // Set the container width dynamically based on the grid dimension.
  // Each tile is 80px wide, and there are (dimension + 1) gaps of 3px each
  #setContainerSize(container) {
    const size =
      this.#state.boardDimension * Puzzle.TILE_SIZE +
      (this.#state.boardDimension + 1) * Puzzle.GAP_SIZE;
    container.style.width = `${size}px`;
    container.style.height = `${size}px`;
  }

  // Generate the initial puzzle grid by creating a 2D array of div elements.
  #generatePuzzleGrid() {
    let id = 1;
    for (let i = 0; i < this.#state.boardDimension; i++) {
      for (let j = 0; j < this.#state.boardDimension; j++) {
        const div = this.#makeDiv(id++, i, j);
        this.#state.winState[i][j] = div;
      }
    }
  }

  // Create a puzzle tile (div element) with the given ID and grid position (i, j)
  #makeDiv(id, i, j) {
    const div = create("div");
    div.style.width = `${Puzzle.TILE_SIZE}px`;
    div.style.height = `${Puzzle.TILE_SIZE}px`;
    div.textContent = `${id}`;
    div.setAttribute("id", `${id}`);

    // Store the tile's grid position as attributes
    div.className = "item";

    // If this is the last tile (bottom-right corner), mark it as the empty tile
    if (
      i === this.#state.boardDimension - 1 &&
      j === this.#state.boardDimension - 1
    ) {
      this.#setEmptyDiv(div);
    }
    div.addEventListener("click", this.#moveHandler.handle);
    return div;
  }

  // Mark the given tile as the empty space in the puzzle
  #setEmptyDiv(div) {
    div.textContent = ``;
    div.classList.add("emptyDiv");
    this.#state.emptyDiv = div;
    this.#state.emptyIndexI = this.#state.boardDimension - 1;
    this.#state.emptyIndexJ = this.#state.boardDimension - 1;
  }

  // Register the game start time into a variable
  #setStartTime() {
    this.#state.gameStartTime = new Date();
  }

  // Append the shuffled puzzle tiles to the container and set their attributes
  #appendTilesToGrid(container) {
    for (let i = 0; i < this.#state.boardDimension; i++) {
      for (let j = 0; j < this.#state.boardDimension; j++) {
        const div = this.#state.boardState[i][j];

        // Update the tile's position attributes
        div.setAttribute("i", `${i}`);
        div.setAttribute("j", `${j}`);

        // Set the tile's visual position based on its grid coordinates
        div.style.left = `${j * Puzzle.TILE_SIZE + (j + 1) * Puzzle.GAP_SIZE}px`;
        div.style.top = `${i * Puzzle.TILE_SIZE + (i + 1) * Puzzle.GAP_SIZE}px`;
        container.append(div);
      }
    }
  }

  #shuffle(unshuffled) {
    // Create a copy of the 2D array to store shuffled tiles
    this.#state.boardState = unshuffled.map((row) => [...row]);

    // Perform a large number of random moves to shuffle the puzzle
    for (let i = 0; i < Math.pow(this.#state.boardDimension, 4); i++) {
      const verticalMoveDirection = Math.random() > 0.5;
      const increasingPositionIndex = Math.random() > 0.5;
      let targetI;
      let targetJ;
      if (verticalMoveDirection) {
        // Moving vertically (up/down)
        if (increasingPositionIndex) {
          // Moving down
          if (this.#state.emptyIndexI < this.#state.boardDimension - 1) {
            targetI = this.#state.emptyIndexI + 1;
            targetJ = this.#state.emptyIndexJ;
          } else {
            // If at the bottom, move up instead
            targetI = this.#state.emptyIndexI - 1;
            targetJ = this.#state.emptyIndexJ;
          }
        } else {
          // Moving up
          if (this.#state.emptyIndexI > 0) {
            targetI = this.#state.emptyIndexI - 1;
            targetJ = this.#state.emptyIndexJ;
          } else {
            // If at the top, move down instead
            targetI = this.#state.emptyIndexI + 1;
            targetJ = this.#state.emptyIndexJ;
          }
        }
      } else {
        // Moving horizontally (left/right)
        if (increasingPositionIndex) {
          // Moving right
          if (this.#state.emptyIndexJ < this.#state.boardDimension - 1) {
            targetJ = this.#state.emptyIndexJ + 1;
            targetI = this.#state.emptyIndexI;
          } else {
            // If at the right edge, move left instead
            targetJ = this.#state.emptyIndexJ - 1;
            targetI = this.#state.emptyIndexI;
          }
        } else {
          // Moving left
          if (this.#state.emptyIndexJ > 0) {
            targetJ = this.#state.emptyIndexJ - 1;
            targetI = this.#state.emptyIndexI;
          } else {
            // If at the left edge, move right instead
            targetJ = this.#state.emptyIndexJ + 1;
            targetI = this.#state.emptyIndexI;
          }
        }
      }
      // Swap the empty tile with the selected tile
      this.#state.swapTiles(
        targetI,
        targetJ,
        this.#state.emptyIndexI,
        this.#state.emptyIndexJ,
      );
      // Update the empty tile's new position
      this.#state.updateEmptyIndex(targetI, targetJ);
    }
  }

  #finishTheGame = () => {
    this.#removeBoardClickHandlers();
    // Check if there is a callback function defined for when the game ends
    if (this.afterGameEndCallback) {
      const gameDuration = Math.floor(
        (new Date() - this.#state.gameStartTime) / 1000,
      );

      // Call the afterGameEnd callback function with game duration and move count
      this.afterGameEndCallback(gameDuration, this.#state.movesCounter);
    }
  };

  #removeBoardClickHandlers() {
    this.#state.winState.forEach((row) => {
      row.forEach((div) => {
        div.removeEventListener("click", this.#moveHandler.handle);
      });
    });
  }
}
