/**
 * @class UI
 * @param {Game} game
 */
class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = " Titan One";
    this.color = "#f5d142";
  }

  /**
   * @method draw
   * @param {Canvas drawing context} context
   */
  draw(context) {
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = "left";
    context.fillStyle = this.color;

    context.fillText(
      "Distance: " +
        Math.round(this.game.distanceCovered / this.game.player.fps) +
        "m",
      20,
      60
    );
    // coin
    context.fillText("Coin: " + this.game.acquireCoin, 20, 80);

    if (this.game.gameOver) {
      setTimeout(() => {
        this.image = document.getElementById("game-over");

        context.drawImage(
          this.image,

          0,
          0,
          this.game.width,
          this.game.height
        );

        console.log("gameOver");
        context.fillText(
          "Distance: " +
            Math.round(this.game.distanceCovered / this.game.player.fps) +
            "m",
          20,
          60
        );
        // coin
        context.fillText("Coin: " + this.game.acquireCoin, 20, 80);

        // highest distance and total coins
        context.fillText(
          "Highest: " +
            Math.round(
              this.game.storage.highestDistance / this.game.player.fps
            ) +
            "m",
          this.game.width - 200,
          60
        );
        // coin
        context.fillText(
          "Total Coins: " + this.game.storage.totalCoin,
          this.game.width - 200,
          80
        );
      }, 3000);
    }
  }
}
