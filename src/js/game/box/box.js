var Box = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

module.exports = Box;
