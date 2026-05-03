# Sliding Puzzle Game

A dynamic sliding puzzle game built with vanilla JavaScript. Challenge yourself by arranging tiles in the correct order with multiple difficulty levels (3x3 to 8x8 grids).

## Features

- **Multiple Difficulty Levels**: Choose from 3×3 to 8×8 puzzle grids
- **Performance Tracking**: Tracks game duration (seconds) and move count
- **Sound Effects**: Audio feedback for tile moves and game completion
- **Smooth Animations**: jQuery-powered tile animations
- **Modular Architecture**: Well-organized code structure with separate classes for logic separation

## How to Play

1. **Start the Game**
   - Open `index.html` in a web browser (requires local server for ES modules)
   - Select puzzle dimension (3×3 to 8×8)
   - Click "Start" button

2. **Playing**
   - Click tiles adjacent to the empty space to move them
   - Goal: Arrange tiles in numerical order with empty space at bottom-right
   - Game tracks time (seconds) and move count

3. **Win**
   - Arrange all tiles correctly to win
   - View your completion time and move count
   - Click "Shuffle" to play again or "Change Level" to select new difficulty

## Project Structure

```
sliding-puzzle/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Styling and animations
├── js/
│   ├── app.js             # Application entry point and event handlers
│   └── puzzle/
│       ├── Puzzle.js      # Main puzzle game logic
│       ├── MoveHandler.js # Click event and tile movement handler
│       └── PuzzleState.js # State management for game data
├── img/                   # Game images and icons
├── sound/                 # Sound effects (slide.mp3, winner.mp3)
├── docs/
│   └── activity-digram.mmd # Flow diagram of method invocations
└── .gitignore             # Git ignore file
```

## Classes and Architecture

### `Puzzle` (Puzzle.js)
Main controller class that manages the overall game flow.

**Key Methods:**
- `constructor(dimension, beforeGameStartCallback, afterGameEndCallback)` - Initialize the puzzle
- `startGame()` - Start a new game session
- `#generatePuzzleGrid()` - Create initial tile grid
- `#shuffle()` - Randomize tile positions for gameplay
- `#appendTilesToGrid()` - Render tiles to DOM
- `#finishTheGame()` - Handle game completion

### `MoveHandler` (MoveHandler.js)
Handles all tile click interactions and move validation.

**Key Methods:**
- `constructor(puzzleState, finishTheGameCallback)` - Initialize the handler
- `handle(event)` - Main event handler for tile clicks
- `#hasEmptyNeighbor(clickedDiv)` - Validate if tile can move
- `#graphicalSwap(clickedDiv)` - Animate tile movement
- `#playMoveSound()` - Play sound effect on valid move

### `PuzzleState` (PuzzleState.js)
Manages all game state data.

**Properties:**
- `boardDimension` - Grid size (3-8)
- `boardState` - Current tile arrangement
- `winState` - Target/solved arrangement
- `movesCounter` - Number of moves made
- `gameStartTime` - Game start timestamp
- `emptyIndexI`, `emptyIndexJ` - Position of empty tile

**Key Methods:**
- `increaseMoveCounter()` - Increment move count
- `updateEmptyIndex(i, j)` - Update empty tile position
- `swapTiles(i1, j1, i2, j2)` - Swap tile positions in array
- `isGameFinished()` - Check if puzzle is solved

## Running Locally

### Option 1: Using VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically at `http://localhost:5500`

### Option 2: Using Python
```bash
cd sliding-puzzle
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser

### Option 3: Using Node.js
```bash
npm install -g http-server
http-server
```

## Technologies Used

- **HTML5** - Document structure
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Game logic with classes and modules
- **jQuery** - DOM manipulation and animations
- **Git** - Version control

## Game Flow

```
User clicks "Start"
    ↓
Puzzle instance created with MoveHandler
    ↓
Game grid generated and shuffled
    ↓
User clicks tiles (adjacent to empty space)
    ↓
Tile animates and swaps position
    ↓
Move counter incremented
    ↓
Check if puzzle solved
    ├─ No → Back to tile clicking
    └─ Yes → Show win screen with stats
```

## Code Quality

- **Modular Design**: Separate concerns with Puzzle, MoveHandler, and PuzzleState classes
- **Private Fields**: ES6 private fields (#) for encapsulation
- **ES Modules**: Clean dependency management with import/export
- **Comments**: Well-documented methods explaining game logic
- **Type Safety**: Clear naming conventions (state properties, methods)

## Future Enhancements

- [ ] Leaderboard/high scores
- [ ] Keyboard controls
- [ ] Undo/Redo functionality

## Author

**Samira Ghadyany** - JavaScript learning project as part of cimdata-course

## License

Personal project for educational purposes.
