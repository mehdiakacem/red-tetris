export default class Piece {
  constructor(type) {
    this.type = type;
    this.rotation = 0;
    this.position = { x: 3, y: 0 };
  }

  rotate(direction = 1) {
    this.rotation = (this.rotation + direction + 4) % 4;
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

  getBlocks() {
    const shape = SHAPES[this.type][this.rotation];
    return shape.map(([x, y]) => ({
      x: this.position.x + x,
      y: this.position.y + y,
    }));
  }

  clone() {
    const copy = new Piece(this.type);
    copy.rotation = this.rotation;
    copy.position = { ...this.position };
    return copy;
  }

  toData() {
    return {
      type: this.type,
      rotation: this.rotation,
      position: this.position,
    };
  }
}

const SHAPES = {
  I: [
    [[0,1],[1,1],[2,1],[3,1]],
    [[2,0],[2,1],[2,2],[2,3]],
    [[0,2],[1,2],[2,2],[3,2]],
    [[1,0],[1,1],[1,2],[1,3]],
  ],
  O: [
    [[1,0],[2,0],[1,1],[2,1]],
    [[1,0],[2,0],[1,1],[2,1]],
    [[1,0],[2,0],[1,1],[2,1]],
    [[1,0],[2,0],[1,1],[2,1]],
  ],
  T: [
    [[1,0],[0,1],[1,1],[2,1]],
    [[1,0],[1,1],[2,1],[1,2]],
    [[0,1],[1,1],[2,1],[1,2]],
    [[1,0],[0,1],[1,1],[1,2]],
  ],
  S: [
    [[1,0],[2,0],[0,1],[1,1]],
    [[1,0],[1,1],[2,1],[2,2]],
    [[1,1],[2,1],[0,2],[1,2]],
    [[0,0],[0,1],[1,1],[1,2]],
  ],
  Z: [
    [[0,0],[1,0],[1,1],[2,1]],
    [[2,0],[1,1],[2,1],[1,2]],
    [[0,1],[1,1],[1,2],[2,2]],
    [[1,0],[0,1],[1,1],[0,2]],
  ],
  J: [
    [[0,0],[0,1],[1,1],[2,1]],
    [[1,0],[2,0],[1,1],[1,2]],
    [[0,1],[1,1],[2,1],[2,2]],
    [[1,0],[1,1],[0,2],[1,2]],
  ],
  L: [
    [[2,0],[0,1],[1,1],[2,1]],
    [[1,0],[1,1],[1,2],[2,2]],
    [[0,1],[1,1],[2,1],[0,2]],
    [[0,0],[1,0],[1,1],[1,2]],
  ],
};

