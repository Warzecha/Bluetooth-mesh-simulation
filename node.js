class Node {

    constructor(x, y, bluetoothClass, mobile) {
        this.x = x;
        this.y = y;
        this.bluetoothClass = bluetoothClass;
        this.mobile = mobile;

        if (mobile) {
            this.maxSpeed = 0.5;
            this.direction = p5.Vector.random2D().normalize().mult(this.maxSpeed)
        } else {
            this.maxSpeed = 0;
            this.direction = createVector(0, 0);
        }

    }

    show() {
        strokeWeight(1);
        fill(255);
        stroke(255, 255, 255);
        ellipse(this.x, this.y, 30);
        textSize(22);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text(this.bluetoothClass.toString(), this.x, this.y);
    }


    moveRandomly(walls) {
        const maxAngleChange = 0.1 * PI;
        let angleDelta = random(-maxAngleChange, maxAngleChange);

        this.direction.rotate(angleDelta);
        const speedDelta = random(-0.1, 1);

        let newSpeed = constrain(this.direction.mag() + speedDelta, 0, this.maxSpeed);
        this.direction.setMag(newSpeed);

        let moveNow = true;
        walls.forEach(wall => {
            let tempX = this.x + this.direction.x;
            let tempY = this.y + this.direction.y;
            let nominator = Math.abs((wall.p2.y - wall.p1.y) * tempX - (wall.p2.x - wall.p1.x) * tempY + wall.p2.x * wall.p1.y - wall.p2.y * wall.p1.x);
            let denominator = Math.sqrt(Math.pow((wall.p2.y - wall.p1.y), 2) + Math.pow((wall.p2.x - wall.p1.x), 2));

            let distance = nominator / denominator;

            if (distance < 15) {
                moveNow = false;

            }
        });

        if (moveNow) {
            this.x += this.direction.x;
            this.y += this.direction.y;
        }

        this.x = constrain(this.x, 0, windowWidth);
        this.y = constrain(this.y, 0, windowHeight);

    }

    getPositionVector() {
        return createVector(this.x, this.y);
    }

}