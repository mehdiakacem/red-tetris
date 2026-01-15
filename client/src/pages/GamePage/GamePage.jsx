import { useEffect, useState } from "react";
import Board from "../../components/Board/Board.jsx";
import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import Spectrums from "../../components/Spectrums/Spectrums.jsx";
import { socket } from "../../socket.js";
import { useParams } from "react-router";
import EmptyBoard from "../../components/EmptyBoard/EmptyBoard.jsx";
import StartButton from "../../components/StartButton/StartButton.jsx";
import WaitingForHost from "../../components/WaitingForHost/WaintingForHost.jsx";

function GamePage() {
  let { room, playerName } = useParams();
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);

  const isHost = socket.id === hostId;

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentPiece, setCurrentPiece] = useState(null);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("join-room", {
        room: room,
        playerName: playerName,
      });
    });

    socket.on("player-joined", ({ players, hostId }) => {
      setPlayers(players);
      setHostId(hostId);
    });

    socket.on("player-left", ({ id, hostId }) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== id)
      );
      setHostId(hostId);
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

    socket.on("current-piece", ({ piece }) => {
      console.log("Received current piece data:", piece);
      setCurrentPiece(piece);
    });

    return () => {
      socket.off("connect");
      socket.off("player-joined");
      socket.off("game-started");
      socket.off("next-piece");
      socket.off("current-piece");
      socket.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [room, playerName]);

  
  const handleStartClick = () => {
    socket.emit("start-game", { room });
  };

  return (
    <>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}
            {player.id === hostId && " (Host)"}
          </li>
        ))}
      </ul>
      {isGameStarted ? (
        <Board currentPiece={currentPiece} />
      ) : (
        <EmptyBoard>
          {isHost ? (
            <StartButton onClick={handleStartClick} />
          ) : (
            <WaitingForHost />
          )}
        </EmptyBoard>
      )}
      <Spectrums />
      {/* <NextPiece type={nextPieceType} /> */}
    </>
  );
}

export default GamePage;
