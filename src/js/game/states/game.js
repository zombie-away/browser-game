var Player = require('../player.js');
var Gun = require('../gun.js');
var AK47 = require('../ak47.js');
var Shotgun = require('../shotgun.js');
var HealthBar = require('../HealthBar.js');
var lifePanelConst = require('../constants/lifePanel.js');
var textStyleKey = require('../constants/textStyle.js').textStyleKey;
var textStyleValue = require('../constants/textStyle.js').textStyleValue;

function addSprite(game, coords, spriteName) {
    var lifePanel = game.add.sprite(coords.x, coords.y, spriteName);
    lifePanel.fixedToCamera = true;
    lifePanel.anchor.setTo(0.5, 0.5);
}

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
        // if (zombie.alive) {
            zombie.attack(player);
        // }
        if (!player.alive) {
            this.game.state.start('gameover', true, false, game.score);
        }
    },
    score: 0,
    money: 0
};




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
    // game.player = new Player(this.game, game.world.centerX, game.world.height);
    game.player = game.worldMap.player;
    this.game.add.existing(game.player);
    //weapon
    var gun = new Gun(this.game, game.player);
    var shotgun = new Shotgun(this.game, game.player);
    game.player.weapon = gun;
    game.player.backpack.weapons.push(gun);
    game.player.backpack.weapons.push(shotgun);

    this.game.camera.follow(game.player);

    // game.lifePanelGroup.create(10, 10, 'lifePanel');
    var panelCoordinates = {x: lifePanelConst.panelX, y: lifePanelConst.panelY};
    addSprite(game, panelCoordinates, 'lifePanel');

    var heartCoordinates = {x: lifePanelConst.heartX, y: lifePanelConst.heartY};
    addSprite(game, heartCoordinates, 'heartForLifePanel');

    var gunImagesCoordinates = {
        x: lifePanelConst.gunForLifePanelX,
        y: lifePanelConst.gunForLifePanelY
    };
    addSprite(game, gunImagesCoordinates, 'gunForLifePanel');


    game.healthBar = new HealthBar(this.game, {x: lifePanelConst.healthBarX, y: lifePanelConst.healthBarY});
    game.healthBar.setFixedToCamera(true);
    game.player.onHealthChange.add(function (percent) {
        game.healthBar.setPercent(percent);
    });


    game.bulletsTextValue = game.add.text(
        lifePanelConst.bulletsTextX,
        lifePanelConst.bulletsTextY,
        '/' + game.player.backpack.bullets[game.player.weapon.name].toString(),
        textStyleValue
    );
    game.bulletsTextValue.fixedToCamera = true;

    game.bulletsInGunTextValue = game.add.text(
        lifePanelConst.bulletsInGunTextX,
        lifePanelConst.bulletsInGunTextY,
        game.player.weapon.bulletsInGun.toString(),
        textStyleValue
    );
    game.bulletsInGunTextValue.fixedToCamera = true;

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
    this.player.weapon.update();
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
    game.physics.arcade.collide(this.player.weapon.bullets, this.worldMap.collisionLayer, this.bulletCollision, null, this);
    game.physics.arcade.overlap(
        this.player.weapon.bullets,
        this.worldMap.zombies,
        this.bulletAndZombieCollision,
        null,
        this
    );
    game.physics.arcade.collide(this.player, this.worldMap.coins, this.coinCollision, null, this);
    game.physics.arcade.collide(this.player, this.worldMap.zombies, this.zombieAndPlayerCollision, null, this);

    game.scoreTextValue.text = this.score.toString();
    game.moneyTextValue.text = this.money.toString();
    game.bulletsInGunTextValue.text = game.player.weapon.bulletsInGun;
    game.bulletsTextValue.text = '/' + game.player.backpack.bullets[game.player.weapon.name];
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.coins);
    // this.game.debug.text('Sprite z-depth: ' + sprite.z, 10, 20);
}

module.exports = game;
