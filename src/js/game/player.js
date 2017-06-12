var PLAYER_FACE_VELOCITY = 150;
var PLAYER_BACK_VELOCITY = 70;
var Being = require('./being.js');
var weaponNames = require('./constants/weapon');
var serializer = require('../lib/serializer');
var Gun = require('./gun');
var AK47 = require('./ak47');
var Shotgun = require('./shotgun');

var Player = function (game, x, y, options) {
    Being.call(this, game, x, y, 'player');
    this.TURN_RATE = 9;
    this.target = this.game.input.activePointer;
    this.weapon = new Gun(game, this);

    var weaponSprite = game.add.sprite(13, 0, 'gun');
    game.physics.enable(weaponSprite, Phaser.Physics.ARCADE);
    weaponSprite.anchor.setTo(0.5, 0.5);
    this.addChild(weaponSprite);

    this.walkAnimation = this.animations.add('walk', Phaser.Animation.generateFrameNames('legs_', 1, 6, '.png', 4), 10, true, false);

    // noise zone
    var noiseZone = game.add.graphics(0, 0);
    noiseZone.lineStyle(2, 0xe1e1e1);
    noiseZone.drawCircle(0, 0, 400);
    game.physics.enable(noiseZone, Phaser.Physics.ARCADE);
    noiseZone.anchor.setTo(0.5, 0.5);
    this.noiseZone = noiseZone;
    this.addChild(noiseZone);
    var backpackBullets = {};
    backpackBullets[weaponNames.gunName] = options.gun || 1000;
    backpackBullets[weaponNames.shotGunName] = options.shotgun || 2;
    backpackBullets[weaponNames.ak47Name] = options.ak47 || 30;
    this.backpack = {
        weapons: [this.weapon, new Shotgun(game, this), new AK47(game, this)],
        bullets: backpackBullets
    };
    this.health = options.health || 3;
    this.alive = true;
    this.maxHealth = options.maxHealth || 3;
    this.rechargeState = false;
    this.cockSound = game.add.audio('audio-cock');
}

Player.prototype = Object.create(Being.prototype);
Player.prototype.constructor = Player;

Player.prototype.serialize = function () {
    var fields = [
        'health',
        'bullets',
        'maxHealth',
        'weapon',
        'weapons',
        'x',
        'y'
    ];
    var serializeObject = Object.assign({}, this);
    serializeObject.bullets = this.backpack.bullets;
    serializeObject.weapons = this.backpack.weapons.map(function (weapon) {
        return weapon.serialize();
    });
    serializeObject.x = this.x;
    serializeObject.y = this.y;

    return serializer.serialize(serializeObject, fields);
};

Player.prototype.addWeapon = function (weapon) {
    this.backpack.weapons.push(weapon);
};

function weaponDeserialize(weapon, game, parent) {
    var result;
    switch (weapon.name) {
        case 'shotgun':
            result = new Shotgun(game, parent);
            break;
        case 'ak47':
            result = new AK47(game, parent);
            break;
        default:
            result = new Gun(game, parent);
    }

    return Object.assign(result, weapon);
}

Player.deserialize = function (playerData, game) {
    var instance = new this(game, playerData.x, playerData.y, playerData);
    instance.weapon = weaponDeserialize(playerData.weapon, game, instance);
    instance.backpack.weapons = playerData.weapons.map(function (weapon) {
        return weaponDeserialize(weapon, game, instance);
    });

    return instance;
};

Player.prototype.update = function () {
    this.setWalkingState(10);
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
    }
    if (cursors.down.isDown) {
        this.body.velocity.y = getVelocity(90, this.body.rotation);
    }
    if (cursors.left.isDown) {
        this.body.velocity.x = - getVelocity(-180, this.body.rotation);
    }
    if (cursors.right.isDown) {
        this.body.velocity.x = getVelocity(0, this.body.rotation);
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
            this.cockSound.play();
        }
        this.rechargeState = false;
    }.bind(this), 3000);
};

Player.prototype.addHealth = function (health) {
    if (this.maxHealth < this.health + health) {
        this.health = this.maxHealth;
    } else {
        this.health += health;
    }
    this.onHealthChange.dispatch((this.health / this.maxHealth) * 100);
};

Player.prototype.addBullets = function (bulletsBox) {
    if (this.backpack.bullets[bulletsBox.type]) {
        this.backpack.bullets[bulletsBox.type] += bulletsBox.bullets;
        bulletsBox.kill();
    }
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
