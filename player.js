class Player {
  constructor(game) {
    this.game = game;

    this.width = 85; //player
    this.height = 80;
    this.x = 0; //player x pos starting
    this.y = this.game.height - this.height - this.game.groundMargin; //ground walk maintained
    this.vy = 0; //velocity vertical
    this.gravity = 0.5;
    this.image = document.getElementById("player");
    this.frameX = 0; //sprite 4 column 0 is first
    this.frameY = 0; //sprite 4 row 0
    this.maxFrame; // for animation here 4
    this.fps = 15; // 4 frame 1s 15 frame
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0; //time maintained

    this.states = [
      new Standing(this),
      new Running(this),
      new Flying(this),
      new Falling(this),
      new ZAP(this),
      new BURNED(this),
      new DEAD(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);

    //vertical movement

    if (input.includes("ArrowUp")) {
      if (this.y <= this.game.ceilingMargin) this.vy = 0;
      else this.vy -= 1.25;
    }

    this.y += this.vy;
    if (!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;

    if (this.y < this.game.ceilingMargin) this.y = this.game.ceilingMargin; //ceiling condn remains on ceiling

    // sprite animation

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  checkCollision() {
    // // for lighting
    if (this.game.boost.enable) return;
    this.game.obstacles.forEach((obstacle) => {
      if (
        obstacle.x < this.x + this.width &&
        obstacle.x + obstacle.width > this.x &&
        obstacle.y < this.y + this.height &&
        obstacle.y + obstacle.height > this.y
      ) {
        // collision detected
        obstacle.markedForDeletion = true;
        this.game.gameOver = true;
        this.game.storage.totalCoin = this.game.acquireCoin;
        this.game.storage.highestDistance = this.game.distanceCovered;
        if (obstacle.name === "Rocket") {
          this.setState(5);
          obstacle.audioExplosion.play();
        } else {
          this.setState(4);
          obstacle.audio.play();
        }
      }
    });

    // for coins
    this.game.coins.forEach((coin) => {
      if (
        coin.x < this.x + this.width &&
        coin.x + coin.width > this.x &&
        coin.y < this.y + this.height &&
        coin.y + coin.height > this.y
      ) {
        // collision detected
        coin.markedForDeletion = true;
        this.game.acquireCoin++;
        coin.audio.play();
      }
    });

    // for powerUps
    this.game.powerUps.forEach((powerUp) => {
      if (
        powerUp.x < this.x + this.width &&
        powerUp.x + powerUp.width > this.x &&
        powerUp.y < this.y + this.height &&
        powerUp.y + powerUp.height > this.y
      ) {
        // collision detected
        powerUp.markedForDeletion = true;
        if (powerUp.name === "CoinBooster") {
          this.game.acquireCoin += 10;
        }
        if (powerUp.name === "DistanceBooster") {
          this.game.distanceCovered += 1000;
          this.game.boost.enable = true;
          this.game.boost.currSpeed = this.game.speed;
          this.game.boost.start = this.game.distanceCovered;
          this.game.boost.covered = this.game.boost.start;
        }
        powerUp.audio.play();
      }
    });
  }
}
