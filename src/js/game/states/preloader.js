var preloader = {};

preloader.preload = function () {
    this.game.load.image('player', 'images/hero.png');
    this.game.load.image('bullet', 'images/bullet.png');
    this.game.load.image('zombie', 'images/zombie.png');
    this.game.load.image('aura', 'images/playerzone.png');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
