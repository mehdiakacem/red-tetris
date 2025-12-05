import { mergePiece } from "./mergePiece.js";
import { movePiece } from "./movePiece.js";
import { spawnPiece } from "./spawnPiece.js";
import { clearLines } from "./clearLines.js";
import { isValidPosition } from "./isValidPosition.js";

export function gravityTick(board, piece, queue) {
  const moved = movePiece(piece, board, 0, 1);

  if (moved !== piece) {
    return {
      board,
      piece: moved,
      queue,
      locked: false,
      linesCleared: 0,
      rowsRemoved: [],
      gameOver: false,
    };
  }

  const boardAfterMerge = mergePiece(board, piece.matrix, piece.x, piece.y);

  const { newBoard, linesCleared, rowsRemoved } = clearLines(boardAfterMerge);

  const { nextPiece, nextQueue } = spawnPiece(queue);

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
