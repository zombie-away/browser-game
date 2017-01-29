var test = function () {
    console.log('BUUUUM');
}
var game = {};
var Player = require('../player.js');
var Gun = require('../gun.js');
var Zombie = require('../zombie.js');
game.create = function () {
    // background
    this.game.stage.backgroundColor = "#4488AA";
    //player
    game.player = new Player(this.game, game.world.centerX, 500);
    game.weapon = new Gun(this.game, game.player);
    game.zombie = new Zombie(this.game, 0, game.world.centerY);
    this.game.add.existing(game.player);
    this.game.add.existing(game.zombie);

};

game.update = function () {
    game.weapon.update();
    game.physics.arcade.overlap(game.player.aura, game.zombie, collideAuraHandler, null, this);
}

function collideAuraHandler(aura, zombie) {
    zombie.target = aura.parent;
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.player.aura);
    // this.game.debug.spriteCorners(game.player.aura, true, true);
}

module.exports = game;
