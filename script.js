// Game State Initialization
const gameState = {
  players: [
    { id: 1, name: "Player 1", monsters: [], removedMonsters: 0 },
    { id: 2, name: "Player 2", monsters: [], removedMonsters: 0 },
  ],
  grid: Array(10)
    .fill(null)
    .map(() => Array(10).fill(null)), // 10x10 grid
  currentPlayerIndex: 0,
  round: 1,
};

// DOM Elements
const gameBoard = document.getElementById("game-board");
const currentPlayerEl = document.getElementById("current-player");
const endTurnButton = document.getElementById("end-turn");
const statusEl = document.getElementById("status");

// Initialize the grid
function initializeGrid() {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const hexagon = document.createElement("div");
      hexagon.classList.add("hexagon");
      hexagon.dataset.row = row;
      hexagon.dataset.col = col;

      hexagon.addEventListener("click", () => {
        handleHexClick(row, col);
      });

      gameBoard.appendChild(hexagon);
    }
  }
}

// Handle hexagon clicks for monster placement and movement
function handleHexClick(row, col) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  if (
    (currentPlayer.id === 1 && row === 0) || // Player 1 places on row 0
    (currentPlayer.id === 2 && row === 9) // Player 2 places on row 9
  ) {
    const monsterTypes = ["vampire", "werewolf", "ghost"];
    const selectedMonster = monsterTypes[Math.floor(Math.random() * 3)];
    addMonster(currentPlayer.id, selectedMonster, row, col);
  } else {
    console.log("Invalid placement. Must place on your edge!");
  }
}

// Add a monster to the grid
function addMonster(playerId, type, row, col) {
  if (gameState.grid[row][col] === null) {
    const monster = { type, row, col, owner: playerId };
    gameState.grid[row][col] = monster;

    const player = gameState.players.find((p) => p.id === playerId);
    player.monsters.push(monster);

    const hexagon = document.querySelector(
      `.hexagon[data-row="${row}"][data-col="${col}"]`
    );
    hexagon.textContent = type[0].toUpperCase();
    hexagon.classList.add("monster");
  } else {
    resolveConflict(row, col);
  }
}

// Resolve conflicts when two monsters are in the same cell
function resolveConflict(row, col) {
  const monsters = gameState.grid[row][col];

  if (monsters.length > 1) {
    const [monsterA, monsterB] = monsters;

    if (
      (monsterA.type === "vampire" && monsterB.type === "werewolf") ||
      (monsterB.type === "vampire" && monsterA.type === "werewolf")
    ) {
      removeMonster(monsterB);
    } else if (
      (monsterA.type === "werewolf" && monsterB.type === "ghost") ||
      (monsterB.type === "werewolf" && monsterA.type === "ghost")
    ) {
      removeMonster(monsterB);
    }
    // Add similar rules for other combinations
  }
}

// Remove monster from grid
function removeMonster(monster) {
  const player = gameState.players.find((p) => p.id === monster.owner);
  player.removedMonsters++;

  if (player.removedMonsters >= 10) {
    console.log(`${player.name} is eliminated!`);
  }
}

// End the current player's turn
function endTurn() {
  gameState.currentPlayerIndex =
    (gameState.currentPlayerIndex + 1) % gameState.players.length;

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  currentPlayerEl.textContent = currentPlayer.name;

  // Start a new round if all players have taken their turn
  if (gameState.currentPlayerIndex === 0) {
    gameState.round++;
    console.log(`Round ${gameState.round} begins!`);
  }
}

// Initialize the game
function initializeGame() {
  initializeGrid();
  currentPlayerEl.textContent =
    gameState.players[gameState.currentPlayerIndex].name;

  endTurnButton.addEventListener("click", endTurn);
}

initializeGame();
