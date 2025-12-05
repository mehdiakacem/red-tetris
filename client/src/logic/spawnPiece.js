export function spawnPiece(queue) {
  const [next, ...rest] = queue;

  const pieceWidth = next.matrix[0].length;
  const startX = Math.floor((10 - pieceWidth) / 2);

  return {
    piece: {
      matrix: next.matrix.map(row => row.slice()),
      x: startX,
      y: 0,
      rotation: 0,
      type: next.type,
    },
    queue: rest,
  };
}
