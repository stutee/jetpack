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

    this.speed = 0;
    this.maxSpeed = 4;
    this.states = [
      new Standing(this),
      new Running(this),
      new Flying(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.speed;

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    //vertical movement

    if (input.includes("ArrowUp")) {
      if (this.y <= this.game.ceilingMargin) this.vy = 0;
      else this.vy -= 2;
    }
    this.y += this.vy;

    if (!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;

    if (this.y < this.game.ceilingMargin) this.y = this.game.ceilingMargin;

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
    // for lighting
    this.game.obstacles.forEach((obstacle) => {
      if (
        obstacle.x < this.x + this.width &&
        obstacle.x + obstacle.width > this.x &&
        obstacle.y < this.y + this.height &&
        obstacle.y + obstacle.height > this.y
      ) {
        // collision detected
        obstacle.markedForDeletion = true;
        this.game.gameEnd = true;
        this.game.distance++;
      } else {
        // no collision
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
      } else {
        // no collision
      }
    });
  }
}
