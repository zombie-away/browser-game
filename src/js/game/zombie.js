var Being = require('./being.js');
var Zombie = function (game, x, y) {
    Being.call(this, game, x, y, 'zombie');
}

Zombie.prototype = Object.create(Being.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.update = function() {
    if (this.target) {
        this.turnToTarget(this.target);
        this.game.physics.arcade.moveToObject(this, this.target, 100);
    }
};

module.exports = Zombie;
