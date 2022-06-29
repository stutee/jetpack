function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromInterval(min, max) {
  // min and max included
  return (Math.random() * (max - min + 1) + min).toFixed(3);
}

function getMatrix(l, w) {
  return [...Array(l)].map((x) =>
    [...Array(w)].map((b) => Math.round(Math.random()))
  );
}

function isCollision(a, b) {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    return true;
  }
  return false;
}
