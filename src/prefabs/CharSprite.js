// CharSprite prefab
class CharSprite extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        this.direction = direction;
        // add object to the existing scene
        scene.add.existing(this);

        // store point value
        this.points = pointValue;
    }
    update(){
        // move CharSprite left
        this.x -= game.settings.spaceshipSpeed;
        // wraparound from left to right edge
        if (this.x <= 0 - this.width){
            // this.x = game.config.width;
            this.reset();
        }
        this.moveChar();
    }
    reset(){
        this.x = game.config.width;
    }

    moveChar() {
        if (keyUP.isDown && this.y >= 50) { // is the player moving past the left boundry
            this.y -= 2;
        } else if (keyDOWN.isDown && this.y <= 264) {
            this.y += 2;
        }
    }
}