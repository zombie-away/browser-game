var properties = require('./properties');
var Zombie = require('./zombie');
var Spawner = require('./spawner');
var Player = require('./player');
var Coin = require('./box/coin');
var serializer = require('../lib/serializer');
var Gun = require('./gun');
var AK47 = require('./ak47');
var Shotgun = require('./shotgun');
var SaveBox = require('./box/saveBox');
var GunBox = require('./box/bullets/gunBox');
var ShotGunBox = require('./box/bullets/shotGunBox');
var HealthBox = require('./box/health');
var weaponNames = require('./constants/weapon');

function loadBox(game, world, name, spriteObject) {
    var result = game.add.group();
    result.enableBody = true;
    world.map.createFromObjects('meta', name, name, 0, true, true, result, spriteObject);

    return result;
}

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
        this.players = loadBox(game, this, 'player', Player);
        this.player = this.players.children[0];
    } else {
        this.player = Player.deserialize(options.player, game);
    }

    this.createLayer('second', 'secondLayer');
    this.createLayer('third', 'thirdLayer');

    var zombies = loadBox(game, this, 'zombie', Zombie);
    this.coins = loadBox(game, this, 'coin', Coin);
    this.saveBoxes = loadBox(game, this, 'savepoint', SaveBox);
    this.healthBoxes = loadBox(game, this, 'health', HealthBox);
    this.bulletsBoxes = loadBox(game, this, 'shotGunBox', ShotGunBox);
    this.bulletsBoxes.addMultiple(loadBox(game, this, 'gunBox', GunBox));

    Spawner.zombies = game.add.group();
    this.spawners = loadBox(game, this, 'spawner', Spawner);
    this.zombies = Spawner.zombies;
    this.zombies.addMultiple(zombies);

    this.map.setCollision([1]);
    if (options.player) {
        var loadData = WorldLoader.deserialize(options, game);
        this.coins.removeAll();
        this.zombies.removeAll();
        this.saveBoxes.removeAll();
        this.healthBoxes.removeAll();
        this.bulletsBoxes.removeAll();
        this.coins.addMultiple(loadData.coins);
        this.zombies.addMultiple(loadData.zombies);
        this.saveBoxes.addMultiple(loadData.saveBoxes);
        this.healthBoxes.addMultiple(loadData.healthBoxes);
        this.bulletsBoxes.addMultiple(loadData.bulletsBoxes);
        this.player = loadData.player;
    }
};

WorldLoader.prototype.createLayer = function (key, layerName) {
    this[layerName] = this.map.createLayer(key);
    this[layerName].resizeWorld();
};

function serializeArray(array) {
    return array.reduce(function (acc, item) {
        if (item.alive) {
            acc.push(item.serialize());
        }
        return acc;
    }, []);
}

WorldLoader.prototype.serialize = function () {
    var fields = [
        'zombies',
        'coins',
        'saveBoxes',
        'map',
        'player',
        'bulletsBoxes',
        'healthBoxes'
    ];
    var serializeObject = {
        zombies: serializeArray(this.zombies.children),
        coins: serializeArray(this.coins.children),
        saveBoxes: serializeArray(this.saveBoxes.children),
        healthBoxes: serializeArray(this.healthBoxes.children),
        bulletsBoxes: serializeArray(this.bulletsBoxes.children),
        map: this.map.key,
        player: this.player
    };

    return serializer.serialize(serializeObject, fields);
};

WorldLoader.deserialize = function (data, game) {
    return {
        coins: data.coins.map(function (coin) {
            return new Coin(game, coin.x, coin.y);
        }),
        zombies: data.zombies.map(function (zombie) {
            return Zombie.deserialize(zombie, game);
        }),
        saveBoxes: data.saveBoxes.map(function (box) {
            return new SaveBox(game, box.x, box.y);
        }),
        healthBoxes: data.healthBoxes.map(function (box) {
            return new HealthBox(game, box.x, box.y);
        }),
        bulletsBoxes: data.bulletsBoxes.map(function (box) {
            if (box.type === weaponNames.gunName) {
                return new GunBox(game, box.x, box.y);
            }

            return new ShotGunBox(game, box.x, box.y);
        }),
        player: Player.deserialize(data.player, game)
    };
};

function layerOffset(layer) {
    layer.anchor.y += 0.08;
    layer.resize(properties.size.x, properties.size.y + 52);
}

module.exports = WorldLoader;
