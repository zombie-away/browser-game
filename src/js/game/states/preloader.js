var preloader = {};

preloader.preload = function () {
    this.game.load.image('player', 'images/hero.png');
    // this.game.load.image('player', 'images/bullet.png');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
