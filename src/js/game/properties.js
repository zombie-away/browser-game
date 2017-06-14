var npmProperties = require('../../../package.json');

module.exports = {
        title: 'Zombie-away',
        description: npmProperties.description,
        port: 3017,
        liveReloadPort: 3018,
        mute: false,
        showStats: false,
        size: {
            x: 480,
            y: '100%'
        }
    };
