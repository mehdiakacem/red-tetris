const PIECES = ["I", "O", "T", "S", "Z", "J", "L"];

export function generateBag() {
  const bag = [...PIECES];

  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }

  return bag;
}

export function refillQueue(queue, min = 7) {
  if (queue.length >= min) return queue;
  return [...queue, ...generateBag()];
}
