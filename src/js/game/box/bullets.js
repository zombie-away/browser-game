var Box = require('./box.js');

var BulletsBox = function (game, x, y, type) {
    Box.call(this, game, x, y, 'bulletsBox');

    this.type = type;
    this.bullets =
}

BulletsBox.prototype = Object.create(Box.prototype);
BulletsBox.prototype.constructor = BulletsBox;


module.exports = BulletsBox;
