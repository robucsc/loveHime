// console.log("hello world");

// create game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 934,
    height: 500,
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