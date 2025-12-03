import { PIECE_TYPES, TETROMINOS } from "./tetrominos.js";

export function spawnNewPiece() {
  const randomType =
    PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  const matrix = TETROMINOS[randomType];

  return {
    type: randomType,
    rotation: 0,
    matrix,
    x: Math.floor(10 / 2) - Math.floor(matrix[0].length / 2),
    y: 0,
  };
}
