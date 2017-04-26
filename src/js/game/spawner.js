var Zombie = require('./zombie.js');

function Spawner(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spawner');

    this.zombieCount = 900;
    this.respawnDelay = 2000;
    this.spawnTimer = this.game.time.time;
    this.isPause = false;
    if (!Spawner.zombies) {
        Spawner.zombies = game.add.group();
    }
};

Spawner.prototype = Object.create(Phaser.Sprite.prototype);
Spawner.prototype.constructor = Spawner;

Spawner.prototype.update = function() {
    if (!this.isPause && this.game.time.time > this.spawnTimer && this.zombieCount > 0) {
        this.spawnTimer += this.respawnDelay;
        this.zombieCount--;
        Spawner.zombies.add(new Zombie(this.game, this.x, this.y));
    }
};

module.exports = Spawner;
