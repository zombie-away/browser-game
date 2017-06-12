var Being = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, 'legs');

    var body = game.add.sprite(0, 0, key);
    body.anchor.setTo(0.4, 0.5);
    this.addChild(body);
    this.walkAnimation = this.animations.add('walk', Phaser.Animation.generateFrameNames('legs_', 1, 6, '.png', 4), 10, true, false);

    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.TURN_RATE = 5;
    this.body.collideWorldBounds = true;
    this.health = 10;
    this.alive = true;
    this.attackPower = 1;
    this.isAttakState = false;
    this.target = null;
    this.maxHealth = 10;
    this.onHealthChange = new Phaser.Signal();
};

Being.prototype = Object.create(Phaser.Sprite.prototype);
Being.prototype.constructor = Being;
Being.prototype.turnToTarget = function (target) {
    if (target) {
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            target.x, target.y
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
}
Being.prototype.update = function() {
    console.log('update');
};

Being.prototype.damage = function(damage) {
    this.health -= damage;
    this.onHealthChange.dispatch((this.health / this.maxHealth) * 100);
    if (this.health <= 0) {
        this.alive = false;
        this.kill();

        return true;
    }

    return false;
};

Being.prototype.attack = function (target) {
    var self = this;
    if (!this.isAttakState) {
        this.isAttakState = true;
        return target.damage(this.attackPower);
    } else {
        setTimeout(function () {
            self.isAttakState = false;
        }, 1000);

        return false;
    }
};

Being.prototype.setWalkingState = function (speedDenominator) {
    if (this.body.speed === 0) {
        this.walkAnimation.stop();
    } else {
        this.animations.play('walk', this.body.speed / speedDenominator, true);
        this.walkAnimation.speed = this.body.speed / speedDenominator;
    }
};

module.exports = Being;
