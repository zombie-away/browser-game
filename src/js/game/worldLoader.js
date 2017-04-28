var properties = require('./properties');
// var Zombie = require('./zombie');
var Spawner = require('./spawner');
var Player = require('./player');
var Coin = require('./box/coin');

var WorldLoader = function (game, map, tilesets) {
    game.stage.backgroundColor = "#e1e1e1";
    this.map = game.add.tilemap(map);
    this.map.addTilesetImage('tileset', 'tiles');
    this.map.addTilesetImage('collisiontile', 'collisionTile');

    this.createLayer('collisions', 'collisionLayer');

    this.players = game.add.group();
    this.players.enableBody = true;
    this.map.createFromObjects('meta', 'player', 'player', 0, true, true, this.players, Player);
    this.player = this.players.children[0];
    if (!this.players.length) {
        this.player = new Player(game, game.world.centerX, game.world.height);
    }

    this.createLayer('base', 'baseLayer');

    this.spawners = game.add.group();
    this.spawners.enableBody = true;
    Spawner.zombies = game.add.group();
    this.map.createFromObjects('meta', 'spawner', 'spawner', 0, true, true, this.spawners, Spawner);

    this.zombies = Spawner.zombies;

    this.createLayer('second', 'secondLayer');
    this.createLayer('third', 'thirdLayer');
    this.createLayer('fourth', 'fourthLayer');
    this.createLayer('shadow', 'shadowLayer');

    layerOffset(this.baseLayer);
    layerOffset(this.secondLayer);
    layerOffset(this.thirdLayer);
    layerOffset(this.fourthLayer);
    layerOffset(this.shadowLayer);

    this.map.setCollision([38]);

    this.coins = game.add.group();
    this.coins.enableBody = true;
    this.map.createFromObjects('meta', 'coin', 'coin', 0, true, true, this.coins, Coin);
    // this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    // this.coins.callAll('animations.play', 'animations', 'spin');

};

WorldLoader.prototype.createLayer = function (key, layerName) {
    this[layerName] = this.map.createLayer(key);
    this[layerName].resizeWorld();
};

function layerOffset(layer) {
    layer.anchor.y += 0.08;
    layer.resize(properties.size.x, properties.size.y + 52);
}

module.exports = WorldLoader;
