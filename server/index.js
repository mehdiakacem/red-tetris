import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"],
  },
});

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

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
