/**
 * @class Game
 * @param {Number} width
 * @param {Number} height
 */
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.speed = GAME_SPEED;
    this.maxSpeed = GAME_MAXSPEED;
    this.boost = {
      enable: false,
      currSpeed: this.speed,
      speed: 30,
      start: 0,
      booster: 100,
      covered: 0,
    };

    this.background = new Background(this);

    this.groundMargin = GAME_GROUND_MARGIN;
    this.ceilingMargin = GAME_CEILING_MARGIN;
    this.passMargin = GAME_PLAYER_OBSTACLE_VERTICAL_GAP_MARGIN;

    this.player = new Player(this);

    this.input = new InputHandler(this);
    this.UI = new UI(this);

    // obstacles
    this.obstacles = [];
    this.obstacleTimer = 0;
    this.obstacleInterval = GAME_OBSTACLES_TIME_INTERVAL; //in ms

    // coins
    this.coins = [];
    this.coinTimer = 0;
    this.coinInterval = GAME_COIN_TIME_INTERVAL; //in ms

    // powerUp
    this.powerUps = [];
    this.powerUpTimer = 0;
    this.powerUpInterval = GAME_POWERUP_TIME_INTERVAL; //in ms

    this.acquireCoin = 0;
    this.distanceCovered = 0;

    this.storage = {
      totalCoin: 0,
      highestDistance: 0,
    };

    this.apiCall("GET");

    this.gameStart = true;
    this.gameOver = false;

    this.bgAudio = document.getElementById("bg-audio");
    this.bgAudio.play();
  }

  /**
   * @method apiCall
   * @param {string} method
   */
  apiCall(method) {
    if (method === "GET") {
      fetch(GAME_API_GET_ENDPOINT)
        // Converting received data to JSON
        .then((response) => response.json())

        .then((json) => {
          this.storage.totalCoin = parseInt(json.totalCoin);
          this.storage.highestDistance = parseInt(json.highestDistance);
          console.log("Fetched");
          console.log(json);
        })
        .catch((error) => console.log(error));
      console.log(
        "Fetching from Total Coin and Highest Distance Score from Server"
      );
    }

    if (method === "POST") {
      let data = {
        totalCoin: this.storage.totalCoin,
        highestDistance: this.storage.highestDistance,
      };

      fetch(GAME_API_POST_ENDPOINT, {
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(data),
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          console.log("Success");
          console.log("Status");
          console.log(response.status);
        })
        .catch((error) => console.log(error));

      console.log("Posting Total Coin and Highest Distance to Server");
    }
  }

  /**
   * @method update
   * @param {float} deltaTime
   */

  update(deltaTime) {
    this.background.update();

    if (!this.boost.enable && !this.gameOver && this.player.distanceIncrement)
      //not taken booster
      this.distanceCovered++;

    if (this.boost.enable && !this.gameOver && this.player.distanceIncrement) {
      if (this.boost.covered > this.boost.start + this.boost.booster) {
        this.speed = this.boost.currSpeed;
        // this.boost.start = this.distanceCovered;
        this.boost.enable = false;
      } else {
        this.speed = this.boost.speed;
        this.boost.covered++;
      }
    }
    //speed of  game increases as distance increases
    if (!this.boost.enable && !this.gameOver) {
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
      this.obstacleInterval =
        randomFloatFromInterval(
          GAME_OBSTACLES_MIN_TIME_INTERVAL,
          GAME_OBSTACLES_MAX_TIME_INTERVAL
        ) * 1000;
    } else {
      this.obstacleTimer += deltaTime;
    }

    // updating each obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.update(deltaTime);
    });

    // handle coins
    // coin appear after coinInterval
    if (this.coinTimer > this.coinInterval) {
      this.addCoin();
      this.coinTimer = 0;
      this.coinInterval =
        randomFloatFromInterval(
          GAME_COIN_MIN_TIME_INTERVAL,
          GAME_COIN_MAX_TIME_INTERVAL
        ) * 1000;
    } else {
      this.coinTimer += deltaTime;
    }

    // updating each coins
    this.coins.forEach((coin) => {
      coin.update(deltaTime);
    });

    // handle powerUps
    // powerUp appear after powerUpInterval
    if (this.powerUpTimer > this.powerUpInterval) {
      this.addPowerUp();
      this.powerUpTimer = 0;
      this.powerUpInterval =
        randomFloatFromInterval(
          GAME_POWERUP_MIN_TIME_INTERVAL,
          GAME_POWERUP_MAX_TIME_INTERVAL
        ) * 1000;
    } else {
      this.powerUpTimer += deltaTime;
    }

    // updating each powerUps
    this.powerUps.forEach((powerUp) => {
      powerUp.update(deltaTime);
    });

    // filtering each item from the array which are not further not needed
    // can be because of acquire coin or item moving of the game frame
    this.obstacles = this.obstacles.filter(
      (obstacle) => !obstacle.markedForDeletion
    );
    this.coins = this.coins.filter((coin) => !coin.markedForDeletion);
    this.powerUps = this.powerUps.filter(
      (powerUp) => !powerUp.markedForDeletion
    );
  }

  /**
   * @method draw
   * @param {Canvas drawing context} context
   */
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);

    // drawing each obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(context);
    });

    // drawing each coins
    this.coins.forEach((coin) => {
      coin.draw(context);
    });

    // drawing each powerUps
    this.powerUps.forEach((powerUp) => {
      powerUp.draw(context);
    });

    // drawing scores
    this.UI.draw(context);
  }

  /**
   * to add coin in game
   * @method addCoin
   */
  addCoin() {
    new CoinGenerator(this);
  }

  /**
   * to add powerup in game
   * @method addPowerUp
   */
  addPowerUp() {
    let choices = [new PowerUpOne(this), new PowerUpTwo(this)];
    let choice = randomIntFromInterval(0, choices.length - 1);
    let choosen = choices[choice];

    this.powerUps.push(choosen);
  }

  /**
   * to add obstacle in game
   * @method addObstacle
   */
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
  }
}
