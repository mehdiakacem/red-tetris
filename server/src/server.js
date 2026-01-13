import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // later restrict this
  },
});

// Serve static files (client bundle later)
app.use(express.static("public"));

export { app, server, io };
