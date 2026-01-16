export default function isValidPosition(matrix, board, offsetX, offsetY) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 0) continue;

      const newX = x + offsetX;
      const newY = y + offsetY;

      // Out of bounds check
      if (newX < 0 || newX >= 10) return false;
      if (newY >= 20) return false;

      // Above the screen is allowed
      if (newY < 0) continue;

      // Collides with something
      if (board[newY][newX] !== 0) return false;
    }
  }
  return true;
}
