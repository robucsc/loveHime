class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
    }

    preload(){
    // load images/tile sprites
        this.load.image('rocket', './assets/redHeart.png');
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image('spaceship', './assets/flying-miku32.png');
        this.load.image('kittyrun', './assets/kittyRun.png');
        this.load.image('sidewalk', './assets/sidewalk.png');
        this.load.image('buildings', './assets/buildings.png');
        this.load.image('hills', './assets/hills.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('nightSky', './assets/starfield.png');
        this.load.image('cross', './assets/white_cross.png');
        this.load.image('circle', './assets/circle-8x8.png');
        this.load.image('moon', './assets/moon.png');


    // load spritesheets
        this.load.spritesheet('explosion', './assets/love.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('flyingMiku', './assets/flying-miku-ani.png', {frameWidth: 146, frameHeight: 64, startFrame: 0, endFrame: 7});
        this.load.spritesheet('kittyRun', './assets/kittyRun1035x64.png', {frameWidth: 115, frameHeight: 64, startFrame: 0, endFrame: 8});
        // Cat graphics can be found here:
        // https://graphicriver.net/item/black-cat-game-sprite/11784968
    }

    create(){
        // failed attempt at making a timeline!!!
        // this.timeline = this.tweens.createTimeline();
        // timeline.add({
        //     targets: circle,
        //     x: 600,
        //     ease: 'Power1',
        //     duration: 3000
        // });
        // this.timeline.play();
        // console.log(this.timeline);

        // update all things - something cool from Darcy that I couldn't get to work!
        // this.things.forEach((thing) => {
        //     if (this.checkThing(this.otherThing, thing)){
        //         this.otherThing.reset();
        //         this.thingAni(thing);
        //     }
        // });
        // this.time.now = 0;

        // collectable flight path zones
        this.top = 100;
        this.middle = 200;
        this.bottom = 300;

        // place tile sprite/ on background
        this.nightSky = this.add.tileSprite(0, 0, 934, 500, 'nightSky').setOrigin(0, 0);
        var moon = this.add.sprite(48, 32, 'moon').setScale(1, 1).setOrigin(0, 0); // moon desu
        // moon.alpha = 0;
        this.sky = this.add.tileSprite(0, 0, 934, 500, 'sky').setOrigin(0, 0);
        this.hills = this.add.tileSprite(0, 0, 934, 500, 'hills').setOrigin(0, 0);
        this.buildings = this.add.tileSprite(0, 0, 934, 500, 'buildings').setOrigin(0, 0);
        this.sidewalk = this.add.tileSprite(0, 0, 934, 500, 'sidewalk').setOrigin(0, 0);
        this.nightSky.alpha = 0;

        // BGM config
        this.BGMconfig = {
            mute: false,
                volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        // BGM play, this was really tricky Big thanks to Ben and Darcy!
        if (this.sound.get('bgm') == null) {
            this.BGMmusic = this.sound.add('bgm', this.BGMconfig);
            this.BGMmusic = this.BGMmusic.play(this.BGMconfig);
        }

        // add player
        this.miku = new CharSprite(this, game.config.width + 192, this.top, 'flyingMiku', 0, 0, false).setOrigin(0, 0);
        // add kitty
        this.kitty = new Runner(this, 32, 364, 'kittyRun', 0, 30, false).setScale(1, 1).setOrigin(0, 0);
        // add rocket
        this.p1Rocket = new Rocket(this, this.miku.x, this.miku.y, 'rocket', 0).setScale(0., 0.5).setOrigin(0, 0).setVisible(true);
        this.myKokoro = new Kokoro(this, this.miku.x, this.miku.y, 'redHeart', 0).setScale(0., 0.5).setOrigin(0, 0).setVisible(true);
        this.myKokoro.alpha = 1;

        // add collectables
        this.hearts = [new Collectable(this, - 192, this.top, 'redHeart', 0, 10, false).setScale(0.5, 0.5).setOrigin(0, 0),
        new Collectable(this, - 96, this.middle, 'redHeart', 0, 10, false).setScale(0.5, 0.5).setOrigin(0, 0),
        new Collectable(this,  + 0, this.bottom, 'redHeart', 0, 10, false).setScale(0.5, 0.5).setOrigin(0, 0)];

        // add projectial hearts
        this.kokoro = [this.add.sprite(700, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0).setVisible(false),
        this.add.sprite(724, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0).setVisible(false),
        this.add.sprite(748, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0).setVisible(false),
        this.add.sprite(772, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0).setVisible(false),
        this.add.sprite(796, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0).setVisible(false)];

        // Love animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 15,
            repeat: 0
        });

        // Miku animation config
        this.anims.create({
            key: 'MikuAni',
            frames: this.anims.generateFrameNumbers('flyingMiku', {start: 0, end: 7, first: 0}),
            repeat: -1,
            frameRate: 1
        });
        this.miku.anims.play('MikuAni');

        // kitty animation config
        this.anims.create({
            key: 'kittyAni',
            frames: this.anims.generateFrameNumbers('kittyRun', {start: 0, end: 8, first: 0}),
            repeat: -1,
            frameRate: 15
        });
        this.kitty.anims.play('kittyAni');

        // Particle System
        // some of this came from this video by Mitchell Hudson on YouTube
        // https://youtu.be/JSrafZXuehQ

        this.particles = this.add.particles('circle');
        this.particles.createEmitter({
            speed: 100,
            gravity: { x: 0, y: 200 },
            scale: { start: 0.1, end: 1 },
            tint: [0x008080, 0x008B8B, 0x00FFFF, 0xff0000],
            // follow: this.miku
        }).startFollow(this.miku, 32, 32); // Thanks to Darcy for this line!

        // define control keys
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            // backgroundColor: '#00FFFF',
            color: '#FF0000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 32, this.p1Score, scoreConfig);
        this.capturedHearts = 0;
        this.kokoros = 0;

        // game over flag
        this.gameOver = false;

        // play clock
        this.moreTime = 0;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer + this.moreTime, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'おわい!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(L)ove to Play or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update(){ // ideally every frame
        // check key input for restart, keyUP for one handed play
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyL))){
            this.time.removeAllEvents();
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.time.removeAllEvents();
            this.scene.start("menuScene");
        }

        // console.log(this.moreTime);
        // console.log(this.capturedHearts, this.kokoros);

        this.sidewalk.tilePositionX -= 4;
        this.buildings.tilePositionX -= 2;
        this.hills.tilePositionX -= .5;
        this.sky.tilePositionX -= 1;
        this.nightSky.tilePositionX -= 1;

        if (!this.gameOver){
            this.myKokoro.update();     // update kokoro
            this.miku.update();         // update Miku
            this.kitty.update();        // update kitty
            this.hearts[0].update();
            this.hearts[1].update();
            this.hearts[2].update();
        }

        // crissCross - evasive pattern for collectables
        if (this.clock.getElapsedSeconds() > 5 && this.clock.getElapsedSeconds() < 35) {
            this.crissCross(this.hearts[0]);
            this.crissCross(this.hearts[1]);
            this.crissCross(this.hearts[2]);
        }

        // change the sky
        // console.log(this.time.now);
        if (this.clock.getElapsedSeconds() > 10 && this.clock.getElapsedSeconds() < 40) {
            this.nightSky.alpha = 1;
            this.sky.alpha -= .001;
        } else {
            this.sky.alpha += .001;
            this.nightSky.alpha -= .005;
        }

        // Love ani movement
        if (this.boom){ // explosion movement
            this.boom.x -= game.settings.spaceshipSpeed - 3;
        }

        // check heart collection
        if (this.checkCollision(this.miku, this.hearts[0])){
            // console.log('heart 01 hit');
            // this.p1Rocket.reset();
            this.collected(this.hearts[0]);
            // this.moreTime += 5000;
        }
        if (this.checkCollision(this.miku, this.hearts[1])){
            // console.log('heart 02 hit');
            // this.p1Rocket.reset();
            this.collected(this.hearts[1]);
        }
        if (this.checkCollision(this.miku, this.hearts[2])){
            // console.log('heart 03 hit');
            // this.p1Rocket.reset();
            this.collected(this.hearts[2]);
        }

        // check kokoro kitty collision
        if (this.checkCollision(this.kitty, this.myKokoro)){
            console.log('Kitty Loved');
            this.myKokoro.reset();
            this.letsExplode(this.kitty);
            // this.moreTime += 5000;
        }


    }

    checkCollision(sprite, collectable){
        // AABB bounds checking - simple AABB checking
        if (sprite.x < collectable.x + collectable.width &&
            sprite.x + sprite.width > collectable.x &&
            sprite.y < collectable.y + collectable.height &&
            sprite.height + sprite.y > collectable.y){
                return true;
        } else {
            return false;
        }
    }

    letsExplode(collectable){
        // collectable.alpha = 0;                             // temporarily hid ship
        // create explosion sprite at ship's position
        this.boom = this.add.sprite(collectable.x, collectable.y, 'explosion').setOrigin(0, 0);

        this.boom.anims.play('explode');            // play explode animation
        this.boom.on('animationcomplete', () => {   // callback after animation completes
           // collectable.reset();                           // reset ship position
           // collectable.alpha = 1;                         // make ship visible again
           this.boom.destroy();                    // remove explosion sprite
        });
        this.p1Score += collectable.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    collected(collectable){
        collectable.alpha = 0;
        this.p1Score += collectable.points;
        this.scoreLeft.text = this.p1Score;
        if (this.kokoros <= 5) {
            this.capturedHearts += 1;
        } else {
            this.capturedHearts = 0;
        }
        this.kokoroMeter(this.capturedHearts);
        this.sound.play('beem');
        collectable.reset(); // reset ship position
    }

    crissCross(collectable){ // special thanks to Darcy for helping me with this one!!!
        if (collectable.direction) {
            // make collectable go up - later this could be a function
            collectable.y -= .5;
            // collectable.y -= Math.sin(collectable.x);

            if (collectable.y <= this.top) {
                collectable.direction = false;
            }
            return;

        } else if (!collectable.direction){
            // make collectable go down - later this could be a function
            collectable.y += .5;
            // collectable.y += Math.sin(collectable.x);
            if (collectable.y >= this.bottom) {
                collectable.direction = true;
            }
            return;
        }
    }

    // display kokoro - this should probably have been a switch statement
    kokoroMeter(capturedHearts){
        if (capturedHearts == 10){
            this.kokoro[0].setVisible(true);
            this.kokoros = 1;
        } else if (capturedHearts == 20){
            this.kokoro[1].setVisible(true);
            this.kokoros = 2;
        } else if (capturedHearts == 30){
            this.kokoro[2].setVisible(true);
            this.kokoros = 3;
        } else if (capturedHearts == 40){
            this.kokoro[3].setVisible(true);
            this.kokoros = 4;
        } else if (capturedHearts == 50){
            this.kokoro[4].setVisible(true);
            this.kokoros = 5;
        }
    }

    // timedEvent = this.time.addEvent({
    //     delay: 2000,
    //     callback: this.crissCross(),
    //     callbackScope: this
    // });

    // postHearts(hearts){
    //     // heart display
    //     let heartConfig = {
    //         fontFamily: 'Courier',
    //         fontSize: '28px',
    //         // backgroundColor: '#00FFFF',
    //         color: '#F00',
    //         align: 'right',
    //         padding: {
    //             top: 5,
    //             bottom: 5,
    //         },
    //         fixedWidth: 100
    //     }
    //     this.scoreRight = this.add.text(369, 54, hearts, heartConfig);
    //
    // }
}



