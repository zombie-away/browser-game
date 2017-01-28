var Gun = function (game, parent) {
    Phaser.Weapon.call(this, game, parent);
    this.createBullets( 30, 'bullet');
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bulletSpeed = 600;
    this.fireRate = 100;
    this.trackSprite(parent, 0, 0, true);
}

Gun.prototype = Object.create(Phaser.Weapon.prototype);
Gun.prototype.constructor = Gun;

Gun.prototype.update = function() {
    if (this.game.input.activePointer.isDown) {
        this.fire();
    }
};

module.exports = Gun;
