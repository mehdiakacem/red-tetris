import { isValidPosition } from "./isValidPosition.js";

export function softDrop(piece, board) {
  const newY = piece.y + 1;

  if (isValidPosition(piece.matrix, board, piece.x, newY)) {
    return {
      ...piece,
      y: newY,
    };
  }
  return piece; // no change if soft drop is invalid
}
