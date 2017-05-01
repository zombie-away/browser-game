var properties = require('./properties');
var Zombie = require('./zombie.js');
var Player = require('./player.js');
var Coin = require('./box/coin.js');

var WorldLoader = function (game, map, tilesets) {
    game.stage.backgroundColor = "#e1e1e1";
    this.map = game.add.tilemap(map);
    this.map.addTilesetImage('collision', 'collision-tiles');
    this.map.addTilesetImage('house', 'house-tiles');
    this.map.addTilesetImage('dirt', 'dirt-tiles');
    this.map.addTilesetImage('grass', 'grass-tiles');
    this.map.addTilesetImage('rock', 'rock-tiles');
    this.map.addTilesetImage('dungeon', 'dungeon-tiles');
    this.map.addTilesetImage('trunk', 'trunk-tiles');
    this.map.addTilesetImage('treetop', 'treetop-tiles');
    this.map.addTilesetImage('water', 'water-tiles');
    this.map.addTilesetImage('watergrass', 'watergrass-tiles');
    this.map.addTilesetImage('mountains', 'mountains-tiles');
    this.map.addTilesetImage('cup', 'cup-tiles');
    this.map.addTilesetImage('signs', 'signs-tiles');
    // this.map.addTilesetImage('collisiontile', 'collisionTile');

    this.createLayer('collisions', 'collisionLayer');

    this.players = game.add.group();
    this.players.enableBody = true;
    // this.map.createFromObjects('meta', 'player', 'player', 0, true, true, this.players, Player);
    // this.player = this.players.children[0];
    if (!this.players.length) {
        this.player = new Player(game, game.world.centerX, game.world.height);
    }
    // game.player = new Player(this.game, game.world.centerX, game.world.height);

    this.createLayer('base', 'baseLayer');

    this.zombies = game.add.group();
    this.zombies.enableBody = true;
    // this.map.createFromObjects('meta', 'zombie', 'zombie', 0, true, true, this.zombies, Zombie);
    this.createLayer('second', 'secondLayer');
    this.createLayer('third', 'thirdLayer');


    this.map.setCollision([1]);

    this.coins = game.add.group();
    this.coins.enableBody = true;
    // this.map.createFromObjects('meta', 'coin', 'coin', 0, true, true, this.coins, Coin);

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
