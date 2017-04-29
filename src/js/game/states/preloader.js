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

    this.game.load.tilemap('map', 'tilemaps/maps/new-lvl1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('collision-tiles', 'tilemaps/tiles/collision.png', 16, 16);
    this.game.load.image('house-tiles', 'tilemaps/tiles/house.png', 16, 16);
    this.game.load.image('dirt-tiles', 'tilemaps/tiles/dirt.png', 16, 16);
    this.game.load.image('grass-tiles', 'tilemaps/tiles/grass.png', 16, 16);
    this.game.load.image('rock-tiles', 'tilemaps/tiles/rock.png', 16, 16);
    this.game.load.image('dungeon-tiles', 'tilemaps/tiles/dungeon.png', 16, 16);
    this.game.load.image('trunk-tiles', 'tilemaps/tiles/trunk.png', 16, 16);
    this.game.load.image('treetop-tiles', 'tilemaps/tiles/treetop.png', 16, 16);
    this.game.load.image('water-tiles', 'tilemaps/tiles/water.png', 16, 16);
    this.game.load.image('watergrass-tiles', 'tilemaps/tiles/watergrass.png', 16, 16);
    this.game.load.image('mountains-tiles', 'tilemaps/tiles/mountains.png', 16, 16);
    this.game.load.image('cup-tiles', 'tilemaps/tiles/cup.png', 16, 16);
    this.game.load.image('signs-tiles', 'tilemaps/tiles/signs.png', 16, 16);
    // this.game.load.image('collisionTile', 'tilemaps/tiles/collision.png', 16, 16);

    this.game.load.spritesheet('coin', 'images/coin.png', 27, 27, 5);
    this.game.load.image('healthBox', 'images/healthBox.png');
    this.game.load.image('bulletsBox', 'images/bulletsBox.png');

    this.game.load.image('spawner', 'images/spawner.png');
    this.game.load.image('pause-btn', 'images/pause-btn.png');

    this.game.load.image('menu', 'images/menu.jpg');
    this.game.load.image('playBtn', 'images/playbtn.png');
    this.game.load.spritesheet('button-start', 'images/button-start.png', 196, 70);
    this.game.load.spritesheet('playBtn', 'images/playbtn.png');
    this.game.load.image('gameover', 'images/gameover.png');


    // this.game.load.audio('game', ['../../audio/game.mp3']);
};

preloader.create = function () {
    this.game.state.start('menu');
    // this.game.state.start('game');
};

module.exports = preloader;
