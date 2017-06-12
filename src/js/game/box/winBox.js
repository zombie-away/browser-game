var Box = require('./box.js');

var WinBox = function (game, x, y) {
    Box.call(this, game, x, y, 'arrows');
    this.animations.add('flicker');
    this.animations.play('flicker', 10, true);
}

WinBox.prototype = Object.create(Box.prototype);
WinBox.prototype.constructor = WinBox;
WinBox.prototype.endGame = function () {
    this.game.state.start('win', true, false, game.score);
};

module.exports = WinBox;
