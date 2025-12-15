import "./Board.css";
import { PIECE_COLORS } from "../../logic/pieceColors.js";

export default function Board({ board, activePiece }) {
  return (
    <div className="board">
      {board.map((row, y) =>
        row.map((cell, x) => {
          const cellValue =
            cell || (isActiveCell(x, y, activePiece) ? activePiece.type : null);

          const colorClass = cellValue ? PIECE_COLORS[cellValue] : "";

          return <div key={`${y}-${x}`} className={`cell ${colorClass}`} />;
        })
      )}
    </div>
  );
}

function isActiveCell(x, y, piece) {
  if (!piece) return false;

  const localX = x - piece.x;
  const localY = y - piece.y;

  return Boolean(piece.matrix[localY]?.[localX]);
}
