import Piece from './Piece.js';

export default class Player {
  constructor(socketId, name) {
    this.id = socketId;
    this.name = name;
    this.alive = true;

    this.board = this.createEmptyBoard();
    this.currentPiece = null;
    this.queue = [];

    this.pendingPenaltyLines = 0;
    this.spectrum = Array(10).fill(0);
  }

  spawnPiece(type) {
    this.queue.push(type)
    if (!this.currentPiece)
      this.currentPiece = new Piece(this.queue.shift());
  }

  clearPiece() {
    this.currentPiece = null;
  }

  createEmptyBoard() {
    return Array.from({ length: 20 }, () => Array(10).fill(0));
  }

  setBoard(newBoard) {
    this.board = newBoard;
    this.updateSpectrum();
  }

  updateSpectrum() {
    const heights = Array(10).fill(0);
    for (let col = 0; col < 10; col++) {
      for (let row = 0; row < 20; row++) {
        if (this.board[row][col] !== 0) {
          heights[col] = 20 - row;
          break;
        }
      }
    }
    this.spectrum = heights;
  }

  getSpectrum() {
    return this.spectrum;
  }

  addPenaltyLines(count) {
    this.pendingPenaltyLines += count;
  }

  consumePenaltyLines() {
    const lines = this.pendingPenaltyLines;
    this.pendingPenaltyLines = 0;
    return lines;
  }

  kill() {
    this.alive = false;
  }

  isAlive() {
    return this.alive;
  }

  toPublicData() {
    return {
      id: this.id,
      name: this.name,
      alive: this.alive,
      board: this.board,
      currentPiece: this.currentPiece?.toData(),
      spectrum: this.spectrum,
    };
  }
}
