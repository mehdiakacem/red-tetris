export default function lockPiece(board, piece) {
  const {
    position: { x: ox, y: oy },
    type: value,
  } = piece;
  const newBoard = board.map((row) => row.slice());

  for (let y = 0; y < piece.matrix.length; y++) {
    for (let x = 0; x < piece.matrix[y].length; x++) {
      if (piece.matrix[y][x] !== 0) {
        const bx = ox + x;
        const by = oy + y;
        newBoard[by][bx] = value;
      }
    }
  }

  return newBoard;
}
