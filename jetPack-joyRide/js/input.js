class InputHandler {
  /**
   *
   * @param {object} game
   */

  constructor(game) {
    this.game = game;
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (
        e.key === "ArrowUp" &&
        this.keys.indexOf(e.key) === -1 &&
        this.game.player.distanceIncrement
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
