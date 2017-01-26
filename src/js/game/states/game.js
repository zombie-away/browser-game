var game = {};
var Player = require('../player.js');
var player;
var bullet;
game.create = function () {
    // background
    this.game.stage.backgroundColor = "#4488AA";
    //player
    this.game.add.existing(
       new Player(this.game, game.world.centerX, 500)
    );
};

game.update = function () {
}

module.exports = game;
