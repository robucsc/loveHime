class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    // init(){
    //
    // }

    preload(){
    // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        // this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship', './assets/flying-miku32.png');
        this.load.image('starfield', './assets/starfield.png');

    // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        // this.add.text(20, 20, "Rocket Patrol Play"); // for testing
        // place tile sprite on background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // magic numbers
        // white rectangle boarders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket, player one
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket', 0).setScale(0.5, 0.5).setOrigin(0, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width + 0, 260, 'spaceship', 0, 10).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // define control keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // easter egg

        // score
        this.p1Score =0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update(){ // ideally every frame
        // check key input for restart, keyUP for one handed play
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyUP))){
        // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            // this.scene.restart(this.p1Score);
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        // this.starfield2.tilePositionX -= 2;

        if (!this.gameOver){
            this.p1Rocket.update(); // update rocket
            this.ship01.update();   // update spaceships
            this.ship02.update();
            this.ship03.update();
        }

        // check collision
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            console.log('ship 03 hit');
            this.p1Rocket.reset();
            // this.ship03.reset();
            this.shipExplode(this.ship03);
            // this.boom.x += 5;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            console.log('ship 02 hit');
            this.p1Rocket.reset();
            // this.ship02.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            console.log('ship 01 hit');
            this.p1Rocket.reset();
            // this.ship01.reset();
            this.shipExplode(this.ship01);
        }

    }

    checkCollision(rocket, ship){
        // AABB bounds checking
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;                         // temporarily hid ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // this.boom = this.add.sprite(ship.x - 50, ship.y, 'explosion').setOrigin(0, 0);

        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
    // shipExplode(ship){
    //     ship.alpha = 0;                         // temporarily hid ship
    //     // create explosion sprite at ship's position
    //     // let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     this.boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //
    //     this.boom.anims.play('explode');             // play explode animation
    //     this.boom.on('animationcomplete', () => {    // callback after animation completes
    //         ship.reset();                       // reset ship position
    //         ship.alpha = 1;                     // make ship visible again
    //         this.boom.destroy();                     // remove explosion sprite
    //         this.boom.x += 1;
    //     });
    //     this.p1Score += ship.points;
    //     this.scoreLeft.text = this.p1Score;
    // }
}



