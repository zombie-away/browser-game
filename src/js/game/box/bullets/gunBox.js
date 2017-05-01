var BulletsBox = require('./bullets');
var weaponNames = require('../../constants/weapon');

var GunBox = function (game, x, y) {
    BulletsBox.call(this, game, x, y, weaponNames.gunName);

    this.bullets = 10;
}

GunBox.prototype = Object.create(BulletsBox.prototype);
GunBox.prototype.constructor = GunBox;

module.exports = GunBox;
