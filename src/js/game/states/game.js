var game = {
    bulletAndZombieCollision: function (bullet, zombie) {
        bullet.kill();
        zombie.kill();
        this.score += 10;
        this.scoreTextValue.text = this.score.toString();
    },
    noiseZoneAndZombieCollision: function (noiseZone, zombie) {
        zombie.target = noiseZone.parent;
    },
    bulletCollision: function (bullet, layer) {
        bullet.kill();
    },
    score: 0
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
            318, 319, 320, 321, 322, 323
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

    game.scoreTextValue
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.player.aura);
    // this.game.debug.spriteCorners(game.player.aura, true, true);
}

module.exports = game;
