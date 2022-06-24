//simple enum object that will pair values and names of each state
const states = {
  SITTING: 0,
  RUNNING: 1,
  FLYING: 2,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 3;

    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.player.setState(states.RUNNING);
    } else if (input.includes("ArrowUp")) {
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

class FLYING extends State {
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
    if (this.player.onGround()) this.player.setState(states.SITTING);
  }
}
