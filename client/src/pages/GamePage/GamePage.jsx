import { useEffect, useState } from "react";
import Board from "../../components/Board/Board.jsx";
import NextPiece from "../../components/NextPiece/NextPiece.jsx";
import Opponents from "../../components/Opponents/Opponents.jsx";
import { socket } from "../../socket.js";
import { useParams } from "react-router";
import EmptyBoard from "../../components/EmptyBoard/EmptyBoard.jsx";
import StartButton from "../../components/StartButton/StartButton.jsx";
import WaitingForHost from "../../components/WaitingForHost/WaintingForHost.jsx";

function GamePage() {
  let { room, playerName } = useParams();
  const [opponents, setOpponents] = useState([]);
  const [hostId, setHostId] = useState(null);

  const isHost = socket.id === hostId;
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [board, setBoard] = useState(null);
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
      setOpponents(players.filter((player) => player.id !== socket.id));
      setHostId(hostId);
    });

    socket.on("player-left", ({ id, hostId }) => {
      setOpponents((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== id)
      );
      setHostId(hostId);
    });

    socket.on("game-started", ({ game }) => {
      setIsGameStarted(game.started);
      const player = game.players.find((p) => p.id === socket.id);
      setBoard(player.board);
      setCurrentPiece(player.currentPiece);
    });

    socket.on("game-tick", ({ game }) => {
      const player = game.players.find((p) => p.id === socket.id);
      if (player) {
        setBoard(player.board);
        setCurrentPiece(player.currentPiece);
        setOpponents(game.players.filter((player) => player.id !== socket.id));
      }
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
          emitInput("left");
          break;
        case "ArrowRight":
          emitInput("right");
          break;
        case "ArrowUp":
          emitInput("rotate");
          break;
        case "ArrowDown":
          emitInput("down");
          break;
        case "Space":
          emitInput("hardDrop");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      socket.off("connect");
      socket.off("player-joined");
      socket.off("player-left");
      socket.off("game-started");
      socket.off("game-tick");
      socket.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [room, playerName]);

  const handleStartClick = () => {
    socket.emit("start-game");
  };

  return (
    <>
      <div>
        <span>{playerName}</span>
        {isHost && " (Host)"}
        {isGameStarted ? (
          <Board board={board} activePiece={currentPiece} />
        ) : (
          <EmptyBoard>
            {isHost ? (
              <StartButton onClick={handleStartClick} />
            ) : (
              <WaitingForHost />
            )}
          </EmptyBoard>
        )}
      </div>
      <Opponents opponents={opponents} hostId={hostId} />
      {/* <NextPiece type={nextPieceType} /> */}
    </>
  );
}

export default GamePage;
