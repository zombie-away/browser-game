var preloader = {};

preloader.preload = function () {
    this.game.load.image('player', 'images/hero.png');
    this.game.load.image('bullet', 'images/bullet.png');
    this.game.load.image('shot', 'images/shot.png');
    this.game.load.image('zombie', 'images/zombie.png');
    this.game.load.image('aura', 'images/playerzone.png');

    this.game.load.tilemap('map', 'tilemaps/maps/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'tilemaps/tiles/tileset.png', 40, 68);
    this.game.load.image('collisionTile', 'tilemaps/tiles/collision.png', 40, 68);

    // this.game.load.tilemap('map', 'tilemaps/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
    // this.game.load.image('tiles', 'tilemaps/tiles/tileset.png');
    // this.game.load.image('collisionTile', 'tilemaps/tiles/collision.png');

    // this.game.load.image('tiles', 'tilemaps/maps/tileset.tsx');
    // this.game.load.image('tiles', 'tilemaps/maps/tileset.tsx');
    // this.game.load.image('tiles', 'tilemaps/maps/tileset.tsx');
    // this.game.load.image('tiles', 'tilemaps/maps/tileset.tsx');
    // this.game.load.image('tiles', 'tilemaps/maps/tileset.tsx');

    // this.game.load.tilemap('map', 'tilemaps/maps/t_level_1.json', null, Phaser.Tilemap.TILED_JSON);
    // this.game.load.image('tiles', 'tilemaps/tiles/var2/tiles.png');

    // this.game.load.image('tiles_grass', 'tilemaps/tiles/grass.jpg');
    // this.game.load.image('tiles_pavement', 'tilemaps/tiles/pavement.jpg');
    // this.game.load.image('tiles_house1', 'tilemaps/tiles/house1.jpg');
    // this.game.load.image('tiles_house2', 'tilemaps/tiles/house2.jpg');
    // this.game.load.image('tiles_house3', 'tilemaps/tiles/house3.jpg');

    this.game.load.spritesheet('coin', 'images/coin.png', 27, 27);

    this.game.load.image('menu', 'images/menu.jpg');
    this.game.load.image('playBtn', 'images/playbtn.png');
    this.game.load.image('gameover', 'images/gameover.png');
};

preloader.create = function () {
    // this.game.state.start('menu');
    this.game.state.start('game');
};

module.exports = preloader;
