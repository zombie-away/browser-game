var _ = require('lodash'),
    properties = require('./properties'),
    states = {
        boot: require('./states/boot'),
        preloader: require('./states/preloader'),
        menu: require('./states/menu'),
        game: require('./states/game'),
        gameover: require('./states/gameover'),
        win: require('./states/win')
    },
    game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game');
    // game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game');
    // game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game');

// Automatically register each state.
_.each(states, function(state, key) {
    game.state.add(key, state);
});

game.state.start('boot');
