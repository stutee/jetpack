/**
 * @class Player
 */
class Player {
  constructor(game) {
    this.game = game;

    this.width = 85; //player
    this.height = 80;

    this.x = 0; //player x pos starting
    this.y = this.game.height - this.height - this.game.groundMargin; //ground walk maintained

    this.vy = 0; //velocity vertical

    this.gravity = PLAYER_GRAVITY;

    this.image = document.getElementById("player");

    this.frameX = 0; //sprite 4 column 0 is first
    this.frameY = 0; //sprite 4 row 0
    this.maxFrame; // for animation here 4
    this.fps = PLAYER_FPS; // 4 frame 1s 15 frame
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0; //time maintained
    this.distanceIncrement = true;

    this.states = [
      new Standing(this),
      new Running(this),
      new Flying(this),
      new Falling(this),
      new Zap(this),
      new Burned(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  /**
   * @method update
   * @param {InputHandler} input
   * @param {float} deltaTime
   */
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);

    //vertical movement

    if (input.includes("ArrowUp")) {
      if (this.y <= this.game.ceilingMargin) this.vy = 0;
      else this.vy -= PLAYER_JETPACK_THRUST;
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

  /**
   * @method draw
   * @param {Canvas drawing context} context
   */
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

  /**
   * @method onGround
   * @return {Boolean}
   */
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  /**
   * @method setState
   * @param {Number} state
   */
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  /**
   * @method checkCollision
   */
  checkCollision() {
    // for lighting
    if (this.game.boost.enable) return; //booster mode doesn't need to detect

    this.game.obstacles.forEach((obstacle) => {
      if (isCollision(obstacle, this)) {
        // collision detected
        obstacle.markedForDeletion = true;
        this.distanceIncrement = false;

        setTimeout(() => {
          this.game.gameOver = true;
        }, 1000);

        if (this.game.distanceCovered > this.game.storage.highestDistance) {
          this.game.storage.highestDistance = this.game.distanceCovered;
        }

        this.game.storage.totalCoin += this.game.acquireCoin;
        this.game.apiCall("POST");

        if (obstacle.name === "Rocket") {
          this.setState(5);
          obstacle.audioExplosion.play();
        } else {
          this.setState(4);
          obstacle.audio.play();
        }

        console.log("GameOver");
      }
    });

    // for coins
    this.game.coins.forEach((coin) => {
      if (isCollision(coin, this)) {
        // collision detected
        coin.markedForDeletion = true;
        this.game.acquireCoin++;
        coin.audio.play();
      }
    });

    // for powerUps
    this.game.powerUps.forEach((powerUp) => {
      if (isCollision(powerUp, this)) {
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
