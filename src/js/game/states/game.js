var game = {};
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
    //player
    game.player = new Player(this.game, game.world.centerX, game.world.height - 200);
    this.game.add.existing(game.player);
    //weapon
    game.weapon = new Gun(this.game, game.player);
    //zombie
    game.zombie = new Zombie(this.game, 0, game.world.centerY);
    this.game.add.existing(game.zombie);

    this.game.camera.follow(game.player);
};

game.update = function () {
    game.weapon.update();
    //overlap noise zone and zombie
    game.physics.arcade.overlap(
        game.player.noiseZone,
        game.zombie,
        function (noiseZone, zombie) {
            zombie.target = noiseZone.parent;
        },
        null,
        this
    );
    game.physics.arcade.collide(game.player, game.layer2);
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.player.aura);
    // this.game.debug.spriteCorners(game.player.aura, true, true);
}

module.exports = game;
