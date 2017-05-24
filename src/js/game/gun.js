var Weapon = require('./weapon.js');
var Gun = function (game, parent, options = {}) {
    Weapon.call(this, game, parent, 'bullet');
    this.bulletsInGun = options.bulletsInGun || 10;
    this.fireLimit = 10;
    this.name = 'gun';
}
// bulletSpeed, fireRate, bulletsInHolder

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;

module.exports = Gun;
