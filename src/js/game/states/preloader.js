var preloader = {};

preloader.preload = function () {
    this.game.load.image('player', 'images/hero.png');
    this.game.load.image('bullet', 'images/bullet.png');
    this.game.load.image('shot', 'images/shot.png');
    this.game.load.image('zombie', 'images/zombie.png');
    this.game.load.image('deadZombie', 'images/deadzombie.png');
    this.game.load.image('aura', 'images/playerzone.png');
    this.game.load.image('cursor', 'images/cursor.png');
    this.game.load.image('lifePanel', 'images/lifePanel.png');
    this.game.load.image('heartForLifePanel', 'images/heart.png');
    this.game.load.image('gunForLifePanel', 'images/gunForLifeBar.png');

    this.game.load.tilemap('map', 'tilemaps/maps/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'tilemaps/tiles/tileset.png', 40, 68);
    this.game.load.image('collisionTile', 'tilemaps/tiles/collision.png', 40, 68);

    this.game.load.spritesheet('coin', 'images/coin.png', 27, 27, 5);

    this.game.load.image('menu', 'images/menu.jpg');
    this.game.load.image('playBtn', 'images/playbtn.png');
    this.game.load.image('gameover', 'images/gameover.png');
};

preloader.create = function () {
    // this.game.state.start('menu');
    this.game.state.start('game');
};

module.exports = preloader;
