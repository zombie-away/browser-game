var Weapon = require('./weapon');
var constants = require('./constants/weapon');
var Gun = function (game, parent, options = {}) {
    Weapon.call(this, game, parent, 'bullet');
    this.bulletsInGun = options.bulletsInGun || 10;
    this.fireLimit = 10;
    this.name = constants.gunName;
}

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;

module.exports = Gun;
