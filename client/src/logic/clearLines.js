export function clearLines(board) {
  const width = board[0].length;
  const rowsRemoved = [];
  const remaining = [];
  for (let r = 0; r < board.length; r++) {
    const isFull = board[r].every((cell) => cell !== 0);
    if (isFull) rowsRemoved.push(r);
    else remaining.push(board[r]);
  }
  const newRows = Array.from({ length: rowsRemoved.length }, () =>
    Array(width).fill(0)
  );
  const newBoard = [...newRows, ...remaining];
  return {
    board: newBoard,
    linesCleared: rowsRemoved.length,
    rowsRemoved: rowsRemoved,
  };
}
