var Weapon = require('./weapon.js');
var AK47 = function (game, parent, options = {}) {
    Weapon.call(this, game, parent, 'bullet');
    this.bulletSpeed = 1000;
    this.fireRate = 100;
    this.bulletsInGun = options.bulletsInGun || 30;
    this.fireLimit = 30;
    this.name = 'ak47';

    this.bulletPower = 6;
}

AK47.prototype = Object.create(Weapon.prototype);
AK47.prototype.constructor = AK47;

module.exports = AK47;
