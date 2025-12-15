import Board from "./Board/Board";
import { useState } from "react";
import { createBoard } from "../logic/createBoard";
import { spawnNewPiece } from "../logic/spawnNewPiece";

function Game() {
  const [board, ] = useState(createBoard());
  const [activePiece, ] = useState(spawnNewPiece("T"));
  return (
    <div>
      <Board board={board} activePiece={activePiece} />
    </div>
  );
}
export default Game;

