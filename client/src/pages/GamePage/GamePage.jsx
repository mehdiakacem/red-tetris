import { useEffect, useState } from "react";
import Board from "../../components/Board/Board.jsx";
import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import Spectrums from "../../components/Spectrums/Spectrums.jsx";
import { socket } from "../../socket.js";
import { useParams } from "react-router";
import EmptyBoard from "../../components/EmptyBoard/EmptyBoard.jsx";
import StartButton from "../../components/StartButton/StartButton.jsx";

function GamePage() {
  let { room, playerName } = useParams();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPieceType, setNextPieceType] = useState(null);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      socket.emit("join-room", {
        room: room,
        playerName: playerName,
      });
    });

    socket.on("player-joined", ({ playerName }) => {
      console.log(`${playerName} has joined the room.`);
    });

    const emitInput = (action) => {
      socket.emit("player-input", {
        action,
        timestamp: Date.now(),
      });
    };

    const handleKeyDown = (e) => {
      if (e.repeat) return; // prevent key hold spam

      switch (e.code) {
        case "ArrowLeft":
          emitInput("MOVE_LEFT");
          break;
        case "ArrowRight":
          emitInput("MOVE_RIGHT");
          break;
        case "ArrowUp":
          emitInput("ROTATE");
          break;
        case "ArrowDown":
          emitInput("SOFT_DROP");
          break;
        case "Space":
          emitInput("HARD_DROP");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    socket.on("game-started", () => {
      console.log("Game started!");
      // Here you would typically set some state to indicate the game has started
      setIsGameStarted(true);
    });

    socket.on("next-piece", ({ nextPieceType }) => {
      console.log("Received piece data:", nextPieceType);
      setNextPieceType(nextPieceType);
      // Handle incoming piece data
    });

    socket.on("current-piece", ({ piece }) => {
      console.log("Received current piece data:", piece);
      setCurrentPiece(piece);
    });

    return () => {
      socket.off("connect");
      socket.off("game-started");
      socket.off("next-piece");
      socket.off("current-piece");
      socket.off("player-joined");
      socket.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [room, playerName]);

  const handleStartClick = () => {
    socket.emit("start-game", { room });
  };

  return (
    <>
      <Spectrums />
      {isGameStarted ? (
        <Board currentPiece={currentPiece} />
      ) : (
        <EmptyBoard>
          <StartButton onClick={handleStartClick} />
        </EmptyBoard>
      )}
      <NextPiece type={nextPieceType} />
    </>
  );
}

export default GamePage;
