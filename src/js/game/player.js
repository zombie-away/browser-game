var PLAYER_FACE_VELOCITY = 150;
var PLAYER_BACK_VELOCITY = 70;
var Being = require('./being.js');

var Player = function (game, x, y) {
    Being.call(this, game, x, y, 'player');
    this.TURN_RATE = 9;
    this.target = this.game.input.activePointer;
    this.maxHealth = 3;
    //noise zone
    var noiseZone = game.add.graphics(0, 0);
    noiseZone.lineStyle(2, 0xe1e1e1);
    noiseZone.drawCircle(0, 0, 700);
    game.physics.enable(noiseZone, Phaser.Physics.ARCADE);
    noiseZone.anchor.setTo(0.5, 0.5);
    this.noiseZone = noiseZone;
    this.addChild(noiseZone);
    this.backpack = {
        weapons: [],
        bullets: {
            // Infinity
            gun: 1000,
            shotgun: 2
        }
    };
    this.health = 3;
    this.alive = true;

    this.rechargeState = false;
}

Player.prototype = Object.create(Being.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    this.turnToTarget({x: this.target.worldX, y: this.target.worldY});
    var cursors = this.game.input.keyboard.addKeys(
        {
            'up': Phaser.KeyCode.W,
            'down': Phaser.KeyCode.S,
            'left': Phaser.KeyCode.A,
            'right': Phaser.KeyCode.D,
            'recharge': Phaser.KeyCode.R
        }
    );
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

    if (this.weapon && (this.weapon.bulletsInGun === 0 || cursors.recharge.isDown)) {
        if (!this.rechargeState) {
            this.rechargeWeapon();
            this.rechargeState = true;
        }
    }

    weaponChangeHandler(this);
};

Player.prototype.rechargeWeapon = function () {
    setTimeout(function () {
        var weaponBullets = this.backpack.bullets[this.weapon.name];
        if (weaponBullets) {
            if (weaponBullets <= this.weapon.fireLimit) {
                this.weapon.bulletsInGun = weaponBullets;
                this.backpack.bullets[this.weapon.name] = 0;
            } else {
                this.backpack.bullets[this.weapon.name] -= this.weapon.fireLimit;
                this.weapon.bulletsInGun = this.weapon.fireLimit;
            }
        }
        this.rechargeState = false;
    }.bind(this), 3000);
};

Player.prototype.addHealth = function (healthBox) {
    if (this.maxHealth < this.health + healthBox.health) {
        this.health = this.maxHealth;
    } else {
        this.health += healthBox.health;
    }
    healthBox.kill();
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

function weaponChangeHandler(player) {
    var keys = player.game.input.keyboard.addKeys(
        {
            'firstWeapon': Phaser.KeyCode.ONE,
            'secondWeapon': Phaser.KeyCode.TWO,
            'thridWeapon': Phaser.KeyCode.THREE
        }
    );

    if (keys.firstWeapon.isDown && player.backpack.weapons[0]) {
        player.weapon = player.backpack.weapons[0];
    }
    if (keys.secondWeapon.isDown && player.backpack.weapons[1]) {
        player.weapon = player.backpack.weapons[1];
    }
    if (keys.thridWeapon.isDown && player.backpack.weapons[2]) {
        player.weapon = player.backpack.weapons[2];
    }

}

module.exports = Player;
