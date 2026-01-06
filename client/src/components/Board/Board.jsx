import "./Board.css";

const PIECE_COLORS = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
  0: "",
};

export default function Board({ board, activePiece }) {
  return (
    <div className="board">
      {board.map((row, y) =>
        row.map((cellType, x) => {
          return (
            <Cell
              key={`${x}-${y}`}
              color={
                isActiveCell(x, y, activePiece)
                  ? PIECE_COLORS[activePiece.type]
                  : PIECE_COLORS[cellType]
              }
            />
          );
        })
      )}
    </div>
  );
}

function Cell({ color }) {
  return <div className={`cell ${color}`} />;
}

function isActiveCell(x, y, piece) {
  if (!piece) return false;

  const localX = x - piece.x;
  const localY = y - piece.y;

  return Boolean(piece.matrix[localY]?.[localX]);
}
