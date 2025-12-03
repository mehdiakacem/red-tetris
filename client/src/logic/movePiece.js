import { isValidPosition } from './isValidPosition.js';

export function movePiece(piece, board, direction) {
  const newX = piece.x + direction;

  if (isValidPosition(piece.matrix, board, newX, piece.y)) {
    return {
      ...piece,
      x: newX,
    };
  }
  return piece; // no change if move is invalid
}
