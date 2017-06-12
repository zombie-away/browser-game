var Zombie = require('./zombie.js');

function Spawner(game, x, y, zombies) {
    Phaser.Sprite.call(this, game, x, y, 'spawner');
    this.zombieCount = 900;
    this.respawnDelay = 2000;
    this.spawnTimer = this.game.time.time;
    this.isPause = false;
};

Spawner.prototype = Object.create(Phaser.Sprite.prototype);
Spawner.prototype.constructor = Spawner;
Spawner.zombies = [];

function hasIntersection(x, y, radius) {
    var hasIntersectionFlag = false;
    var zombies = Spawner.zombies;
    if (zombies instanceof Phaser.Group) {
        zombies = Spawner.zombies.children;
    }
    zombies.forEach(function (zombie) {
        if (Math.abs(zombie.x - x) <= radius && Math.abs(zombie.y - y) <= radius) {
            hasIntersectionFlag = true;
        }
    });

    return hasIntersectionFlag;
};

Spawner.prototype.update = function() {
    if (!this.isPause && this.game.time.time > this.spawnTimer &&
        Spawner.zombies.length < 30 && !hasIntersection(this.x, this.y, 50)) {
        this.spawnTimer = this.respawnDelay + this.game.time.time;
        this.zombieCount--;
        if (Spawner.zombies instanceof Array) {
            Spawner.zombies.push(new Zombie(this.game, this.x, this.y));
        } else {
            Spawner.zombies.add(new Zombie(this.game, this.x, this.y));
        }
    }
};

module.exports = Spawner;
