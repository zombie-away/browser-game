var Box = require('./box.js');

var HealthBox = function (game, x, y) {
    Box.call(this, game, x, y, 'healthBox');

    this.health = 1;
}

HealthBox.prototype = Object.create(Box.prototype);
HealthBox.prototype.constructor = HealthBox;

HealthBox.prototype.update = function () {
};

module.exports = HealthBox;
