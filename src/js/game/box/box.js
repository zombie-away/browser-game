var Box = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.animations.add('spin');
    this.animations.play('spin', 10, true);
    this.alive = true;
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.serialize = function() {
    return { x: this.x, y: this.y };
};

module.exports = Box;
