import { isValidPosition } from "./isValidPosition.js";
import { I_KICKS, JLSTZ_KICKS } from "./kicks.js";
import { rotateMatrix } from "./rotateMatrix.js";

export function rotatePiece(piece, board) {
  const { matrix, x, y, rotation, type } = piece;

  const newRotation = (rotation + 1) % 4;
  const rotated = rotateMatrix(matrix);

  const kicks =
    type === "I"
      ? I_KICKS[rotation][newRotation]
      : JLSTZ_KICKS[rotation][newRotation];

  for (const [dx, dy] of kicks) {
    const newX = x + dx;
    const newY = y + dy;

    if (isValidPosition(rotated, board, newX, newY)) {
      return {
        ...piece,
        matrix: rotated,
        rotation: newRotation,
        x: newX,
        y: newY,
      };
    }
  }

  return piece; // Return original piece if no valid rotation found
}
