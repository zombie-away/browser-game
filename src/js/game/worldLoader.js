var properties = require('./properties');
var Zombie = require('./zombie');
var Spawner = require('./spawner');
var Player = require('./player');
var Coin = require('./box/coin');
var HealthBox = require('./box/health');
var BulletsBox = require('./box/bullets');

function loadBox(params) {
    params.dist = params.game.add.group();
    params.dist.enableBody = true;
    params.world.map.createFromObjects('meta', params.name, params.name, 0, true,
        true, params.dist, params.spriteObject);
}

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
    this.map.createFromObjects('meta', 'player', 'player', 0, true, true, this.players, Player);
    this.player = this.players.children[0];
    if (!this.players.length) {
        this.player = new Player(game, game.world.centerX, game.world.height);
    }

    this.createLayer('base', 'baseLayer');
    this.createLayer('second', 'secondLayer');
    this.createLayer('third', 'thirdLayer');

    var zombies = game.add.group();
    this.map.createFromObjects('meta', 'zombie', 'zombie', 0, true, true, zombies, Zombie);

    this.spawners = game.add.group();
    this.spawners.enableBody = true;
    Spawner.zombies = game.add.group();
    this.map.createFromObjects('meta', 'spawner', 'spawner', 0, true, true, this.spawners, Spawner);

    this.zombies = Spawner.zombies;
    this.zombies.addMultiple(zombies);

    this.map.setCollision([1]);

    loadBox({
        game,
        world: this,
        dist: this.coins,
        name: 'coin',
        spriteObject: Coin
    });

    loadBox({
        game,
        world: this,
        dist: this.healthBoxes,
        name: 'health',
        spriteObject: HealthBox
    });

    loadBox({
        game,
        world: this,
        dist: this.bulletsBoxes,
        name: 'bulletsBox',
        spriteObject: BulletsBox
    });
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
