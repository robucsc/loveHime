class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
        // load splash screen
        this.load.image('splash_screen', './assets/loveHimeWide.png');
        // load audio files
        this.load.audio('sfx_select', './assets/dodoru.wav');
        this.load.audio('sfx_explosion', './assets/sagoi.wav');
        this.load.audio('sfx_rocket', './assets/yeah.wav');
        this.load.audio('beem', './assets/beem.wav');
        this.load.audio('bgm', './assets/bgm.wav');
        this.load.audio('ohno', './assets/ohno.wav');
    }


    create(){
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down)

        // display splash screen
        this.splashScreen = this.add.tileSprite(0, 0, 934, 500, 'splash_screen').setOrigin(0, 0);

        // menu dispay
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f64ff1',
            color: '#00FFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        let centerX = game.config.width * .7;
        let centerY = game.config.height * .4;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer - textSpacer, 'Love Hime', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00ffff';
        menuConfig.color = '#008080';
        this.add.text(centerX, centerY - textSpacer, 'Use arrows ↑ ↓ to move', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, '(L) to Love', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#f64ff1';
        menuConfig.color = '#00ffff';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
    }

    update(){ // ideally every frame
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // yasashi modo desu
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // hardo modo desu
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}

