import { isValidPosition } from './isValidPosition.js';

export function movePiece(piece, board, dx, dy) {
  const newX = piece.x + dx;
  const newY = piece.y + dy;

  if (isValidPosition(piece.matrix, board, newX, newY)) {
    return {
      ...piece,
      x: newX,
      y: newY,
    };
  }
  return piece; // no change if move is invalid
}
