var GameOver = {
    score: 0,
    init: function (param) {
        this.score = param;
        console.log(param);
    },
    create: function ()
    {
        this.add.button(0, 0, 'playBtn', this.startGame, this);
        this.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center" });
        this.add.text(350, 348, this.score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
    },
    startGame: function ()
    {
        this.state.start('game');
    }
};

module.exports = GameOver;
