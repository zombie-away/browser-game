var Menu = {
    create: function ()
    {
        this.add.sprite(0, 0, 'menu');
        console.log(this);
        this.add.button(this.world.centerX, this.world.centerY, 'playBtn', this.startGame, this);
    },
    startGame: function ()
    {
        this.state.start('game');
    }
};

module.exports = Menu;
