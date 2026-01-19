import Piece from "./Piece.js";
import isValidPosition from "./logic/isValidPosition.js";
import lockPiece from "./logic/lockPiece.js";

const PIECE_TYPES = ["I", "O", "T", "S", "Z", "J", "L"];

export default class Game {
  constructor(room) {
    this.room = room;

    this.players = new Map();
    this.hostId = null;

    this.started = false;
    this.ended = false;

    this.bag = [];
    this.bagIndex = 0;
  }

  handleInput(playerId, action) {
    const player = this.players.get(playerId);
    if (!player || !player.alive) return;

    const piece = player.currentPiece;
    if (!piece) return;

    const test = piece.clone();

    switch (action) {
      case "left":
        test.move(-1, 0);
        break;
      case "right":
        test.move(1, 0);
        break;
      case "rotate":
        test.rotate(1);
        break;
      case "down":
        test.move(0, 1);
        break;
      // case hardDrob
    }

    if (
      isValidPosition(
        test.matrix,
        player.board,
        test.position.x,
        test.position.y
      )
    ) {
      piece.position = test.position;
      piece.rotation = test.rotation;
      piece.matrix = test.matrix;
    }
  }

  tick() {
    if (!this.started || this.ended) return;

    this.players.forEach((player) => {
      if (!player.alive || !player.currentPiece) return;

      const test = player.currentPiece.clone();
      test.move(0, 1);

      if (
        isValidPosition(
          test.matrix,
          player.board,
          test.position.x,
          test.position.y
        )
      ) {
        player.currentPiece.move(0, 1);
      } else {
        this.lockCurrentPiece(player);
      }
    });
  }

  lockCurrentPiece(player) {
    player.board = lockPiece(player.board, player.currentPiece);

    // clear lines

    player.clearPiece();
    this.spawnPieceForAll();
  }

  addPlayer(player) {
    if (this.started) return;

    if (this.players.size === 0) {
      this.hostId = player.id;
    }

    this.players.set(player.id, player);
  }

  removePlayer(socketId) {
    this.players.delete(socketId);

    if (this.hostId === socketId) {
      const nextHost = this.players.values().next().value;
      this.hostId = nextHost ? nextHost.id : null;
    }
  }

  isEmpty() {
    return this.players.size === 0;
  }

  startGame(requesterId) {
    if (requesterId !== this.hostId) return false;
    if (this.started) return false;

    this.started = true;
    this.ended = false;

    this.resetPlayers();
    this.resetBag();
    this.spawnPieceForAll();

    return true;
  }

  endedGame() {
    this.started = false;
    this.ended = true;
  }

  resetPlayers() {
    this.players.forEach((player) => {
      player.alive = true;
      player.board = player.createEmptyBoard();
      player.pendingPenaltyLines = 0;
    });
  }

  resetBag() {
    this.bag = shuffle([...PIECE_TYPES]);
    this.bagIndex = 0;
  }

  getNextPiece() {
    if (this.bagIndex >= this.bag.length) {
      this.bag = shuffle([...PIECE_TYPES]);
      this.bagIndex = 0;
    }

    return this.bag[this.bagIndex++];
  }

  spawnPieceForAll() {
    const type = this.getNextPiece();
    this.players.forEach((player) => {
      if (player.alive) {
        player.spawnPiece(type);
      }
    });
    return {
      type,
      rotation: 0,
      position: { x: 3, y: 0 },
    };
  }

  handleLineClear(clearingPlayerId, linesCleared) {
    if (linesCleared <= 0) return;

    const penalty = linesCleared - 1;

    if (penalty <= 0) return;

    this.players.forEach((player, id) => {
      if (id !== clearingPlayerId && player.alive) {
        player.addPenaltyLines(penalty);
      }
    });
  }

  killPlayer(playerId) {
    const player = this.players.get(playerId);
    if (!player) return;

    player.kill();

    const alivePlayers = [...this.players.values()].filter((p) => p.alive);

    if (alivePlayers.length <= 1) {
      this.endedGame();
    }
  }

  getPublicState() {
    return {
      room: this.room,
      started: this.started,
      ended: this.ended,
      hostId: this.hostId,
      players: [...this.players.values()].map((p) => p.toPublicData()),
    };
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
