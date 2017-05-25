var Player = require('../player');
var HealthBar = require('../HealthBar');
var lifePanelConst = require('../constants/lifePanel');
var textStyleKey = require('../constants/textStyle').textStyleKey;
var textStyleValue = require('../constants/textStyle').textStyleValue;
var serializer = require('../../lib/serializer');
var WorldLoader = require('../worldLoader.js');
var LEVELS = ['map'];
var DEFAULT_CONFIG = {
    score: 0,
    money: 0,
    level: 0
};
var Gun = require('../gun');

var game = {
    init: function (param) {
        this.mode = param;
    },
    
    bulletAndZombieCollision: function (bullet, zombie) {
        if (zombie.damage(bullet.power)) {
            this.score += 10;
        }
        bullet.kill();
    },

    noiseZoneAndZombieCollision: function (noiseZone, zombie) {
        zombie.target = noiseZone.parent;
    },

    bulletCollision: function (bullet) {
        bullet.kill();
    },

    coinCollision: function (player, coin) {
        this.money++;
        this.score += 5;
        coin.kill();
    },

    zombieAndPlayerCollision: function (player, zombie) {
        zombie.attack(player);
        if (!player.alive) {
            this.game.state.start('gameover', true, false, game.score);
        }
    },

    saveBoxCollision: function (player, box) {
        box.kill();
        this.save();
    },

    healthBoxCollision: function (player, box) {
        player.addHealth(box);
    },

    bulletsBoxesCollision: function (player, box) {
        player.addBullets(box);
    }
};

function createPlayer(game, player) {
    game.player = player;
    game.game.add.existing(player);
    game.game.camera.follow(player);
}

function musicPlay(game) {
    game.input.touch.preventDefault = false;
    var music = game.add.audio('game');

    music.play();
}

function addSprite(game, coords, spriteName) {
    var lifePanel = game.add.sprite(coords.x, coords.y, spriteName);
    lifePanel.fixedToCamera = true;
    lifePanel.anchor.setTo(0.5, 0.5);
}

function createHealthBar(game) {
    game.healthBar = new HealthBar(game.game, {x: lifePanelConst.healthBarX, y: lifePanelConst.healthBarY});
    game.healthBar.setFixedToCamera(true);
    game.player.onHealthChange.add(function (percent) {
        game.healthBar.setPercent(percent);
    });
}

function createWeaponPanel(game) {
    var bulletsTextCoords = {
        x: lifePanelConst.bulletsTextX,
        y: lifePanelConst.bulletsTextY
    };
    var text = `/${game.player.backpack.bullets[game.player.weapon.name].toString()}`;
    game.bulletsTextValue = addText(game, bulletsTextCoords, text);

    bulletsTextCoords = {
        x: lifePanelConst.bulletsInGunTextX,
        y: lifePanelConst.bulletsInGunTextY
    };
    text = game.player.weapon.bulletsInGun.toString();
    game.bulletsInGunTextValue = addText(game, bulletsTextCoords, text);
}

function addText(game, coords, text) {
    var textKey = game.add.text(coords.x, coords.y, text, textStyleKey);
    textKey.fixedToCamera = true;

    return textKey;
}

function createTextPanel(game) {
    addText(game, {x: 32, y: 40}, "SCOPE");
    game.scoreTextValue = addText(game, {x: 130, y: 40}, game.score.toString());
    addText(game, {x: 32, y: 70}, "MONEY");
    game.moneyTextValue = addText(game, {x: 130, y: 70}, game.money.toString());
}

function createHeroPanel(game) {
    var panelCoordinates = {x: lifePanelConst.panelX, y: lifePanelConst.panelY};
    var heartCoordinates = {x: lifePanelConst.heartX, y: lifePanelConst.heartY};
    var gunImagesCoordinates = {
        x: lifePanelConst.gunForLifePanelX,
        y: lifePanelConst.gunForLifePanelY
    };
    addSprite(game, panelCoordinates, 'lifePanel');
    addSprite(game, heartCoordinates, 'heartForLifePanel');
    addSprite(game, gunImagesCoordinates, 'gunForLifePanel');
    createHealthBar(game);
    createWeaponPanel(game);
}

function createInterface(game) {
    createHeroPanel(game);
    createTextPanel(game);
}

function pauseGame() {
    if (!this.game.paused) {
        this.pauseText.visible = true;
        this.game.paused = true;
    }
}

