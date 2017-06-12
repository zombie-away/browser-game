var preloader = {};

preloader.preload = function () {
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    // this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    // phaser.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.game.scale.setResizeCallback(function() {
    //     this.game.scale.setMaximum();
    // }.bind(this));
    // this.game.scale.setShowAll();
    // window.addEventListener('resize', function () {
    //     this.game.scale.refresh();
    // });

    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    // this.game.scale.startFullScreen(false);
    // this.game.scale.refresh();

    this.game.load.image('player', 'images/player-image.png');
    this.game.load.image('gun', 'images/gun-image.png');

    // walk animation images
    this.game.load.atlasJSONHash('legs', 'images/legs.png', 'images/legs.json');
    this.game.load.atlasJSONHash('zombies', 'images/zombies.png', 'images/zombie-sheets.json');

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

    // save box spritesheet
    this.game.load.atlasJSONHash('floppy', 'images/floppy-sheets.png', 'images/floppy-sheets.json');

    this.game.load.image('spawner', 'images/spawner.png');
    this.game.load.image('pause-btn', 'images/pause-btn.png');

    this.game.load.image('menu', 'images/menu.jpg');
    this.game.load.spritesheet('playBtn', 'images/playbtn.png');
    this.game.load.image('gameover', 'images/gameover.png');


    // this.game.load.audio('game', ['../../audio/game.mp3']);
    this.game.load.audio('audio-shotgun', 'audio/shotgun.wav');
    this.game.load.audio('audio-gun', 'audio/gun.wav');
    this.game.load.audio('audio-ak47', 'audio/ak47.wav');
    this.game.load.audio('audio-cock', 'audio/cock.wav');
    this.game.load.audio('audio-money', 'audio/money.mp3');
    this.game.load.audio('audio-bullet-box', 'audio/bullet-box.wav');
    this.game.load.audio('audio-health-box', 'audio/health-box.mp3');

    // центрирование
    // this.game.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;

    // this.scale.setShowAll();
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVeritcally = true;
    // this.game.scale.refresh();

    this.game.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.minWidth = 0;
    // this.scale.minHeight = 0;
    // this.scale.maxWidth = 1768;
    // this.scale.maxHeight = 1152;
};

preloader.create = function () {
    this.game.state.start('menu');
};

module.exports = preloader;
