class Node {

    const 

    constructor(x, y, bluetoothClass, mobile) {
        this.x = x;
        this.y = y;
        this.bluetoothClass = bluetoothClass;
        this.mobile = mobile;

        if(mobile) {
            this.maxSpeed = 2;
            this.direction = p5.Vector.random2D().normalize().mult(this.maxSpeed)
        } else {
            this.maxSpeed = 0;
            this.direction = createVector(0, 0);
        }

    }

    show() {
        fill(255);
        ellipse(this.x, this.y, 30);
    }

    
    moveRandomly(time) {

        const maxAngleChange = 0.1 * PI
        let angleDelta = random(- maxAngleChange, maxAngleChange);

        this.direction.rotate(angleDelta);

        const speedDelta = random(-0.1, 1)

        let newSpeed = constrain(this.direction.mag() + speedDelta, 0, this.maxSpeed)


        this.direction.setMag(newSpeed);


        this.x += this.direction.x;
        this.y += this.direction.y;


        // this.x = this.x + (noise(this.x, this.y, time) - 0.5) * this.maxSpee;
        // this.y = this.y + (noise(this.x, this.y, time) - 0.5) * this.maxSpee;

        this.x = constrain(this.x, 0, windowWidth);
        this.y = constrain(this.y, 0, windowHeight);

    }

    getPositionVector() {
        return createVector(this.x, this.y);
    }

}