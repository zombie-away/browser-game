var Weapon = require('./weapon');
var constants = require('./constants/weapon');
var AK47 = function (game, parent, options = {}) {
    Weapon.call(this, game, parent, 'bullet');
    this.bulletSpeed = 1000;
    this.fireRate = 100;
    this.bulletsInGun = options.bulletsInGun || 30;
    this.fireLimit = 30;
    this.name = constants.ak47Name;
    this.shootSound = game.add.audio('audio-ak47');
    this.bulletPower = 6;
};

AK47.prototype = Object.create(Weapon.prototype);
AK47.prototype.constructor = AK47;

module.exports = AK47;
