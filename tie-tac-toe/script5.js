document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  let cells = Array.from(document.querySelectorAll('.cell'));
  let currentPlayer = 'X';
  let gameActive = true;
  let boardState = Array(9).fill(null);

  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (boardState[clickedCellIndex] !== null || !gameActive) return;

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkForWinner()) {
      message.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
    } else if (isBoardFull()) {
      message.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function checkForWinner() {
    return winningPatterns.some(pattern => {
      return pattern.every(index => {
        return boardState[index] === currentPlayer;
      });
    });
  }

  function isBoardFull() {
    return boardState.every(cell => cell !== null);
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
});
