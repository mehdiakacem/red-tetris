import { useState } from "react";
import "./Board.css";
import { Link } from "react-router";

export default function Board({ board, activePiece }) {
  const [playerName, setPlayerName] = useState("");
  const [room, setRoom] = useState("");
  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };
  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  if (!board) {
    return (
      <div className="board">
        <form onSubmit={(e) => e.preventDefault()} className="start-form">
          <input
            onChange={handlePlayerNameChange}
            type="text"
            placeholder="Enter player name"
            value={playerName}
          />
          <input
            onChange={handleRoomChange}
            type="text"
            placeholder="Enter room name"
            value={room}
          />
          <Link
            to={`${room}/${playerName}`}
            style={
              playerName.trim() === "" || room.trim() === ""
                ? { cursor: "not-allowed", backgroundColor: "darkgreen" }
                : { cursor: "pointer" }
            }
          >
            JOIN
          </Link>
        </form>
      </div>
    );
  }

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
  return (
    <div className="board">
      {board.map((row, y) =>
        row.map((cellType, x) => (
          <Cell
            key={`${x}-${y}`}
            color={
              isActiveCell(x, y, activePiece)
                ? PIECE_COLORS[activePiece.type]
                : PIECE_COLORS[cellType]
            }
          />
        ))
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
