var addMenuOption = require('../../lib/addOption');

var Menu = {
    preload: function () {
        this.optionCount = 0;
    },
    create: function ()
    {
        var coords = {
            x: 70,
            y: this.game.camera.height / 2 + 230
        };
        this.add.sprite(0, 0, 'menu');
        addMenuOption(this.game, 'Новая', coords, function (target) {
            this.startGame();
        }.bind(this));
        coords.x = this.game.camera.width - 330;
        addMenuOption(this.game, 'Продолжить', coords, function (target) {
            this.continueGame();
        }.bind(this));
    },
    startGame: function ()
    {
        this.state.start('game', true, false, 'new');
    },
    continueGame: function () {
        this.state.start('game', true, false, 'continue');
    }
};

module.exports = Menu;
