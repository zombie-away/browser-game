var addMenuOption = require('../../lib/addOption');
// var properties = require('../properties');
var textStyle = require('../constants/textStyle').gameoverScore;

var GameOver = {
    init: function (param) {
        this.score = param ? param.toString() : '0';
    },
    create: function ()
    {
        var title = this.add.sprite(this.game.camera.width / 2, 100, 'gameover');
        var coords = {
            x: this.game.camera.width / 2,
            y: this.game.camera.height / 2 + 100
        };
        var optionNewText = 'Новая игра';
        var optionContinueText = 'Продолжить';
        var optionNew = addMenuOption(this.game, optionNewText, coords,
            function (target) {
                this.startGame();
            }.bind(this)
        );

        title.anchor.setTo(0.5);
        this.stage.backgroundColor = "#fff";
        optionNew.anchor.setTo(0.5);
        coords.y = coords.y + 50;
        var optionContinue = addMenuOption(this.game, optionContinueText, coords,
            function (target) {
                this.continueGame();
            }.bind(this)
        );
        optionContinue.anchor.setTo(0.5);
        this.add.text(this.game.camera.width / 2 - 25, this.game.camera.height / 2, 'Очки', textStyle);
        this.add.text(this.game.camera.width / 2 + 25, this.game.camera.height / 2, this.score, textStyle);
    },
    startGame: function ()
    {
        this.state.start('game', true, false, 'new');
    },
    continueGame: function () {
        this.state.start('game', true, false, 'continue');
    }
};

module.exports = GameOver;
