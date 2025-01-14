export function getRandomColorNumber() {
  return Math.floor(Math.random() * 256);
}

export function getRandomColor() {
  return `rgb(${getRandomColorNumber()},${getRandomColorNumber()},${getRandomColorNumber()})`;
}
