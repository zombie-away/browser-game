var Weapon = require('./weapon.js');
var Gun = function (game, parent) {
    Weapon.call(this, game, parent, 'bullet');
    // this.bulletSpeed = 600;
    // this.fireRate = 500;
    this.bulletsInGun = this.fireLimit = 10;
    this.name = 'gun';
}

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;

module.exports = Gun;
