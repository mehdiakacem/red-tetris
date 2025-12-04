import { clearLines } from "./clearLines.js";
import { isValidPosition } from "./isValidPosition.js";
import { mergePiece } from "./mergePiece.js";

/**
 * board: current board (20x10)
 * piece: { matrix, x, y } where x,y is current top-left location
 *
 * Returns an object with newBoard, placedPiece (with final x,y), linesCleared, rows.
 */
export function hardDrop(piece, board) {
  const { matrix, x: startX } = piece;
  let y = piece.y;

  // Move down until next position is invalid, then back up one
  while (isValidPosition(matrix, board, startX, y + 1)) {
    y++;
  }

  // Now y is the lowest valid row for the piece
  const placedPiece = { ...piece, x: startX, y };

  // Merge piece into new board
  const merged = mergePiece(board, matrix, placedPiece.x, placedPiece.y, 1);

  const {
    board: boardAfterClear,
    linesCleared,
    rowsRemoved,
  } = clearLines(merged);

  return {
    board: boardAfterClear,
    placedPiece,
    linesCleared,
    rows: rowsRemoved,
  };
}
