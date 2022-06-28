class Coin {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;

    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 7;
    this.width = Math.floor(320 / (this.maxFrame + 1));
    this.height = 40;
    this.x;
    this.y;

    this.image = document.getElementById("coins");

    this.audio = document.getElementById("coin-audio");
  }

  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class PowerUpOne extends Coin {
  constructor(game) {
    super(game);
    this.game = game;
    this.name = "CoinBooster";
    this.maxFrame = 2;
    this.width = Math.floor(213 / (this.maxFrame + 1));
    this.height = 81;

    this.x = this.game.width;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height - this.game.groundMargin - this.height
    );

    this.image = document.getElementById("power-up-1");
  }
}

class PowerUpTwo extends Coin {
  constructor(game) {
    super(game);
    this.game = game;
    this.name = "DistanceBooster";
    this.maxFrame = 3;
    this.width = Math.floor(232 / (this.maxFrame + 1));
    this.height = 50;

    this.x = this.game.width;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height - this.game.groundMargin - this.height
    );

    this.image = document.getElementById("power-up-2");
  }
}

class CoinGenerator {
  constructor(game) {
    this.game = game;
    this.coin = new Coin(this.game);

    this.row = randomIntFromInterval(0, 5);
    this.column = randomIntFromInterval(0, 10);
    this.pattern = getMatrix(this.row, this.column);

    this.generate();
  }
  patternToXYPostion() {
    this.x = this.game.width;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height - this.game.groundMargin - this.coin.height * this.row
    );
    let patternPosition = [];
    this.pattern.forEach((row, rIndex) => {
      row.forEach((column, cIndex) => {
        if (column === 1) {
          patternPosition.push({
            x: cIndex * this.coin.width + this.x,
            y: rIndex * this.coin.height + this.y,
          });
        }
      });
    });
    return patternPosition;
  }
  generate() {
    this.patternPositionXY = this.patternToXYPostion();
    this.patternPositionXY.forEach((coinPosition) => {
      let coin = new Coin(this.game);
      coin.x = coinPosition.x;
      coin.y = coinPosition.y;
      this.game.coins.push(coin);
    });
  }
}
