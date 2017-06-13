var BulletsBox = require('./bullets');
var weaponNames = require('../../constants/weapon');

var Ak47Box = function (game, x, y) {
    BulletsBox.call(this, game, x, y, weaponNames.ak47Name);
    this.bullets = 60;
}

Ak47Box.prototype = Object.create(BulletsBox.prototype);
Ak47Box.prototype.constructor = Ak47Box;

module.exports = Ak47Box;
