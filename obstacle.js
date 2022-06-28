class Obstacle {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
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
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class Lighting1 extends Lighting {
  constructor(game) {
    super(game);
    this.width = 111;
    this.height = 243;
    this.width = 60;
    this.height = 130;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle1");
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class Lighting2 extends Lighting {
  constructor(game) {
    super(game);
    this.width = 243;
    this.height = 111;
    this.width = 130;
    this.height = 60;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle2");
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class Lighting3 extends Lighting {
  constructor(game) {
    super(game);
    this.width = 119;
    this.height = 392;
    this.width = 40;
    this.height = 130;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle3");
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class Lighting4 extends Lighting {
  constructor(game) {
    super(game);
    this.width = 392;
    this.height = 119;
    this.width = 185;
    this.height = 55;
    this.y = randomIntFromInterval(
      this.game.ceilingMargin,
      this.game.height -
        this.game.groundMargin -
        this.height -
        this.game.passMargin
    );
    this.image = document.getElementById("obstacle4");
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class Rocket extends Obstacle {
  constructor(game) {
    super();
    this.game = game;
    this.name = "Rocket";

    this.speedX = 15;
    this.speedY = 0;

    this.width = 100;
    this.height = 50;

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
  update(deltaTime) {
    super.update(deltaTime);
    if (this.frameX === 0) this.audio.play();
  }
}
