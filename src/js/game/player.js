var PLAYER_FACE_VELOCITY = 150;
var PLAYER_BACK_VELOCITY = 70;

var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.TURN_RATE = 15;
    this.body.collideWorldBounds = true;
    //noise zone
    var noiseZone = game.add.graphics(0, 0);
    noiseZone.lineStyle(2, 0xe1e1e1);
    noiseZone.drawCircle(0, 0, 200);
    game.physics.enable(noiseZone, Phaser.Physics.ARCADE);
    noiseZone.anchor.setTo(0.5, 0.5);
    this.noiseZone = noiseZone;
    this.addChild(noiseZone);

    this.backpack = {};
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    var cursors = this.game.input.keyboard.addKeys(
        {
            'up': Phaser.KeyCode.W,
            'down': Phaser.KeyCode.S,
            'left': Phaser.KeyCode.A,
            'right': Phaser.KeyCode.D
        }
    );
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.input.activePointer.worldX, this.game.input.activePointer.worldY
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

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (cursors.up.isDown) {
        this.body.velocity.y = - getVelocity(-90, this.body.rotation);
        this.animations.play('up');
    }
    if (cursors.down.isDown) {
        this.body.velocity.y = getVelocity(90, this.body.rotation);
        this.animations.play('down');
    }
    if (cursors.left.isDown) {
        this.body.velocity.x = - getVelocity(-180, this.body.rotation);
        this.animations.play('left');
    }
    if (cursors.right.isDown) {
        this.body.velocity.x = getVelocity(0, this.body.rotation);
        this.animations.play('right');
    }

    if (this.weapon && this.weapon.bulletsInGun == 0) {
        this.rechargeWeapon();
    }
    // console.log(this.backpack.bullets);
};

Player.prototype.rechargeWeapon = function () {
    var self = this;
    setTimeout(function () {
        if (self.backpack.bullets > 0) {
            if (self.backpack.bullets <= self.weapon.fireLimit) {
                self.weapon.bulletsInGun = self.backpack.bullets;
                self.backpack.bullets = 0;
            } else {
                self.backpack.bullets -= self.weapon.fireLimit;
                self.weapon.bulletsInGun = self.weapon.fireLimit;
            }
        }
    }, 3000);
};

function getVelocity(moveDirection, playerDirection) {
    var delta = moveDirection - playerDirection;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    if (Math.abs(delta) >= 90){
        return PLAYER_BACK_VELOCITY;
    }

    return PLAYER_FACE_VELOCITY;
}

module.exports = Player;
