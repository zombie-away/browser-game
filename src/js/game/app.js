var _ = require('lodash'),
    properties = require('./properties'),
    states = {
        boot: require('./states/boot.js'),
        preloader: require('./states/preloader.js'),
        menu: require('./states/menu.js'),
        game: require('./states/game.js'),
        gameover: require('./states/gameover.js')
    },
    game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game');
    // game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game');
    // game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game');

// Automatically register each state.
_.each(states, function(state, key) {
    game.state.add(key, state);
});

game.state.start('boot');
