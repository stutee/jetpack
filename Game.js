class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.speed = 3;
    this.maxSpeed = 10;
    this.boost = {
      enable: false,
      currSpeed: this.speed,
      speed: 30,
      start: 0,
      booster: 100,
      covered: 0,
    };
    this.background = new Background(this);
    this.groundMargin = 65;
    this.ceilingMargin = 50;
    this.passMargin = 50;

    this.player = new Player(this);

    this.input = new InputHandler(this);
    this.UI = new UI(this);

    // obstacles
    this.obstacles = [];
    this.obstacleTimer = 0;
    this.obstacleInterval = 3000; //in ms

    // coins
    this.coins = [];
    this.coinTimer = 0;
    this.coinInterval = 5000; //in ms

    // powerUp
    this.powerUps = [];
    this.powerUpTimer = 0;
    this.powerUpInterval = 10000; //in ms

    this.debug = true;

    this.acquireCoin = 0;
    this.distanceCovered = 0;
    this.storage = {
      totalCoin: 0,
      highestDistance: 0,
    };
    this.state = "Start";
    this.gameStart = true;
    this.gameOver = false;

    this.bgAudio = document.getElementById("bg-audio");
    this.bgAudio.play();
  }
  update(deltaTime) {
    this.background.update();

    if (!this.boost.enable) this.distanceCovered++;

    if (this.boost.enable) {
      if (this.boost.covered > this.boost.start + this.boost.booster) {
        this.speed = this.boost.currSpeed;
        this.boost.start = this.distanceCovered;
        this.boost.enable = false;
      } else {
        this.speed = this.boost.speed;
        this.boost.covered++;
      }
    }

    if (!this.boost.enable) {
      if (this.speed < this.maxSpeed) {
        if (this.distanceCovered % 1000 === 0) this.speed += 3;
      } else {
        this.speed = this.maxSpeed;
      }
    }

    this.player.update(this.input.keys, deltaTime);

    // handle obstacles
    // obstacles appear after obstacleInterval
    if (this.obstacleTimer > this.obstacleInterval) {
      this.addObstacle();
      this.obstacleTimer = 0;
      this.obstacleInterval = randomIntFromInterval(3, 10) * 1000;
    } else {
      this.obstacleTimer += deltaTime;
    }

    // updating each obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.update(deltaTime);
    });

    // handle coins
    // obstacles appear after obstacleInterval
    if (this.coinTimer > this.coinInterval) {
      this.addCoin();
      this.coinTimer = 0;
      this.coinInterval = randomIntFromInterval(1, 10) * 1000;
    } else {
      this.coinTimer += deltaTime;
    }

    // updating each obstacles
    this.coins.forEach((coin) => {
      coin.update(deltaTime);
    });

    // handle powerUps
    if (this.powerUpTimer > this.powerUpInterval) {
      this.addPowerUp();
      this.powerUpTimer = 0;
      this.powerUpInterval = randomIntFromInterval(2, 5) * 1000;
    } else {
      this.powerUpTimer += deltaTime;
    }

    // updating each powerUps
    this.powerUps.forEach((powerUp) => {
      powerUp.update(deltaTime);
    });

    this.obstacles = this.obstacles.filter(
      (obstacle) => !obstacle.markedForDeletion
    );
    this.coins = this.coins.filter((coin) => !coin.markedForDeletion);
    this.powerUps = this.powerUps.filter(
      (powerUp) => !powerUp.markedForDeletion
    );
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

    // drawing each powerUps
    this.powerUps.forEach((powerUp) => {
      powerUp.draw(context);
    });

    this.UI.draw(context);
  }
  addCoin() {
    new CoinGenerator(this);
  }
  addPowerUp() {
    let choices = [new PowerUpOne(this), new PowerUpTwo(this)];
    let choice = randomIntFromInterval(0, choices.length - 1);
    let choosen = choices[choice];

    this.powerUps.push(choosen);
  }
  addObstacle() {
    let choices = [
      new Lighting1(this),
      new Lighting2(this),
      new Lighting4(this),

      new Rocket(this),
    ];
    let choice = randomIntFromInterval(0, choices.length - 1);
    let choosen = choices[choice];

    this.obstacles.push(choosen);

    console.log(this.obstacles);
  }
}
