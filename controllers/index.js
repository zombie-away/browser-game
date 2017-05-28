const properties = require('../src/js/game/properties');

module.exports = {
    getGame: function (req, res) {
        res.render('index', { properties });
    }
};
