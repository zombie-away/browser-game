var BulletsBox = require('./bullets');

var GunBox = function (game, x, y) {
    BulletsBox.call(this, game, x, y, 'gun');

    this.bullets = 30;
}

GunBox.prototype = Object.create(BulletsBox.prototype);
GunBox.prototype.constructor = GunBox;

module.exports = GunBox;
