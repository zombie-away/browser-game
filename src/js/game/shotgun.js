var Weapon = require('./weapon.js');
var Shotgun = function (game, parent) {
    Weapon.call(this, game, parent, 'shot');
    this.bulletSpeed = 500;
    this.fireRate = 900;
    // this.fireRateVariance = 20;
    this.bulletsInGun = 6;
    this.fireLimit = 6;
    this.bulletKillDistance = 200;
    this.bulletAngleVariance = 5;
    this.bulletSpeedVariance = 10;

    this.nextFire = 0;
}

Shotgun.prototype = Object.create(Weapon.prototype);
Shotgun.prototype.constructor = Shotgun;

Shotgun.prototype.update = function () {
    if (this.game.input.activePointer.leftButton.isDown) {
        //Костылище
        if (this.game.time.time > this.nextFire) {
            this.nextFire = this.game.time.time + this.fireRate;
            var fireRate = this.fireRate;
            this.fireRate = 0;
            if (this.fire()) {
                this.shots -= 4;
                this.fire();
                this.fire();
                this.fire();
                this.fire();
                this.bulletsInGun--;
            }
            this.fireRate = fireRate;
        }
    }
    this.shots = this.fireLimit - this.bulletsInGun;
};

module.exports = Shotgun;
