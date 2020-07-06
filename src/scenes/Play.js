class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
    }

    preload(){
    // load images/tile sprites
        this.load.image('rocket', './assets/redHeart.png');
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image('spaceship', './assets/flying-miku32.png');
        this.load.image('sidewalk', './assets/sidewalk.png');
        this.load.image('buildings', './assets/buildings.png');
        this.load.image('hills', './assets/hills.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('nightSky', './assets/starfield.png');
        this.load.image('cross', './assets/white_cross.png');
        this.load.image('circle', './assets/circle-8x8.png');


    // load spritesheets
        this.load.spritesheet('explosion', './assets/love.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('flyingMiku', './assets/flying-miku-ani.png', {frameWidth: 146, frameHeight: 64, startFrame: 0, endFrame: 7});
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


        // // update all things
        // this.things.forEach((thing) => {
        //     if (this.checkThing(this.otherThing, thing)){
        //         this.otherThing.reset();
        //         this.thingAni(thing);
        //     }
        // });


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

        this.BGMmusic = this.sound.add('bgm', this.BGMconfig);
        this.BGMmusic.play(this.BGMconfig);

        // magic numbers
        // white rectangle boarders
        // this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        // this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket', 0).setScale(0.5, 0.5).setOrigin(0, 0);


        // add moving hearts (x3)
        this.heart01 = new Collectable(this, - 192, this.top, 'redHeart', 0, 20, false).setScale(0.5, 0.5).setOrigin(0, 0);
        this.heart02 = new Collectable(this, - 96, this.middle, 'redHeart', 0, 20, false).setScale(0.5, 0.5).setOrigin(0, 0);
        this.heart03 = new Collectable(this,  + 0, this.bottom, 'redHeart', 0, 10, false).setScale(0.5, 0.5).setOrigin(0, 0);

        // add projectial hearts
        var kokoro00 = this.add.sprite(700, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0);
        var kokoro01 = this.add.sprite(724, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0);
        var kokoro02 = this.add.sprite(748, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0);
        var kokoro03 = this.add.sprite(772, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0);
        var kokoro04 = this.add.sprite(796, 32, 'redHeart').setScale(0.5, 0.5).setOrigin(0, 0);


        // add player
        this.miku = new CharSprite(this, game.config.width + 192, this.top, 'flyingMiku', 0, 30, false).setOrigin(0, 0);

        // Love animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30,
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



        // Particle System
        // some of this came from this video by Mitchell Hudson on YouTube
        // https://youtu.be/JSrafZXuehQ

        this.particles = this.add.particles('circle');
        this.particles.createEmitter({
            speed: 100,
            gravity: { x: 0, y: 200 },
            scale: { start: 0.1, end: 1 },
            tint: [0x008080, 0x008B8B, 0x00FFFF, 0xff0000],
            follow: this.miku
        });


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
            backgroundColor: '#00FFFF',
            color: '#008080',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        this.hearts = 0;
        // this.postHearts(this.hearts);

        // game over flag
        this.gameOver = false;

        // 60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'おわい!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(L)ove to Play or ← for Menu', scoreConfig).setOrigin(0.5);
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
            this.miku.update();   // update spaceships
            this.heart01.update();
            this.heart02.update();
            this.heart03.update();
        }

            // crissCross
        if (this.time.now > 5000 && this.time.now < 30000) {
            this.crissCross(this.heart01);
            this.crissCross(this.heart02);
            this.crissCross(this.heart03);
        }

        // change the sky
        // console.log(this.time.now);
        if (this.time.now > 10000 && this.time.now < 40000) {
            this.nightSky.alpha = 1;
            this.sky.alpha -= .001;
        } else {
            this.sky.alpha += .001;
            this.nightSky.alpha -= .005;
        }

        if (this.boom){ // explosion movement
            this.boom.x += game.settings.spaceshipSpeed + 2;
        }

        // check heart collection
        if (this.checkCollision(this.miku, this.heart01)){
            console.log('heart 01 hit');
            this.p1Rocket.reset();
            this.collected(this.heart01);
        }
        if (this.checkCollision(this.miku, this.heart02)){
            console.log('heart 02 hit');
            this.p1Rocket.reset();
            this.collected(this.heart02);
        }
        if (this.checkCollision(this.miku, this.heart03)){
            console.log('heart 03 hit');
            this.p1Rocket.reset();
            this.collected(this.heart03);
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

    shipExplode(collectable){
        collectable.alpha = 0;                             // temporarily hid ship
        // create explosion sprite at ship's position
        this.boom = this.add.sprite(collectable.x, collectable.y, 'explosion').setOrigin(0, 0);

        this.boom.anims.play('explode');            // play explode animation
        this.boom.on('animationcomplete', () => {   // callback after animation completes
           collectable.reset();                           // reset ship position
           collectable.alpha = 1;                         // make ship visible again
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
        if (this.hearts < 5) {
            this.hearts += 1;
        }
        this.postHearts(this.hearts);
        this.sound.play('beem');
        collectable.reset(); // reset ship position
        // collectable.x -= 640;
        // collectable.alpha = 1;
    }

    crissCross(collectable){ // special thanks to Darcy for helping me with this one!!!
        if (collectable.direction) {
            // make collectable go up - later this could be a function
            collectable.y -= .5;
            if (collectable.y <= this.top) {
                collectable.direction = false;
            }
            return;

        } else if (!collectable.direction){
            // make collectable go down - later this could be a function
            collectable.y += .5;
            if (collectable.y >= this.bottom) {
                collectable.direction = true;
            }
            return;
        }
    }

    postHearts(hearts){
        // heart display
        let heartConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            // backgroundColor: '#00FFFF',
            color: '#F00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text(369, 54, hearts, heartConfig);
    }


}



