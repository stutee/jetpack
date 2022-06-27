window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 3;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.groundMargin = 50;
      this.ceilingMargin = 50;

      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      //coins
      this.obstacles = [];
      this.obstacleTimer = 0;
      this.obstacleInterval = 3000; //in ms

      // coins
      this.coins = [];
      this.coinTimer = 0;
      this.coinInterval = 5000; //in ms

      this.debug = true;

      this.acquireCoin = 0;
      this.distanceCovered = 0;
      this.gameEnd = false;
    }
    update(deltaTime) {
      this.background.update();
      this.distanceCovered++;
      this.player.update(this.input.keys, deltaTime);

      // handle obstacles
      // obstacles appear after obstacleInterval
      if (this.obstacleTimer > this.obstacleInterval) {
        this.addObstacle();
        this.obstacleTimer = 0;
      } else {
        this.obstacleTimer += deltaTime;
      }

      // updating each obstacles
      this.obstacles.forEach((obstacle) => {
        obstacle.update(deltaTime);

        // remove the obstacle from the obstacles array
        // that are out from the view
        if (obstacle.markedForDeletion) {
          this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
        }
      });

      // handle coins
      // obstacles appear after obstacleInterval
      if (this.coinTimer > this.coinInterval) {
        this.addCoin();
        this.coinTimer = 0;
      } else {
        this.coinTimer += deltaTime;
      }

      // updating each obstacles
      this.coins.forEach((coin) => {
        coin.update(deltaTime);

        // remove the obstacle from the obstacles array
        // that are out from the view
        if (coin.markedForDeletion) {
          this.coins.splice(this.coins.indexOf(coin), 1);
        }
      });
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);

      // drawing each obstacles
      this.obstacles.forEach((obstacle) => {
        obstacle.draw(context);
      });

      // drawing each obstacles
      this.coins.forEach((coin) => {
        coin.draw(context);
      });

      this.UI.draw(context);
    }
    addCoin() {
      new CoinGenerator(this);
    }
    addObstacle() {
      let choices = [
        new Lighting1(this),
        new Lighting2(this),
        new Lighting3(this),
        new Lighting4(this),
        new Lighting5(this),
        new Lighting6(this),
        new Rocket(this),
      ];
      let choice = randomIntFromInterval(0, choices.length - 1);
      let choosen = choices[choice];

      this.obstacles.push(choosen);
      console.log(this.obstacles);
      choice = randomIntFromInterval(0, choices.length - 1);
      choosen = choices[choice];

      this.obstacles.push(choosen);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
