var PLAYER_FACE_VELOCITY = 150;
var PLAYER_BACK_VELOCITY = 100;

var Zombie = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'zombie');
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.TURN_RATE = 5;
    this.body.collideWorldBounds = true;
    this.health = 10;
    this.alive = true;
    this.attackPower = 1;
    this.isAttakState = false;
}

Zombie.prototype = Object.create(Phaser.Sprite.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.update = function() {
    if (this.target) {
        this.game.physics.arcade.moveToObject(this, this.target, 100);
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            this.target.x, this.target.y
        );
        if (this.rotation !== targetAngle) {
            var delta = targetAngle - this.rotation;

            if (delta > Math.PI) delta -= Math.PI * 2;
            if (delta < -Math.PI) delta += Math.PI * 2;
            if (delta > 0) {
                this.angle += this.TURN_RATE;
            } else {
                this.angle -= this.TURN_RATE;
            }
            if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                this.rotation = targetAngle;
            }
        }
    }
};

Zombie.prototype.damage = function(damage) {

    this.health -= damage;

    if (this.health <= 0)
    {
        this.alive = false;
        this.kill();

        return true;
    }

    return false;
};

Zombie.prototype.attack = function (target) {
    var self = this;
    if (!this.isAttakState) {
        console.log(this.isAttakState);
        this.isAttakState = true;
        return target.damage(this.attackPower);
    } else {
        console.log(this.isAttakState);
        setTimeout(function () {
            self.isAttakState = false;
        }, 1000);
        return false;
    }
}

Zombie.target = null;

module.exports = Zombie;