function unpause(game) {
    if (this.game.paused) {
        this.game.paused = false;
        this.pauseText.visible = false;
    }
}

function addPauseBtn(game) {
    var coords = { x: game.game.world.centerX, y: game.game.camera.height / 2 };
    game.pauseText = addText(game, coords, 'Пауза');
    game.pauseText.visible = false;
    game.pauseText.anchor.setTo(0.5, 0.5);

    game.pauseBtn = game.add.button(game.game.world.width - 60, 40, 'pause-btn', pauseGame.bind(game), game, 0, 0, 0);
    game.pauseBtn.fixedToCamera = true;
    game.game.input.onDown.add(unpause.bind(game), game);
}

game.create = function () {
    var stats = this.loadGame();
    if (this.mode === 'new') {
        stats = DEFAULT_CONFIG;
        localStorage.clear();
    }
    for (var key in stats) {
        this[key] = stats[key];
    }
    game.worldMap = new WorldLoader(this.game, LEVELS[this.level], stats.worldMap);
    //player
    createPlayer(game, game.worldMap.player);
    createInterface(game);
    addPauseBtn(this);
};

game.update = function () {
    game.player.weapon.update();
    //overlap noise zone and zombie
    game.physics.arcade.overlap(
        game.player.noiseZone,
        game.worldMap.zombies,
        game.noiseZoneAndZombieCollision,
        null,
        game
    );
    game.physics.arcade.overlap(
        game.player,
        game.worldMap.saveBoxes,
        game.saveBoxCollision,
        null,
        game
    );
    game.physics.arcade.collide(game.player, game.worldMap.collisionLayer);
    game.physics.arcade.collide(game.worldMap.zombies, game.worldMap.zombies);
    game.physics.arcade.collide(game.worldMap.zombies, game.worldMap.collisionLayer);
    game.physics.arcade.collide(
        game.player.weapon.bullets,
        game.worldMap.collisionLayer,
        game.bulletCollision,
        null,
        game
    );
    game.physics.arcade.overlap(
        game.player.weapon.bullets,
        game.worldMap.zombies,
        game.bulletAndZombieCollision,
        null, game
    );
    game.physics.arcade.collide(
        game.player,
        game.worldMap.coins,
        game.coinCollision,
        null, game
    );
    game.physics.arcade.collide(
        game.player,
        game.worldMap.zombies,
        game.zombieAndPlayerCollision,
        null, game
    );

    game.scoreTextValue.text = this.score.toString();
    game.moneyTextValue.text = this.money.toString();
    game.bulletsInGunTextValue.text = game.player.weapon.bulletsInGun;
    game.bulletsTextValue.text = '/' + game.player.backpack.bullets[game.player.weapon.name];

    game.physics.arcade.overlap(
        game.player,
        game.worldMap.healthBoxes,
        game.healthBoxCollision,
        null, game
    );

    game.physics.arcade.overlap(
        game.player,
        game.worldMap.healthBoxes,
        game.healthBoxCollision,
        null, game
    );

    game.physics.arcade.overlap(
        game.player,
        game.worldMap.bulletsBoxes,
        game.bulletsBoxesCollision,
        null, game
    );
}

game.render = function () {
    // this.game.debug.bodyInfo(game.player, 16, 24);
    // this.game.debug.spriteBounds(game.coins);
    // this.game.debug.text('Sprite z-depth: ' + sprite.z, 10, 20);
}

game.serialize = function () {
    var fields = [
        'score',
        'money',
        'level',
        'worldMap'
    ];

    return serializer.serialize(game, fields);
};

game.save = function(key) {
    if (!key) key = 'default';
	localStorage.setItem(`save-${key}`, JSON.stringify(game.serialize()));
};

game.autosaveOn = function (interval = 5) {
	this.autosaveTimer = setInterval(function() {
		this.save();
	}.bind(this), interval * 1000);
};

game.autosaveOff = function () {
	if (this.autosaveTimer) {
		clearInterval(this.autosaveTimer);
		this.autosaveTimer = null;
	}
};

game.loadGame = function(key) {
    if (!key) key = 'default';
	var state = localStorage.getItem(`save-${key}`);
    if (state) {
        return JSON.parse(state);
    }

    return DEFAULT_CONFIG;
};

module.exports = game;
