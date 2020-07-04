class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
    }

    // init(){
    //
    // }

    preload(){
    // load images/tile sprites
        this.load.image('rocket', './assets/redHeartInverted.png');
        // this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship', './assets/flying-miku32.png');
        this.load.image('sidewalk', './assets/sidewalk.png');
        this.load.image('buildings', './assets/buildings.png');
        this.load.image('hills', './assets/hills.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('nightSky', './assets/starfield.png');
        this.load.image('cross', './assets/white_cross.png');
        this.load.image('circle', './assets/circle-8x8.png');

    // load spritesheet
        this.load.spritesheet('explosion', './assets/love.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        this.timeline = this.tweens.createTimeline();

        // timeline.add({
        //     targets: circle,
        //     x: 600,
        //     ease: 'Power1',
        //     duration: 3000
        // });

        this.timeline.play();

        console.log(this.timeline);

        // flight paths
        this.top = 100; // original 132
        this.middle = 196;
        this.bottom = 260;

        // this.add.text(20, 20, "Rocket Patrol Play"); // for testing
        // place tile sprite on background

        this.nightSky = this.add.tileSprite(0, 0, 934, 500, 'nightSky').setOrigin(0, 0);
        this.sky = this.add.tileSprite(0, 0, 934, 500, 'sky').setOrigin(0, 0);
        this.hills = this.add.tileSprite(0, 0, 934, 500, 'hills').setOrigin(0, 0);
        this.buildings = this.add.tileSprite(0, 0, 934, 500, 'buildings').setOrigin(0, 0);
        this.sidewalk = this.add.tileSprite(0, 0, 934, 500, 'sidewalk').setOrigin(0, 0);

        this.nightSky.alpha = 0;


        // this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // magic numbers
        // white rectangle boarders
        // this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        // this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket, player one
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket', 0).setScale(0.5, 0.5).setOrigin(0, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, this.top, 'spaceship', 0, 30, false).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, this.middle, 'spaceship', 0, 20, null).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width + 0, this.bottom, 'spaceship', 0, 10, true).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // Particle System
        // got some of this from this video by Mitchell Hudson on YouTube
        // https://youtu.be/JSrafZXuehQ

        this.particles = this.add.particles('circle');

        console.log(this.particles);
        // console.log(this.);

        this.particles.createEmitter({
            // frame: 'yellow_ball',
            speed: 100,
            gravity: { x: 0, y: 200 },
            scale: { start: 0.1, end: 1 },
            tint: [0x008080, 0x008B8B, 0x00FFFF, 0xff0000],
            // emitZone: {type: 'random', source: this.ship01, quantity: 150},
            follow: this.ship01,
            // follow: this.ship02,
        });





        // define control keys
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
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
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(L)ove to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update(){ // ideally every frame
        // check key input for restart, keyUP for one handed play
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyL) || Phaser.Input.Keyboard.JustDown(keyUP))){
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }


        // console.log(this.time.now);
        this.sidewalk.tilePositionX -= 4;
        this.buildings.tilePositionX -= 2;
        this.hills.tilePositionX -= .5;
        this.sky.tilePositionX -= 1;
        this.nightSky.tilePositionX -= 1;



        if (!this.gameOver){
            this.p1Rocket.update(); // update rocket
            this.ship01.update();   // update spaceships
            this.ship02.update();
            this.ship03.update();
        }

            // crissCross
        if (this.time.now > 5000 && this.time.now < 10000) {
            this.crissCross(this.ship01);
            this.crissCross(this.ship02);
            this.crissCross(this.ship03);
        }

        // change the sky
        console.log(this.time.now);
        if (this.time.now > 10000 && this.time.now < 40000) {
            this.nightSky.alpha = 1;
            this.sky.alpha -= .001;
        } else {
            this.sky.alpha += .001;
            this.nightSky.alpha -= .005;
        }

        if (this.boom){ // explosion movement
            this.boom.x -= game.settings.spaceshipSpeed - 2;
        }

        // check collision
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            console.log('ship 03 hit');
            this.p1Rocket.reset();
            // this.ship03.reset();
            this.shipExplode(this.ship03);
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
        // ship.alpha = 0;                             // temporarily hid ship
        // create explosion sprite at ship's position
        this.boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

        this.boom.anims.play('explode');            // play explode animation
        this.boom.on('animationcomplete', () => {   // callback after animation completes
           // ship.reset();                           // reset ship position
          //  ship.alpha = 1;                         // make ship visible again
           this.boom.destroy();                    // remove explosion sprite
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    crissCross(ship){ // special thanks to Darcy for helping me with this one!!!
        if (ship.direction) {
            // make ship go up - later this could be a function
            ship.y -= .5;
            console.log(ship.y);

            if (ship.y <= this.top) {
                // console.log(ship.direction);
                ship.direction = false;
                // console.log(ship.direction);
            }
            return;

        } else if (!ship.direction){
            // make ship go down - later this could be a function
            ship.y += .5;
            if (ship.y >= this.bottom) {
                ship.direction = true;
            }
            return;
        }
    }
}



