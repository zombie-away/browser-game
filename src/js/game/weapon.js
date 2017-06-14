var serializer = require('../lib/serializer');

var Weapon = function (game, parent, bulletKey) {
    Phaser.Weapon.call(this, game, parent);
    this.bulletKey = bulletKey;
    this.createBullets(150, bulletKey);
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bulletSpeed = 600;
    this.fireRate = 500;
    this.trackSprite(parent, 40, 0, true);
    this.fireLimit = 10;
    this.bulletsInGun = 10;
    this.isNoBullets = false;
    this.bulletPower = 5;
    this.shotSound = game.add.audio('audio-shotgun');

    this.onFire.add(function (bullet, weapon) {
        bullet.power = this.bulletPower;
        this.bulletsInGun--;
        this.shotSound.play();
    }, this);

    this.icon = 'gun-panel';
}

Weapon.prototype = Object.create(Phaser.Weapon.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.serialize = function() {
    var fields = [
        'bulletsInGun',
        'name'
    ];

    return serializer.serialize(this, fields);
};

Weapon.prototype.recreate = function(parent) {
    Phaser.Weapon.call(this, this.game, parent);
};

Weapon.prototype.update = function() {
    if (this.game.input.activePointer.leftButton.isDown &&
        this.bulletsInGun > 0) {
        this.fire();
    }
    this.shots = this.fireLimit - this.bulletsInGun;
};

Weapon.prototype.multyFire = function (fireCount) {
    if (this.game.time.time > this.nextFire) {
        this.nextFire = this.game.time.time + this.fireRate;
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

module.exports = Weapon;
