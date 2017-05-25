var Weapon = require('./weapon');
var constants = require('./constants/weapon');
var Gun = function (game, parent) {
    Weapon.call(this, game, parent, 'bullet');
    this.bulletsInGun = this.fireLimit = 10;
    this.name = constants.gunName;
}

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;

module.exports = Gun;
