var Box = require('./box.js');

var Coin = function (game, x, y) {
    Box.call(this, game, x, y, 'coin');
}

Coin.prototype = Object.create(Box.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.update = function () {
};

module.exports = Coin;
