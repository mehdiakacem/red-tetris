import rotateMatrix from "./logic/rotateMatrix.js";

export default class Piece {
  constructor(type) {
    this.type = type;
    this.rotation = 0;
    this.matrix = TETROMINOS[type];
    this.position = { x: 3, y: 0 };
  }

  rotate(direction = 1) {
    this.rotation = (this.rotation + direction + 4) % 4;
    this.matrix = rotateMatrix(this.matrix);
  }

  setRotation(rotation) {
    this.rotation = rotation % 4;
  }

  move(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  // getBlocks() {
  //   const shape = SHAPES[this.type][this.rotation];
  //   return shape.map(([x, y]) => ({
  //     x: this.position.x + x,
  //     y: this.position.y + y,
  //   }));
  // }

  clone() {
    const copy = new Piece(this.type);
    copy.rotation = this.rotation;
    copy.position = { ...this.position };
    copy.matrix = this.matrix.map(row => [...row]);
    return copy;
  }

  toData() {
    return {
      type: this.type,
      rotation: this.rotation,
      position: this.position,
      matrix: this.matrix,
    };
  }
}

const TETROMINOS = {
  I: [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
  ],
  O: [
    [1,1],
    [1,1],
  ],
  T: [
    [0,1,0],
    [1,1,1],
    [0,0,0],
  ],
  S: [
    [0,1,1],
    [1,1,0],
    [0,0,0],
  ],
  Z: [
    [1,1,0],
    [0,1,1],
    [0,0,0],
  ],
  J: [
    [1,0,0],
    [1,1,1],
    [0,0,0],
  ],
  L: [
    [0,0,1],
    [1,1,1],
    [0,0,0],
  ],
};

