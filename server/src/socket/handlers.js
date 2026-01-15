import GameManager from "../game/GameManager.js";
import Player from "../game/Player.js";

const gameManager = new GameManager();

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    let currentRoom = null;

    socket.on("join-room", ({ room, playerName }) => {
      socket.join(room);
      currentRoom = room;

      const game = gameManager.getOrCreateGame(room);
      const player = new Player(socket.id, playerName);

      game.addPlayer(player);

      const players = game
        .getPublicState()
        .players.map((p) => ({ id: p.id, name: p.name }));

      io.to(room).emit("player-joined", {
        players,
        hostId: game.hostId,
      });
    });

    socket.on("start-game", () => {
      const game = gameManager.getGame(currentRoom);
      if (!game) return;
      
      const started = game.startGame(socket.id);
      if (!started) return;

      io.to(currentRoom).emit("game-started", { game: game.getPublicState() });
    });

    socket.on("player-input", ({ action }) => {
      console.log(`Received action from ${socket.id}: ${action}`);
      // Here you would handle the game logic based on player input
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
