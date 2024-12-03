const gameBoard = document.getElementById('game-board');

// Generate a 10x10 grid of hexagons
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const hexagon = document.createElement('div');
    hexagon.classList.add('hexagon');
    hexagon.dataset.row = row;
    hexagon.dataset.col = col;

    // Add event listeners for hover and click
    hexagon.addEventListener('mouseenter', () => {
      hexagon.style.outline = '2px solid #ff5722'; // Distinct border on hover
    });

    hexagon.addEventListener('mouseleave', () => {
      hexagon.style.outline = 'none';
    });

    hexagon.addEventListener('click', () => {
      // Handle selection/deselection
      const currentlySelected = document.querySelector('.selected');
      if (currentlySelected) {
        currentlySelected.classList.remove('selected');
      }
      if (!hexagon.classList.contains('selected')) {
        hexagon.classList.add('selected');
      } else {
        hexagon.classList.remove('selected');
      }
    });

    gameBoard.appendChild(hexagon);
  }
}

hexagon.addEventListener('click', () => {
    const row = parseInt(hexagon.dataset.row);
    const col = parseInt(hexagon.dataset.col);
  
    // Clear previous path highlights
    document.querySelectorAll('.path').forEach(cell => cell.classList.remove('path'));
  
    // Example: Highlight neighbors
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const neighbor = document.querySelector(`[data-row="${row + r}"][data-col="${col + c}"]`);
        if (neighbor && !neighbor.classList.contains('selected')) {
          neighbor.classList.add('path');
        }
      }
    }
  });
  