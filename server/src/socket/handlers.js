export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", ({ room, playerName }) => {
      socket.join(room);
      console.log(`${playerName} joined ${room}`);
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
      console.log("Client disconnected:", socket.id);
    });
  });
}
