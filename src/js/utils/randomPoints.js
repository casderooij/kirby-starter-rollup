import { randomRange } from './random';

export default (
  numOfPoints,
  width,
  height,
  padding = 0,
  min = 0.3,
  max = 0.7
) => {
  const step = Math.round((width - padding / 2) / numOfPoints);
  const array = [];
  const start = padding > 0 ? 0 : -1;
  const extraPoints = padding > 0 ? -1 : 2;
  for (let i = start; i <= numOfPoints + extraPoints; i++) {
    array.push([
      Math.floor(i * step + 50),
      Math.floor(randomRange(min, max) * height),
    ]);
  }
  return array;
};
