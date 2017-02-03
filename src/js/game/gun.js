var Weapon = function (game, parent) {
    Phaser.Weapon.call(this, game, parent);
    this.createBullets(50, 'bullet');
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bulletSpeed = 600;
    this.fireRate = 500;
    this.trackSprite(parent, 0, 0, true);
    this.fireLimit = 10;
    this.bulletsInGun = 10;
    this.isNoBullets = false;
    this.owner
}

Weapon.prototype = Object.create(Phaser.Weapon.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.update = function() {
    if (this.game.input.activePointer.leftButton.isDown) {
        if (this.fire()) {
            this.bulletsInGun--;
        }
    }
    this.shots = this.fireLimit - this.bulletsInGun;
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
