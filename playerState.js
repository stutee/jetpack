//simple enum object that will pair values and names of each state
const states = {
  STANDING: 0,
  RUNNING: 1,
  FLYING: 2,
  FALLING: 3,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

class Standing extends State {
  constructor(player) {
    super("STANDING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 3;

    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input.includes("ArrowUp")) {
      this.player.setState(states.FLYING);
    }
  }
}

class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;
    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input.includes("ArrowUp")) {
      this.player.setState(states.FLYING);
    }
  }
}

class Flying extends State {
  constructor(player) {
    super("FLYING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;

    this.player.frameY = 1;
  }
  handleInput(input) {
    if (this.player.onGround()) this.player.setState(states.FALLING);
  }
}

class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 3;

    this.player.frameY = 2;
  }
  handleInput(input) {
    if (this.player.frameX === this.player.maxFrame)
      this.player.setState(states.RUNNING);
    if (input.includes("ArrowUp")) {
      this.player.setState(states.FLYING);
    }
  }
}
