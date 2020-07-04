// console.log("hello world");

// create game configuration object
let config = {
    // type: Phaser.CANVAS,
    type: Phaser.WEBGL,
    width: 934,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play],

};

// create main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve some keyboard bindings
let keyL, keyLEFT, keyRIGHT, keyUP;