var PLAYER_FACE_VELOCITY = 150;
var PLAYER_BACK_VELOCITY = 100;

var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.TURN_RATE = 15;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
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
        this.game.input.activePointer.x, this.game.input.activePointer.y
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
        this.body.velocity.y = - PLAYER_FACE_VELOCITY;
        this.animations.play('up');
    }
    if (cursors.down.isDown) {
        this.body.velocity.y = PLAYER_FACE_VELOCITY;
        this.animations.play('down');
    }
    if (cursors.left.isDown) {
        this.body.velocity.x = - PLAYER_FACE_VELOCITY;
        this.animations.play('left');
    }
    if (cursors.right.isDown) {
        this.body.velocity.x = PLAYER_FACE_VELOCITY;
        this.animations.play('right');
    }
};

module.exports = Player;
