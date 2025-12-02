import { PIECE_TYPES, TETROMINOS } from "./tetrominos.js";

export function spawnNewPiece() {
  const randomType =
    PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  const shape = TETROMINOS[randomType];

  return {
    type: randomType,
    rotation: 0,
    shape,
    x: Math.floor(10 / 2) - Math.floor(shape[0].length / 2),
    y: 0,
  };
}
