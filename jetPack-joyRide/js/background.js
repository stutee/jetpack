/**
 * @class Layer
 * @param {Game} game
 * @param {Number} width
 * @param {Number} height
 * @param {Number} speedModifier
 * @param {Image} image
 */
class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  /**
   * @method update
   */
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  /**
   * @method draw
   * @param {Canvas drawing context} context
   */
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width - 0.5,
      this.y,
      this.width,
      this.height
    );
  }
}
/**
 * @class Background
 * @param {Game} game
 */
class Background {
  constructor(game) {
    this.game = game;
    this.width = 1024;
    this.height = 600;
    this.bgOneimage = document.getElementById("bgOne");

    this.bgOne = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.bgOneimage
    );

    this.backgroundLayers = [this.bgOne];
  }

  /**
   * @method update
   */
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  /**
   * @method draw
   * @param {Canvas drawing context} context
   */
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
