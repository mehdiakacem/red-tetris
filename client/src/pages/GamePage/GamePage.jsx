import { useEffect } from "react";
import Board from "../../components/Board/Board.jsx";
import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import Spectrums from "../../components/Spectrums/Spectrums.jsx";
import { socket } from "../../socket.js";
import { useParams } from "react-router";

function GamePage() {
  let { room, playerName } = useParams();
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      socket.emit("join-room", {
        room: room,
        playerName: playerName,
      });
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

    return () => {
      socket.off("connect");
      socket.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [room, playerName]);
  return (
    <>
      <Spectrums />
      <Board />
      <NextPiece />
    </>
  );
}

export default GamePage;
