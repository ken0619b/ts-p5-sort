import * as p5 from "p5";

const sketch = (p: p5) => {
  let w = 4;
  let values = [];
  let states = [];

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(1000, 800);
    values = new Array(p.floor(p.windowWidth / w));
    for (let j = 0; j < values.length; j++) {
      values[j] = p.random(500);
    }
    p.background(51);
    // start sorting
    quickSort(values, 0, values.length - 1);
  };

  p.draw = () => {
    p.background(200);
    for (let j = 0; j < values.length; j++) {
      p.stroke(0);
      p.fill(100); // 効いていない？
      p.rect(j * w, 800 - values[j], 0.6, values[j]);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

const sketchP = new p5(sketch);

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  let index = await partition(arr, start, end);

  // 同時に実行する
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr: Array<number>, start: number, end: number) {
  let pivotIndex = start;
  let pivotValue = arr[end];

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(arr, pivotIndex, end);

  return pivotIndex;
}

async function swap(arr, a: number, b: number) {
  await sleep(20);
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
