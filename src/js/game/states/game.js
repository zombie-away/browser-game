var Player = require('../player.js');
var Gun = require('../gun.js');
var AK47 = require('../ak47.js');
var Shotgun = require('../shotgun.js');

var WorldLoader = require('../worldLoader.js');
var game = {
    bulletAndZombieCollision: function (bullet, zombie) {
        if (zombie.damage(bullet.power)) {
            this.score += 10;
        }
        bullet.kill();
    },
    noiseZoneAndZombieCollision: function (noiseZone, zombie) {
        zombie.target = noiseZone.parent;
    },
    bulletCollision: function (bullet) {
        bullet.kill();
    },
    coinCollision: function (player, coin) {
        this.money++;
        this.score += 5;
        coin.kill();
    },
    zombieAndPlayerCollision: function (player, zombie) {
        zombie.attack(player);
        if (!player.alive) {
            this.game.state.start('gameover', true, false, game.score);
        }
    },
    score: 0,
    money: 0
};

var textStyleKey = { font: "bold 25px sans-serif", fill: "#46c0f9", align: "center" };
var textStyleValue = { font: "bold 25px sans-serif", fill: "#e1e1e1", align: "center" };

game.create = function () {
    game.worldMap = new WorldLoader(this.game, 'map');
    // var cursor = game.add.sprite(0, 0, 'cursor');
    // cursor.anchor.setTo(0.5, 0.5);
    // game.physics.enable(cursor, Phaser.Physics.ARCADE);
    game.input.addMoveCallback( function(pointer, x, y) {
        // console.log(cursor);
        // cursor.worldPosition = pointer.worldPosition;
    });
    //player
    game.player = new Player(this.game, game.world.centerX, game.world.height);
    this.game.add.existing(game.player);
    //weapon
    game.weapon = new Gun(this.game, game.player);
    game.player.weapon = game.weapon;

    this.game.camera.follow(game.player);

    var scoreKey = game.add.text(32, 40, "SCORE",  textStyleKey);
    scoreKey.fixedToCamera = true;
    game.scoreTextValue = game.add.text(130, 40, game.score.toString(),  textStyleValue);
    game.scoreTextValue.fixedToCamera = true;

    var moneyKey = game.add.text(32, 70, "MONEY",  textStyleKey);
    moneyKey.fixedToCamera = true;
    game.moneyTextValue = game.add.text(130, 70, game.money.toString(),  textStyleValue);
    game.moneyTextValue.fixedToCamera = true;
};

game.update = function () {
    this.weapon.update();
    //overlap noise zone and zombie
    game.physics.arcade.overlap(
        this.player.noiseZone,
        this.worldMap.zombies,
        this.noiseZoneAndZombieCollision,
        null,
        this
    );
    game.physics.arcade.collide(this.player, this.worldMap.collisionLayer);
    game.physics.arcade.collide(this.worldMap.zombies, this.worldMap.collisionLayer);
    game.physics.arcade.collide(this.weapon.bullets, this.worldMap.collisionLayer, this.bulletCollision, null, this);
    game.physics.arcade.overlap(
        this.weapon.bullets,
        this.worldMap.zombies,
        this.bulletAndZombieCollision,
        null,
        this
    );
    game.physics.arcade.collide(this.player, this.worldMap.coins, this.coinCollision, null, this);
    game.physics.arcade.collide(this.player, this.worldMap.zombies, this.zombieAndPlayerCollision, null, this);

    game.scoreTextValue.text = this.score.toString();
    game.moneyTextValue.text = this.money.toString();
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.coins);
}

module.exports = game;
