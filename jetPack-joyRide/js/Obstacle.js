/**
 * @class Obstacle
 */
class Obstacle {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    // not currently used
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  /**
   * @method draw
   * @param {Canvas drawing context} context
   */
  draw(context) {
    // if (this.game.debug) {
    //   context.strokeRect(this.x, this.y, this.width, this.height);
    // }
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

/**
 * @class Lighting
 * @param {Game} game
 */
class Lighting extends Obstacle {
  constructor(game) {
    super();
    this.game = game;
    this.name = "Lighting";
    this.speedX = 0;
    this.speedY = 0;

    this.x = this.game.width;

    this.maxFrame = 0;
    this.audio = document.getElementById("zap-audio");
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
  }
}

/**
 * @class Lighting1
 * @param {Game} game
 */
class Lighting1 extends Lighting {
  constructor(game) {
    super(game);
    this.width = OBSTACLE_1_WIDTH;
    this.height = OBSTACLE_1_HEIGHT;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle1");
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
  }
}

/**
 * @class Lighting2
 * @param {Game} game
 */
class Lighting2 extends Lighting {
  constructor(game) {
    super(game);

    this.width = OBSTACLE_2_WIDTH;
    this.height = OBSTACLE_2_HEIGHT;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle2");
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
  }
}

/**
 * @class Lighting3
 * @param {Game} game
 */
class Lighting3 extends Lighting {
  constructor(game) {
    super(game);
    this.width = OBSTACLE_3_WIDTH;
    this.height = OBSTACLE_3_HEIGHT;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle3");
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
  }
}

/**
 * @class Lighting4
 * @param {Game} game
 */
class Lighting4 extends Lighting {
  constructor(game) {
    super(game);
    this.width = OBSTACLE_4_WIDTH;
    this.height = OBSTACLE_4_HEIGHT;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle4");
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
  }
}

/**
 * @class Rocket
 * @param {Game} game
 */
class Rocket extends Obstacle {
  constructor(game) {
    super();
    this.game = game;
    this.name = "Rocket";

    this.speedX = OBSTACLE_ROCKET_SPEEDX;
    this.speedY = 0;

    this.width = OBSTACLE_ROCKET_WIDTH;
    this.height = OBSTACLE_ROCKET_HEIGHT;

    this.x = this.game.width;
    this.y =
      this.game.player.y +
      Math.floor(this.game.player.height / 2) -
      Math.floor(this.height / 2);

    this.maxFrame = 0;

    this.image = document.getElementById("rocket");

    this.audio = document.getElementById("rocket-audio");
    this.audioExplosion = document.getElementById("explosion-audio");
  }
  /**
   * @method update
   * @param {float} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
    if (this.frameX === 0) this.audio.play();
  }
}
