import { line, curveNatural } from 'd3-shape';
import { debounce } from '../utils/debounce';
import randomPoints from '../utils/randomPoints';

const canvases = document.querySelectorAll('.wave__canvas');
canvases.forEach((canvas) => {
  const ctx = canvas.getContext('2d');

  const scale = 1.5;
  ctx.scale(scale, scale);
  canvas.height = 300 * scale;

  const step = 180;
  let numOfPoints;

  const resizeCanvasWidth = (width) => {
    canvas.width = width * scale;
    numOfPoints = Math.round(canvas.width / step);
  };

  resizeCanvasWidth(window.innerWidth);

  let bluePoints = randomPoints(numOfPoints, canvas.width, canvas.height);

  const lineGenerator = line().context(ctx).curve(curveNatural);

  const draw = () => {
    ctx.strokeStyle = '#5d81ff';
    ctx.lineWidth = canvas.dataset.lineWidth;
    ctx.beginPath();
    lineGenerator(bluePoints);
    ctx.stroke();
  };

  let speed = 0;

  const updatePoints = () => {
    speed += 1;
    for (let i = 0; i <= numOfPoints; i++) {
      bluePoints[i][1] += Math.sin(speed * 0.01 + i) * 0.2;
    }
  };

  window.addEventListener(
    'resize',
    debounce(() => {
      if (Math.floor(window.innerWidth * scale) !== canvas.width) {
        resizeCanvasWidth(window.innerWidth);
        bluePoints = randomPoints(numOfPoints, canvas.width, canvas.height);
      }
    })
  );

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    updatePoints();
    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
});
