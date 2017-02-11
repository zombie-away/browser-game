var Weapon = function (game, parent, bulletKey) {
    Phaser.Weapon.call(this, game, parent);
    this.createBullets(150, bulletKey);
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bulletSpeed = 600;
    this.fireRate = 500;
    this.trackSprite(parent, 10, 0, true);
    this.fireLimit = 10;
    this.bulletsInGun = 10;
    this.isNoBullets = false;
    this.bulletPower = 5;

    this.onFire.add(function (bullet, weapon) {
        bullet.power = this.bulletPower;
        this.bulletsInGun--;
    }, this);
}

Weapon.prototype = Object.create(Phaser.Weapon.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.update = function() {
    if (this.game.input.activePointer.leftButton.isDown && this.bulletsInGun > 0) {
        this.fire();
    }
    this.shots = this.fireLimit - this.bulletsInGun;
};

Weapon.prototype.multyFire = function (fireCount) {
    if (this.game.time.time > this.nextFire) {
        this.nextFire = this.game.time.time + this.fireRate;
        //Костылище
        var fireRate = this.fireRate;
        this.fireRate = 0;
        if (this.fire()) {
            this.shots -= fireCount - 1;
            this.bulletsInGun += fireCount - 1;
            for (var i = 0; i < fireCount - 1; i++) {
                this.fire();
            }
        }
        this.fireRate = fireRate;
    }
};


// Weapon.prototype.recharge = function () {
//     setTimeout(function () {
//         console.log(this.parent);
//         if (this.parent.backpack.bullets > 0) {
//             if (this.parent.backpack.bullets <= this.fireLimit) {
//                 this.bulletsInGun = this.parent.backpack.bullets;
//                 this.parent.backpack.bullets = 0;
//             } else {
//                 this.parent.backpack.bullets -= this.fireLimit;
//                 this.bulletsInGun = this.fireLimit;
//             }
//         } else {
//             this.isNoBullets = true;
//         }
//     }, 3000);
// }

module.exports = Weapon;
