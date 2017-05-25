var Box = require('../box');

var BulletsBox = function (game, x, y, type) {
    Box.call(this, game, x, y, 'bulletsBox');
    this.sound = game.add.audio('audio-bullet-box');
    this.type = type;
};

BulletsBox.prototype = Object.create(Box.prototype);
BulletsBox.prototype.constructor = BulletsBox;

Box.prototype.serialize = function() {
    return { x: this.x, y: this.y, type: this.type };
};

module.exports = BulletsBox;
