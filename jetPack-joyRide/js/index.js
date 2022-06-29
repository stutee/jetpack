// initiating game when window load

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  var game = new Game(canvas.width, canvas.height);

  let image = document.getElementById("initial-background");

  ctx.drawImage(image, 0, 0, game.width, game.height);

  canvas.addEventListener("click", function () {
    ctx.fillRect(0, 0, game.width, game.height);
    ctx.drawImage(image, 0, 0, game.width, game.height);
    if (game.gameStart) {
      game.gameStart = false;
      animate(0);
    }
    if (game.gameOver) {
      game = new Game(canvas.width, canvas.height);
    }
  });

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    let animation = requestAnimationFrame(animate);

    if (game.gameOver) cancelAnimationFrame(animation);
  }
});
