var Weapon = require('./weapon');
var constants = require('./constants/weapon');
var AK47 = function (game, parent) {
    Weapon.call(this, game, parent, 'bullet');
    this.bulletSpeed = 1000;
    this.fireRate = 100;
    this.bulletsInGun = this.fireLimit = 30;
    this.name = constants.ak47Name;

    this.bulletPower = 6;
}

AK47.prototype = Object.create(Weapon.prototype);
AK47.prototype.constructor = AK47;

module.exports = AK47;
