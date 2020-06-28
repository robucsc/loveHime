// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);

        // store point value
        this.points = pointValue;
    }
    update(){
        // move spaceship left
        // this.x -= 3;
        this.x -= game.settings.spaceshipSpeed;

        // wraparound from left to right edge
        if (this.x <= 0 - this.width){
            // this.x = game.config.width;
            this.reset();
        }
    }
    reset(){
        this.x = game.config.width;
    }
}