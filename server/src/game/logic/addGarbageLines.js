export function addGarbageLines(board, count) {
  let newBoard = board.map((row) => [...row]);

  for (let i = 0; i < count; i++) {
    newBoard.shift();

    newBoard.push(Array(10).fill("X"));
  }

  return newBoard;
}
