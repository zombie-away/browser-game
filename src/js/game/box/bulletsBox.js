var Box = require('./box.js');

var BulletsBox = function (game, x, y) {
    Box.call(this, game, x, y, 'coin');
}

BulletsBox.prototype = Object.create(Box.prototype);
BulletsBox.prototype.constructor = BulletsBox;

BulletsBox.prototype.update = function () {
};

module.exports = BulletsBox;
