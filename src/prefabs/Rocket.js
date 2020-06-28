// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // when not adding stuff using Phaser's built in tools
        scene.add.existing(this);   // add object to the existing scene

        // create a custom property for the rocket
        this.isFiring = false;      // track the rocket's firing status—don't let the ship move
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    update(){
        // left/right movement
        if (!this.isFiring){
            if (keyLEFT.isDown && this.x >= 47){ // is the player moving past the left boundry
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 598) {
                this.x += 2;
            }
        }
        // fire button
        if ((Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyUP)) && !this.isFiring){
                this.isFiring = true;
                this.sfxRocket.play(); // play sfx
        }
        // if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring){
        //     this.isFiring = true;
        //     this.sfxRocket.play(); // play sfx
        // }

        // if fired move bullet up
        if (this.isFiring && this.y >= 108){
                this.y -= 2;
        }
        // reset on miss
        if (this.y <= 108){
                this.reset();
        }
    }
    // reset rocket to the "ground" (bottom of the screen)
    reset(){
        this.isFiring = false;
        this.y = 431;
    }

}