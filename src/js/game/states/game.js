var game = {
    bulletAndZombieCollision: function (bullet, zombie) {
        bullet.kill();
        zombie.kill();
        this.score += 10;
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
        player.kill();
        this.game.state.start('gameover', true, false, game.score);
    },
    score: 0,
    money: 0
};
var Player = require('../player.js');
var Gun = require('../gun.js');
var Zombie = require('../zombie.js');
game.create = function () {
    game.map = this.game.add.tilemap('map');
    game.map.addTilesetImage('tiles', 'tiles');
    // game.map.addTilesetImage('pavement_tiles', 'tiles_pavement');
    // game.map.addTilesetImage('grass', 'tiles_grass');
    // game.map.addTilesetImage('house1', 'tiles_house1');
    // game.map.addTilesetImage('house2', 'tiles_house2');
    // game.map.addTilesetImage('house3', 'tiles_house3');


    game.layer = game.map.createLayer('first layer');
    // game.map.set
    game.layer.resizeWorld();
    game.layer2 = game.map.createLayer('second layer');
    game.map.setCollision(
        [
            14, 15, 16,
            219, 220, 221, 222, 223, 224,
            244, 245, 246, 247, 248, 249,
            269, 270, 271, 272, 273, 274,
            294, 295, 296, 297, 298, 299,
            319, 320, 321, 322, 323, 324
        ], true, game.layer2);
    game.layer2.resizeWorld();

    //zombies
    game.zombies = this.game.add.group();
    game.zombies.enableBody = true;
    game.map.createFromObjects('Obj Layer 1', 'zombie', 'zombie', 0, true, true, game.zombies, Zombie);

    //player
    game.player = new Player(this.game, game.world.centerX, game.world.height - 200);
    this.game.add.existing(game.player);
    //weapon
    game.weapon = new Gun(this.game, game.player);

    this.game.camera.follow(game.player);

    var textStyleKey = { font: "bold 25px sans-serif", fill: "#46c0f9", align: "center" };
    var textStyleValue = { font: "bold 25px sans-serif", fill: "#e1e1e1", align: "center" };
    var scoreKey = game.add.text(32, 40, "SCORE",  textStyleKey);
    scoreKey.fixedToCamera = true;
    game.scoreTextValue = game.add.text(130, 40, game.score.toString(),  textStyleValue);
    game.scoreTextValue.fixedToCamera = true;


    game.coins = game.add.group();
    game.coins.enableBody = true;
    game.map.createFromObjects('Obj Layer 1', 'coin', 'coin', 0, true, false, game.coins);
    game.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    game.coins.callAll('animations.play', 'animations', 'spin');


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
        this.zombies,
        this.noiseZoneAndZombieCollision,
        null,
        this
    );
    game.physics.arcade.collide(this.player, this.layer2);
    game.physics.arcade.collide(this.zombies, this.layer2);
    game.physics.arcade.collide(this.weapon.bullets, this.layer2, this.bulletCollision, null, this);
    game.physics.arcade.overlap(
        this.weapon.bullets,
        this.zombies,
        this.bulletAndZombieCollision,
        null,
        this
    );
    game.physics.arcade.collide(this.player, this.coins, this.coinCollision, null, this);
    game.physics.arcade.collide(this.player, this.zombies, this.zombieAndPlayerCollision, null, this);

    game.scoreTextValue.text = this.score.toString();
    game.moneyTextValue.text = this.money.toString();
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.coins);
}

module.exports = game;
