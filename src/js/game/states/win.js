var addMenuOption = require('../../lib/addOption');
var textStyle = require('../constants/textStyle').gameoverScore;

var Win = {
    init: function (param) {
        this.score = param ? param.score : '0';
        this.money = param ? param.money : '0';
    },

    create : function(){
        this.stage.backgroundColor = "#fff";
        var winTestStyle = { font: '50px Arial', fill: '#111' };
        var winLabel = this.game.add.text(this.game.width / 2, this.game.height / 2 - 100,'Ты победил!', winTestStyle);
        winLabel.anchor.setTo(0.5);
        var coords = {
            x: this.game.camera.width / 2,
            y: this.game.camera.height / 2 + 100
        };
        var startOption = addMenuOption(this.game, 'Главное меню', coords, function () {
            this.restart();
        }.bind(this));
        startOption.anchor.setTo(0.5);
        this.add.text(this.game.camera.width / 2 - 25, this.game.camera.height / 2, 'Очки', textStyle);
        this.add.text(this.game.camera.width / 2 + 25, this.game.camera.height / 2, this.score, textStyle);
        this.add.text(this.game.camera.width / 2 - 48, this.game.camera.height / 2 + 50, 'Монеты', textStyle);
        this.add.text(this.game.camera.width / 2 + 25, this.game.camera.height / 2 + 50, this.money, textStyle);
    },

    restart : function(){
        this.game.state.start('menu');
    }
};

module.exports = Win;
