var Weapon = require('./weapon');
var constants = require('./constants/weapon');
var Gun = function (game, parent, options) {
    options = options || {};
    Weapon.call(this, game, parent, 'bullet');
    this.bulletsInGun = options.bulletsInGun || 10;
    this.fireLimit = 10;
    this.name = constants.gunName;
    this.shotSound = game.add.audio('audio-gun');
    this.icon = 'gun-panel';
}

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;

module.exports = Gun;
