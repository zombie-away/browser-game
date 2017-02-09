var properties = require('./properties');
var Zombie = require('./zombie.js');
var WorldLoader = function (game, map, tilesets) {
    this.map = game.add.tilemap(map);
    this.map.addTilesetImage('tileset', 'tiles');
    this.map.addTilesetImage('collisiontile', 'collisionTile');

    this.collisionLayer = this.map.createLayer('collisions');
    this.baseLayer = this.map.createLayer('base');
    this.secondLayer = this.map.createLayer('second');
    this.thirdLayer = this.map.createLayer('third');
    this.fourthLayer = this.map.createLayer('fourth');
    this.shadowLayer = this.map.createLayer('shadow');


    this.collisionLayer.resizeWorld();
    this.baseLayer.resizeWorld();
    this.secondLayer.resizeWorld();
    this.thirdLayer.resizeWorld();
    this.fourthLayer.resizeWorld();
    this.shadowLayer.resizeWorld();

    this.baseLayer.anchor.y += 0.08;
    this.baseLayer.resize(properties.size.x, properties.size.y + 52);
    this.secondLayer.anchor.y += 0.08;
    this.secondLayer.resize(properties.size.x, properties.size.y + 52);
    this.thirdLayer.anchor.y += 0.08;
    this.thirdLayer.resize(properties.size.x, properties.size.y + 52);
    this.fourthLayer.anchor.y += 0.08;
    this.fourthLayer.resize(properties.size.x, properties.size.y + 52);
    this.shadowLayer.anchor.y += 0.08;
    this.shadowLayer.resize(properties.size.x, properties.size.y + 52);



    this.map.setCollision([38]);

    this.zombies = game.add.group();
    this.zombies.enableBody = true;
    this.map.createFromObjects('meta', 'zombie', 'zombie', 0, true, true, this.zombies, Zombie);

    this.coins = game.add.group();
    this.coins.enableBody = true;
    this.map.createFromObjects('meta', 'coin', 'coin', 0, true, false, this.coins);
    this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    this.coins.callAll('animations.play', 'animations', 'spin');

}

module.exports = WorldLoader;
