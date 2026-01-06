import { refillQueue } from "./generateBag";
import { spawnNewPiece } from "./spawnNewPiece";

export function spawnPiece(queue) {
  const nextQueue = refillQueue(queue);

  const type = nextQueue[0];
  const remainingQueue = nextQueue.slice(1);
  return {
    piece: spawnNewPiece(type),
    queue: remainingQueue,
  };
}
