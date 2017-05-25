var BulletsBox = require('./bullets');
var weaponNames = require('../../constants/weapon');

var ShotGunBox = function (game, x, y) {
    BulletsBox.call(this, game, x, y, weaponNames.shotGunName);

    this.bullets = 5;
}

ShotGunBox.prototype = Object.create(BulletsBox.prototype);
ShotGunBox.prototype.constructor = ShotGunBox;

module.exports = ShotGunBox;
