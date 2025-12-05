export function mergePiece(board, pieceMatrix, ox, oy, value = 1) {
  const newBoard = board.map((row) => row.slice());

  for (let y = 0; y < pieceMatrix.length; y++) {
    for (let x = 0; x < pieceMatrix[y].length; x++) {
      if (pieceMatrix[y][x] !== 0) {
        const bx = ox + x;
        const by = oy + y;
        newBoard[by][bx] = value;
      }
    }
  }

  return newBoard;
}
