//simple enum object that will pair values and names of each state
const states = {
  STANDING: 0,
  RUNNING: 1,
  FLYING: 2,
  FALLING: 3,
  ZAP: 4,
  BURNED: 5,
};

/**
 * @class State
 * @param {String} state
 */
class State {
  constructor(state) {
    this.state = state;
  }
}

/**
 * @class Standing
 * @param {Player} player
 */
class Standing extends State {
  constructor(player) {
    super("STANDING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 3;

    this.player.frameY = 0;
    this.player.audio = document.getElementById("running-audio");
    // this.player.audio.play();
  }
  handleInput(input) {
    this.player.audio.play();
    if (input.includes("ArrowUp")) {
      this.player.setState(states.FLYING);
    }
  }
}

/**
 * @class Running
 * @param {Player} player
 */
class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }

  /**
   * @method enter
   */
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;
    this.player.frameY = 0;
    this.player.audio = document.getElementById("running-audio");
  }
  /**
   * @method enter
   * @param {InputHandler} input
   */
  handleInput(input) {
    this.player.audio.play();
    if (input.includes("ArrowUp")) {
      this.player.setState(states.FLYING);
    }
  }
}

/**
 * @class Flying
 * @param {Player} player
 */
class Flying extends State {
  constructor(player) {
    super("FLYING");
    this.player = player;
  }

  /**
   * @method enter
   */
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;

    this.player.frameY = 1;
  }
  /**
   * @method enter
   * @param {InputHandler} input
   */
  handleInput(input) {
    if (this.player.onGround()) this.player.setState(states.FALLING);
  }
}

/**
 * @class Falling
 * @param {Player} player
 */
class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }

  /**
   * @method enter
   */
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;

    this.player.frameY = 2;
  }

  /**
   * @method enter
   * @param {InputHandler} input
   */
  handleInput(input) {
    if (this.player.frameX === this.player.maxFrame)
      this.player.setState(states.RUNNING);
    if (input.includes("ArrowUp")) {
      this.player.setState(states.FLYING);
    }
  }
}

/**
 * @class Zap
 * @param {Player} player
 */
class Zap extends State {
  constructor(player) {
    super("ZAP");
    this.player = player;
  }

  /**
   * @method enter
   */
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;

    this.player.frameY = 3;

    this.player.height = 83;
  }

  /**
   * @method enter
   * @param {InputHandler} input
   */
  handleInput(input) {}
}

/**
 * @class Burned
 * @param {Player} player
 */
class Burned extends State {
  constructor(player) {
    super("BURNED");
    this.player = player;
  }

  /**
   * @method enter
   */
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;

    this.player.frameY = 4;

    this.player.height = 83;
  }

  /**
   * @method enter
   * @param {InputHandler} input
   */
  handleInput(input) {}
}
