import { clearLines } from "./clearLines.js";
import { isValidPosition } from "./isValidPosition.js";
import { mergePiece } from "./mergePiece.js";
import { spawnPiece } from "./spawnPiece.js";

/**
 * board: current board (20x10)
 * piece: { matrix, x, y } where x,y is current top-left location
 *
 * Returns an object with newBoard, placedPiece (with final x,y), linesCleared, rows.
 */
export function hardDrop(piece, board, queue) {
  const { matrix, x: startX } = piece;
  let y = piece.y;

  // Move down until next position is invalid, then back up one
  while (isValidPosition(matrix, board, startX, y + 1)) {
    y++;
  }

  // Now y is the lowest valid row for the piece
  const placedPiece = { ...piece, x: startX, y };

  // Merge piece into new board
  const boardAfterMerge = mergePiece(
    board,
    matrix,
    placedPiece.x,
    placedPiece.y,
    placedPiece.type
  );

  const {
    board: newBoard,
    linesCleared,
    rowsRemoved,
  } = clearLines(boardAfterMerge);

  const { piece: nextPiece, queue: nextQueue } = spawnPiece(queue);

  const gameOver = !isValidPosition(
    nextPiece.matrix,
    newBoard,
    nextPiece.x,
    nextPiece.y
  );

  return {
    board: newBoard,
    piece: nextPiece,
    queue: nextQueue,
    locked: true,
    linesCleared,
    rowsRemoved,
    gameOver,
  };
}
