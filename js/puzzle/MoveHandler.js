export default class MoveHandler {
  #puzzleState;

  constructor(puzzleState, finishTheGameCallback) {
    this.#puzzleState = puzzleState;
    this.finishTheGameCallback = finishTheGameCallback;
  }

  handle = (event) => {
    // Check if the clicked tile is adjacent to the empty tile
    const hasEmptyNeighbor = this.#hasEmptyNeighbor(event.target);

    if (hasEmptyNeighbor) {
      this.#playMoveSound();
      this.#puzzleState.increaseMoveCounter();

      // Store the current position of the clicked tile before swapping
      const tempEmptyI = parseInt($(event.target).attr("i"));
      const tempEmptyJ = parseInt($(event.target).attr("j"));

      // Visually swap the clicked tile with the empty tile
      this.#graphicalSwap(event.target);

      // Get the updated position of the clicked tile after swapping
      const newTargetI = parseInt($(event.target).attr("i"));
      const newTargetJ = parseInt($(event.target).attr("j"));

      // Update the empty tile's index to its new position
      this.#puzzleState.updateEmptyIndex(tempEmptyI, tempEmptyJ);

      // Swap the positions in the internal array to reflect the move
      this.#puzzleState.swapTiles(
        newTargetI,
        newTargetJ,
        tempEmptyI,
        tempEmptyJ,
      );

      // Check if the puzzle is solved after the move
      const finished = this.#puzzleState.isGameFinished();
      if (finished) {
        this.finishTheGameCallback();
      }
    }
  };

  #hasEmptyNeighbor = (clickedDiv) => {
    // Get the row (i) and column (j) indices of the clicked tile
    const i = parseInt(clickedDiv.getAttribute("i"));
    const j = parseInt(clickedDiv.getAttribute("j"));

    // Check if the clicked tile is directly to the left or right of the empty tile
    if (
      i === this.#puzzleState.emptyIndexI &&
      Math.abs(j - this.#puzzleState.emptyIndexJ) === 1
    ) {
      return true;
    }
    // Check if the clicked tile is directly above or below the empty tile
    if (
      j === this.#puzzleState.emptyIndexJ &&
      Math.abs(i - this.#puzzleState.emptyIndexI) === 1
    ) {
      return true;
    }
    // If neither condition is met, return false (no adjacent empty tile)
    return false;
  };

  #playMoveSound = () => {
    const sound = new Audio();
    sound.volume = 0.2;
    sound.src = "sound/slide.mp3";
    sound.play();
  };

  #graphicalSwap = (clickedDiv) => {
    // Get jQuery elements for the clicked tile and the empty tile
    const clickedBox = $(clickedDiv);
    const emptyBox = $(this.#puzzleState.emptyDiv);

    // Get the current positions of both tiles
    let pos1 = clickedBox.position();
    let pos2 = emptyBox.position();

    // Check if the clicked tile and the empty tile are in the same row
    if (clickedBox.attr("i") == emptyBox.attr("i")) {
      // Animate horizontal movement
      clickedBox.animate({ left: pos2.left }, 200);
      emptyBox.animate({ left: pos1.left }, 200);
      // Swap their column indices
      this.#swapAttributes(clickedBox, emptyBox, "j");
      // Check if the clicked tile and the empty tile are in the same column
    } else if (clickedBox.attr("j") == emptyBox.attr("j")) {
      clickedBox.animate({ top: pos2.top }, 200);
      // Animate vertical movement
      emptyBox.animate({ top: pos1.top }, 200);
      // Swap their row indices
      this.#swapAttributes(clickedBox, emptyBox, "i");
    }
  };

  #swapAttributes(clickedBox, emptyBox, positionAttributeName) {
    // Store the current position attribute of the clicked tile
    const temp = clickedBox.attr(positionAttributeName);

    // Set the clicked tile's position attribute to the empty tile's position attribute
    clickedBox.attr(
      positionAttributeName,
      emptyBox.attr(positionAttributeName),
    );

    // Set the empty tile's position attribute to the original clicked tile's position
    emptyBox.attr(positionAttributeName, temp);
  }
}
