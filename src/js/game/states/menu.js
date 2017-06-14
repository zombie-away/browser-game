var addMenuOption = require('../../lib/addOption');

var Menu = {
    create: function () {
        this.stage.backgroundColor = "#fff";
        var coords = {
            x: this.game.camera.width / 2,
            y: this.game.camera.height / 2 + 100
        };
        this.add.sprite(0, 0, 'menu');
        var option = addMenuOption(this.game, 'Новая', coords, function (target) {
            this.startGame();
        }.bind(this));
        option.anchor.setTo(0.5);
        coords.y = coords.y + 50;
        option = addMenuOption(this.game, 'Продолжить', coords, function (target) {
            this.continueGame();
        }.bind(this));
        option.anchor.setTo(0.5);
    },
    startGame: function () {
        this.state.start('game', true, false, 'new');
    },
    continueGame: function () {
        this.state.start('game', true, false, 'continue');
    }
};

module.exports = Menu;
