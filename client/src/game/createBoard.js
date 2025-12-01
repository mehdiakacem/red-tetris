const createBoard = () => Array.from({ length: 20 }, () => Array(10).fill(0));

let board = createBoard();
console.table(board);
