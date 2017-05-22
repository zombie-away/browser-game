var Menu = {
    preload: function () {
        this.optionCount = 0;
    },
    addMenuOption: function(text, callback) {
        var optionStyle = { font: '35px Segoe Script', fill: '#111', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        var txt = this.game.add.text((this.optionCount * 200) + 80, this.world.centerY + 230, text, optionStyle);
        var onOver = function (target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(50,50,50,0.5)";
        };
        var onOut = function (target) {
            target.fill = "#111";
            target.stroke = "rgba(0,0,0,0)";
        };
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(onOver);
        txt.events.onInputOut.add(onOut);
        this.optionCount++;
    },
    create: function ()
    {
        this.add.sprite(0, 0, 'menu');
        this.addMenuOption('Новая', function (target) {
            this.startGame();
        });
        this.addMenuOption('Продолжить', function (target) {
            console.log('You clicked Продолжить !');
        });
    },
    startGame: function ()
    {
        this.state.start('game');
    }
};

module.exports = Menu;
