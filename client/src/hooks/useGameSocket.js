import { useEffect, useState } from "react";
import { socket } from "../socket";

export function useGameSocket({ room, playerName }) {
  const [opponents, setOpponents] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [game, setGame] = useState(null);
  const [isAlive, setIsAlive] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("join-room", { room, playerName });
    });

    socket.on("player-joined", ({ players, hostId }) => {
      setOpponents(players.filter((p) => p.id !== socket.id));
      setHostId(hostId);
    });

    socket.on("player-left", ({ id, hostId }) => {
      setOpponents((prev) => prev.filter((p) => p.id !== id));
      setHostId(hostId);
    });

    socket.on("game-started", ({ game }) => {
      setGame(game);
      setIsGameStarted(true);
      setIsGameEnded(false);
      setIsAlive(true);
    });

    socket.on("game-tick", ({ game }) => {
      setGame(game);
      const me = game.players.find((p) => p.id === socket.id);
      if (me && !me.alive) setIsAlive(false);
      setOpponents(game.players.filter((p) => p.id !== socket.id));
    });

    socket.on("game-over", ({ game }) => {
      setGame(game);
      setIsGameEnded(true);
    });

    return () => {
        socket.disconnect()
        socket.removeAllListeners();
    }
  }, [room, playerName]);
  return {
    socket,
    game,
    opponents,
    hostId,
    isAlive,
    isGameEnded,
    isGameStarted,
  };
}
