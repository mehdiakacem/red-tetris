export function computeSpectrum(board) {
  const width = board[0].length;
  const height = board.length;
  const spectrum = Array(width).fill(0);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (board[y][x] !== 0) {
        spectrum[x] = height - y;
        break;
      }
    }
  }

  return spectrum;
}
