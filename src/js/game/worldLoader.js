var properties = require('./properties');
var Zombie = require('./zombie');
var Spawner = require('./spawner');
var Player = require('./player');
var Coin = require('./box/coin');
var serializer = require('../lib/serializer');
var Gun = require('./gun');
var AK47 = require('./ak47');
var Shotgun = require('./shotgun');

var WorldLoader = function (game, map, options = {}) {
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

    this.createLayer('collisions', 'collisionLayer');
    this.createLayer('base', 'baseLayer');

    if (!options.player) {
        this.players = game.add.group();
        this.players.enableBody = true;
        this.map.createFromObjects('meta', 'player', 'player', 0, true, true, this.players, Player);
        this.player = this.players.children[0];
    } else {
        this.player = Player.deserialize(options.player, game);
    }

    this.createLayer('second', 'secondLayer');
    this.createLayer('third', 'thirdLayer');

    var zombies = game.add.group();
    if (!options.zombies) {
        this.map.createFromObjects('meta', 'zombie', 'zombie', 0, true, true, zombies, Zombie);
    }

    this.spawners = game.add.group();
    this.spawners.enableBody = true;
    Spawner.zombies = game.add.group();
    this.map.createFromObjects('meta', 'spawner', 'spawner', 0, true, true, this.spawners, Spawner);

    this.zombies = Spawner.zombies;
    this.zombies.addMultiple(zombies);
    this.map.setCollision([1]);

    this.coins = game.add.group();
    this.coins.enableBody = true;
    if (!options.coins) {
        this.map.createFromObjects('meta', 'coin', 'coin', 0, true, true, this.coins, Coin);
    }

    if (options.player) {
        var loadData = WorldLoader.deserialize(options, game);
        this.coins.removeAll();
        this.zombies.removeAll();
        this.coins.addMultiple(loadData.coins);
        this.zombies.addMultiple(loadData.zombies);
        this.player = loadData.player;
    }
};

WorldLoader.prototype.createLayer = function (key, layerName) {
    this[layerName] = this.map.createLayer(key);
    this[layerName].resizeWorld();
};

function serializeArray(array) {
    var result = array.map(function (item) {
        return item.serialize();
    });

    return result;
}

WorldLoader.prototype.serialize = function () {
    var fields = [
        'zombies',
        'coins',
        'map',
        'player'
    ];
    var serializeObject = {
        zombies: serializeArray(this.zombies.children),
        coins: serializeArray(this.coins.children),
        map: this.map.key,
        player: this.player
    };

    return serializer.serialize(serializeObject, fields);
};

WorldLoader.deserialize = function (data, game) {
    var result = {
        coins: data.coins.map(function (coin) {
            return new Coin(game, coin.x, coin.y);
        }),
        zombies: data.zombies.map(function (zombie) {
            return Zombie.deserialize(zombie, game);
        }),
        player: Player.deserialize(data.player, game)
    };

    console.log(result);

    return result;
};

function layerOffset(layer) {
    layer.anchor.y += 0.08;
    layer.resize(properties.size.x, properties.size.y + 52);
}

module.exports = WorldLoader;
