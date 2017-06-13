var Box = require('./box.js');

var Coin = function (game, x, y) {
    Box.call(this, game, x, y, 'coin');
    this.animations.add('spin');
    this.animations.play('spin', 10, true);

    this.sound = game.add.audio('audio-money');
};

Coin.prototype = Object.create(Box.prototype);
Coin.prototype.constructor = Coin;

module.exports = Coin;
