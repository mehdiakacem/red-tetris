export default class Player {
  constructor(socketId, name) {
    this.id = socketId;
    this.name = name;
    this.alive = true;
    this.board = this.createEmptyBoard();
    this.pendingPenaltyLines = 0;
    this.spectrum = Array(10).fill(0);
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
      spectrum: this.spectrum,
    };
  }
}
