var Weapon = require('./weapon');
var constants = require('./constants/weapon');
var Gun = function (game, parent) {
    Weapon.call(this, game, parent, 'bullet');
    // this.bulletSpeed = 600;
    // this.fireRate = 500;
    this.bulletsInGun = this.fireLimit = 10;
    this.name = constants.gunName;
}
// bulletSpeed, fireRate, bulletsInHolder

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;

module.exports = Gun;
