export default class PuzzleState {
  boardDimension = null;
  boardState;
  winState;
  emptyIndexI = null;
  emptyIndexJ = null;
  gameStartTime;
  movesCounter = 0;
  emptyDiv;

  increaseMoveCounter = () => {
    this.movesCounter++;
  };

  updateEmptyIndex = (newEmptyI, newEmptyJ) => {
    // Update the stored indices of the empty tile
    this.emptyIndexI = newEmptyI;
    this.emptyIndexJ = newEmptyJ;
  };

  swapTiles = (i1, j1, i2, j2) => {
    // Temporarily store the first tile in the variable 'temp'
    const temp = this.boardState[i1][j1];

    // Swap the first tile with the second tile
    this.boardState[i1][j1] = this.boardState[i2][j2];

    // Assign the originally stored first tile to the second tile's position
    this.boardState[i2][j2] = temp;
  };

  isGameFinished = () => {
    for (let i = 0; i < this.boardDimension; i++) {
      for (let j = 0; j < this.boardDimension; j++) {
        if (this.boardState[i][j] !== this.winState[i][j]) {
          // If any tile is misplaced, the puzzle is not solved
          return false;
        }
      }
    }
    // If all tiles are in the correct positions, the puzzle is solved
    return true;
  };
}
