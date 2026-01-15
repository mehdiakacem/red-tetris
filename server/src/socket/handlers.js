import GameManager from "../game/GameManager.js";
import Player from "../game/Player.js";

const gameManager = new GameManager();

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    socket.on("join-room", ({ room, playerName }) => {
      socket.join(room);

      const game = gameManager.getOrCreateGame(room);
      const player = new Player(socket.id, playerName);

      game.addPlayer(player);

      const players = game
        .getPublicState()
        .players.map((p) => ({ id: p.id, name: p.name }));
      console.log(players);

      io.to(room).emit("player-joined", {
        players,
        hostId: game.hostId,
      });
    });

    socket.on("player-input", ({ action }) => {
      console.log(`Received action from ${socket.id}: ${action}`);
      // Here you would handle the game logic based on player input
    });

    socket.on("start-game", ({ room }) => {
      console.log(`Starting game in room: ${room}`);
      io.to(room).emit("game-started");
      io.to(room).emit("next-piece", { nextPieceType: "I" });
      io.to(room).emit("current-piece", { piece: { type: "T" } });
    });

    socket.on("disconnect", () => {
      for (const game of gameManager.getAllGames()) {
        if (game.players.has(socket.id)) {
          game.removePlayer(socket.id);

          io.to(game.room).emit("player-left", {
            id: socket.id,
            hostId: game.hostId,
          });

          if (game.isEmpty()) {
            gameManager.removeGame(game.room);
          }
        }
      }
    });
  });
}
