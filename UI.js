class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = " Titan One";
    this.color = "beige";
  }
  draw(context) {
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = "left";
    context.fillStyle = this.color;

    context.fillText(
      "Distance: " +
        Math.round(this.game.distanceCovered / this.game.player.fps) +
        "m",
      20,
      50
    );
    // coin
    context.fillText("Coin: " + this.game.acquireCoin, 20, 80);
  }
}
