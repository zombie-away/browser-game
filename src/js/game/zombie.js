var Being = require('./being.js');
var serializer = require('../lib/serializer');

var Zombie = function (game, x, y) {
    Being.call(this, game, x, y, 'zombie');

    this.events.onKilled.add(function (zombie) {
        var deadZombie = game.add.sprite(zombie.x, zombie.y, 'deadZombie');
        deadZombie.anchor.setTo(0.5);
    }, this);
}

Zombie.prototype = Object.create(Being.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.serialize = function () {
    var fields = [
        'health',
        'target',
        'maxHealth',
        'attackPower',
        'alive',
        'x',
        'y'
    ];

    return serializer.serialize(this, fields);
};

Zombie.deserialize = function (zombieData, game) {
    var instance = new this(game, zombieData.x, zombieData.y);
    instance.health = zombieData.health;
    instance.target = zombieData.target;
    instance.attackPower = zombieData.attackPower;
    instance.alive = zombieData.alive;

    return instance;
};

Zombie.prototype.update = function() {
    if (!this.alive) this.kill();
    if (this.target) {
        this.turnToTarget(this.target);
        this.game.physics.arcade.moveToObject(this, this.target, 100);
    }
};

module.exports = Zombie;
