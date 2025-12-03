export function isCollision(board, matrix, offsetX, offsetY) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== 0) {
        // Only check filled cells
        const boardX = x + offsetX;
        const boardY = y + offsetY;

        // Check if out of bounds
        if (
          boardY < 0 ||
          boardY >= board.length ||
          boardX < 0 ||
          boardX >= board[0].length
        ) {
          return true;
        }

        // Check collision with existing blocks
        if (board[boardY][boardX] !== 0) {
          return true;
        }
      }
    }
  }
  return false; // No collision
}
