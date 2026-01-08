import { useEffect, useState } from "react";
import { createBoard } from "../logic/createBoard";
import { generateBag } from "../logic/generateBag";
import { gravityTick } from "../logic/gravityTick";
import { hardDrop } from "../logic/hardDrop";
import { movePiece } from "../logic/movePiece";
import { rotatePiece } from "../logic/rotatePiece";
import { softDrop } from "../logic/softDrop";
import { spawnPiece } from "../logic/spawnPiece";
import Board from "./Board/Board";
import NextPiece from "./NextPiece/NextPiece";
import "./Game.css";

function Game() {
  const [game, setGame] = useState(() => {
    const { piece: newPiece, queue: newQueue } = spawnPiece(generateBag());
    return {
      board: createBoard(),
      piece: newPiece,
      queue: newQueue,
      gameOver: false,
    };
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          setGame((prev) => ({
            ...prev,
            piece: movePiece(prev.piece, prev.board, -1, 0),
          }));
          break;
        case "ArrowRight":
          setGame((prev) => ({
            ...prev,
            piece: movePiece(prev.piece, prev.board, 1, 0),
          }));
          break;
        case "ArrowUp":
          setGame((prev) => ({
            ...prev,
            piece: rotatePiece(prev.piece, prev.board),
          }));
          break;
        case "ArrowDown":
          setGame((prev) => ({
            ...prev,
            piece: softDrop(prev.piece, prev.board),
          }));
          break;
        case " ":
          setGame((prev) => hardDrop(prev.piece, prev.board, prev.queue));
          break;
        default:
          break;
      }
    };
    if (game.gameOver) return;
    window.addEventListener("keydown", handleKeyDown);
    const intervalId = setInterval(() => {
      setGame((prev) => gravityTick(prev.board, prev.piece, prev.queue));
    }, 700);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [game.gameOver]);

  const nextPieceType = game.queue[0];

  return (
    <main className="game-container">
      <div className="spectrums-container">
        <h3>Spectrums</h3>
      </div>
      <Board board={null} activePiece={null} />
      <NextPiece nextPieceType={nextPieceType} />

    </main>
  );
}

export default Game;
