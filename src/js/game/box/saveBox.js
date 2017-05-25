var Box = require('./box.js');

var SaveBox = function (game, x, y) {
    Box.call(this, game, x, y, 'floppy');
    this.animations.add('turn', Phaser.Animation.generateFrameNames('floppy_', 1, 12, '.png', 4), 10, true, false);
    this.animations.play('turn', 10, true);
}

SaveBox.prototype = Object.create(Box.prototype);
SaveBox.prototype.constructor = SaveBox;

module.exports = SaveBox;
