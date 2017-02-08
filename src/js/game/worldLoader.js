var WorldLoader = function (game, map, tilesets) {
    this.map = game.add.tilemap(map);
    this.map.addTilesetImage('tileset', 'tiles');
    this.baseLayer = this.map.createLayer('base');
    this.secondLayer = this.map.createLayer('second');
    this.thirdLayer = this.map.createLayer('third');
    this.fourthLayer = this.map.createLayer('fourth');

    this.shadowLayer = this.map.createLayer('shadow');

    this.baseLayer.resizeWorld();
    this.secondLayer.resizeWorld();
    this.thirdLayer.resizeWorld();
    this.fourthLayer.resizeWorld();

    this.shadowLayer.resizeWorld();

    // game.layer2 = game.map.createLayer('second layer');
    // game.map.setCollision(
    //     [
    //         14, 15, 16,
    //         219, 220, 221, 222, 223, 224,
    //         244, 245, 246, 247, 248, 249,
    //         269, 270, 271, 272, 273, 274,
    //         294, 295, 296, 297, 298, 299,
    //         319, 320, 321, 322, 323, 324
    //     ], true, game.layer2);
    // game.layer2.resizeWorld();

}

module.exports = WorldLoader;
// game.map = this.

// game.map.addTilesetImage('tiles', 'q');

// game.map.addTilesetImage('tiles2', 'tiles2');


// game.map.addTilesetImage('pavement_tiles', 'tiles_pavement');
// game.map.addTilesetImage('grass', 'tiles_grass');
// game.map.addTilesetImage('house1', 'tiles_house1');
// game.map.addTilesetImage('house2', 'tiles_house2');
// game.map.addTilesetImage('house3', 'tiles_house3');


// game.layer = game.map.createLayer('first layer');
// game.map.set
