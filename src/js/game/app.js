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

// Automatically register each state.
_.each(states, function(state, key) {
    game.state.add(key, state);
});
var r = '123';

game.state.start('boot');
