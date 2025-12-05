import { TETROMINOS } from "./tetrominos.js";

export function spawnNewPiece(type) {
  const matrix = TETROMINOS[type];
  return {
    type,
    rotation: 0,
    matrix,
    x: Math.floor((10 - matrix[0].length) / 2),
    y: 0,
  };
}
