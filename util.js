function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMatrix(l, w) {
  return [...Array(l)].map((x) =>
    [...Array(w)].map((b) => Math.round(Math.random()))
  );
}
