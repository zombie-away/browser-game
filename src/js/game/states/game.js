var game = {};
var Player = require('../player.js');
var Gun = require('../gun.js');
// var player;
var bullet;
var weapon;
game.create = function () {
    // background
    this.game.stage.backgroundColor = "#4488AA";
    //player
    game.player = new Player(this.game, game.world.centerX, 500);
    game.weapon = new Gun(this.game, game.player);
    this.game.add.existing(
       game.player
    );
};

game.update = function () {
    game.weapon.update();
}

module.exports = game;
