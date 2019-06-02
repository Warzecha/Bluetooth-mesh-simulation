class Node {

    constructor(x, y, bluetoothClass, mobile) {
        this.pos = createVector(x, y);
        this.bluetoothClass = bluetoothClass;
        this.mobile = mobile;

        this.isRelay = true;
        this.queue = new Queue(10);

        if (mobile) {
            this.maxSpeed = 0.5;
            this.direction = p5.Vector.random2D().normalize().mult(this.maxSpeed)
        } else {
            this.maxSpeed = 0;
            this.direction = createVector(0, 0);
        }

        this.freeze = 0;

    }

    show() {
        strokeWeight(1);
        fill(255);
        stroke(255, 255, 255);
        ellipse(this.pos.x, this.pos.y, 30);
        textSize(22);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text(this.bluetoothClass.toString(), this.pos.x, this.pos.y);

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
            let tempX = this.pos.x + this.direction.x;
            let tempY = this.pos.y + this.direction.y;
            let nominator = Math.abs((wall.p2.y - wall.p1.y) * tempX - (wall.p2.x - wall.p1.x) * tempY + wall.p2.x * wall.p1.y - wall.p2.y * wall.p1.x);
            let denominator = Math.sqrt(Math.pow((wall.p2.y - wall.p1.y), 2) + Math.pow((wall.p2.x - wall.p1.x), 2));

            let distance = nominator / denominator;

            if (distance < 15) {
                moveNow = false;

            }
        });

        if (moveNow) {
            this.pos.x += this.direction.x;
            this.pos.y += this.direction.y;
        }

        this.pos.x = constrain(this.pos.x, 0, windowWidth);
        this.pos.y = constrain(this.pos.y, 0, windowHeight);

    }

    update() {

        this.freeze = Math.max(0, this.freeze - 1);

    }

    getPositionVector() {
        return this.pos;
    }

    relay(waves) {

        
        if (this.isRelay && this.freeze == 0) {
            
            waves.forEach(wave => {

                if (wave.ttl > 0 && Math.abs(this.pos.dist(wave.center) - wave.i) < 1) {
                    
                    console.log("relay: ", Math.abs(this.pos.dist(wave.center)))

                    if (!this.queue.isPresent(wave.id)) {
                        this.relayWave(waves, wave);
                        this.queue.push(wave.id)
                    }

                }

            });

        }
    }

    relayWave(waves, toRelay) {
        this.freeze = 30;
        append(waves, new Wave(this.pos.x, this.pos.y, toRelay.id, toRelay.ttl - 1))
    }

    sendWave(waves, id, ttl) {
        this.freeze = 30;
        append(waves, new Wave(this.pos.x, this.pos.y, id, ttl))

    }

    sendNewWave(waves) {
        this.sendWave(waves, Math.random(1000000), 3);
    }




}