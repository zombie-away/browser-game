module.exports = function (game, text, coords, callback) {
    var optionStyle = {
        font: '35px Segoe Script',
        fill: '#111',
        stroke: 'rgba(0,0,0,0)',
        srokeThickness: 4
    };
    var txt = game.add.text(coords.x, coords.y, text, optionStyle);
    txt.lineSpacing = -20;
    var onOver = function (target) {
        target.fill = "#FEFFD5";
        target.stroke = "rgba(50,50,50,0.5)";
    };
    var onOut = function (target) {
        target.fill = "#111";
        target.stroke = "rgba(0,0,0,0)";
    };
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(onOver);
    txt.events.onInputOut.add(onOut);

    return txt;
};
