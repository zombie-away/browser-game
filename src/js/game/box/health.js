var Box = require('./box.js');

var HealthBox = function (game, x, y) {
    Box.call(this, game, x, y, 'healthBox');
    this.sound = game.add.audio('audio-health-box');
    this.health = 1;
}

HealthBox.prototype = Object.create(Box.prototype);
HealthBox.prototype.constructor = HealthBox;

module.exports = HealthBox;
