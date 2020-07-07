// Rocket prefab
class Kokoro extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // when not adding stuff using Phaser's built in tools
        scene.add.existing(this);   // add object to the existing scene

        // create a custom property for the rocket
        this.isFiring = false;      // track the rocket's firing status—don't let the ship move
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    update(){

        this.moveHeart();

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyL)  && !this.isFiring){
                console.log('kokoro dropped');
                this.isFiring = true;
                this.alpha = 1;
                this.sfxRocket.play(); // play sfx
        }

        // if fired move bullet up
        // if (this.isFiring && this.y >= 108){
        if (this.isFiring){
            this.y += 2;
            this.x -= 2;
        }
        // reset on miss
        if (this.y >= 475){
                // this.alpha = 0;
                this.reset();
        }

        if (!this.isFiring){
            this.x = this.scene.miku.x + 30;
            this.y = this.scene.miku.y + 34;
        }
    }
    // reset rocket to the "ground" (bottom of the screen)
    reset(){
        this.isFiring = false;
        // this.y = 100;
        this.alpha = 0;
    }

    moveHeart(){
        if (keyLEFT.isDown && this.x >= 47){ // is the player moving past the left boundry
            this.x -= 2;
        } else if (keyRIGHT.isDown && this.x <= 598) {
            this.x += 2;
        }
    }

}