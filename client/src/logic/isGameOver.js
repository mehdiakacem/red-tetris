export function isGameOver(board, piece) {
  const { matrix, x: startX, y: startY } = piece;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] !== 0) {
        const boardX = startX + col;
        const boardY = startY + row;

        if (boardY < 0 || (board[boardY] && board[boardY][boardX] !== 0)) {
          return true;
        }
      }
    }
  }

  return false;
}
