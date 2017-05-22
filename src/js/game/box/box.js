var serialize = require('../../lib/serialize');

var Box = function (game, x, y, key) {

    Phaser.Sprite.call(this, game, x, y, key);

    this.animations.add('spin');

    this.animations.play('spin', 10, true);
    // this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    // this.coins.callAll('animations.play', 'animations', 'spin');
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
    console.log('update');
};

Box.prototype.serialize = function() {
    return 'Box';
};

module.exports = Box;
