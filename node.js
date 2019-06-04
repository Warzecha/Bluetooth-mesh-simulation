class Node {

    constructor(x, y, bluetoothClass, mobile) {

        this.id = Node.count++;

        this.pos = createVector(x, y);
        this.bluetoothClass = bluetoothClass;
        this.mobile = mobile;

        this.isRelay = Math.random() <= RELAY_RATIO;
        this.queue = new Queue(10);

        if (mobile) {
            this.maxSpeed = 0.5;
            this.direction = p5.Vector.random2D().normalize().mult(this.maxSpeed)
        } else {
            this.maxSpeed = 0;
            this.direction = createVector(0, 0);
        }

        this.freeze = 0;

        this.maxResendCount = 2;
        this.currentResendCount = 0;
        this.currentMsgId = -1;
        this.currentMsgTarget = -1;

        this.nextResendIn = 0;

        this.consumedMessages = new Set();

        this.showSender = 0;

    }

    show() {
        strokeWeight(1);

        if (Node.receivers.has(this.id)) {
            fill(255, 100, 100);
        } else {
            fill(255);
        }
        stroke(255, 255, 255);
        ellipse(this.pos.x * PIXELS_PER_METER, this.pos.y * PIXELS_PER_METER, 30);
        textSize(22);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text(this.bluetoothClass.toString(), this.pos.x * PIXELS_PER_METER, this.pos.y * PIXELS_PER_METER);
        if (this.isRelay) {
            fill(0, 0, 0);
            textSize(12);
            text("R", this.pos.x * PIXELS_PER_METER + 9, this.pos.y * PIXELS_PER_METER + 4)
        }


    }


    moveRandomly(walls) {
        const maxAngleChange = 0.1 * PI;
        let angleDelta = random(-maxAngleChange, maxAngleChange);

        this.direction.rotate(angleDelta);
        const speedDelta = random(-0.01, 0.1);

        let newSpeed = constrain(this.direction.mag() + speedDelta, 0, this.maxSpeed);
        this.direction.setMag(newSpeed);

        let moveNow = true;
        walls.forEach(wall => {
            let tempX = this.pos.x + this.direction.x;
            let tempY = this.pos.y + this.direction.y;
            let nominator = Math.abs((wall.p2.y - wall.p1.y) * tempX - (wall.p2.x - wall.p1.x) * tempY + wall.p2.x * wall.p1.y - wall.p2.y * wall.p1.x);
            let denominator = Math.sqrt(Math.pow((wall.p2.y - wall.p1.y), 2) + Math.pow((wall.p2.x - wall.p1.x), 2));

            let distance = nominator / denominator;

            if (distance < 1) {
                moveNow = false;

            }
        });

        if (moveNow) {
            this.pos.x += this.direction.x;
            this.pos.y += this.direction.y;
        }

        this.pos.x = constrain(this.pos.x, 0, WIDTH);
        this.pos.y = constrain(this.pos.y, 0, HEIGHT);

    }

    update() {

        this.freeze = Math.max(0, this.freeze - 1);
        this.nextResendIn = Math.max(0, this.nextResendIn - 1);

    }

    getPositionVector() {
        return this.pos;
    }

    processWaves(waves) {

        waves.forEach(wave => {


            if (wave.intersects(this.pos)) {

                if (wave.targetId == this.id) {

                    if (!this.consumedMessages.has(wave.id)) {
                        console.log("RECEIVED!")
                        this.consumedMessages.add(wave.id)
                        Node.receivers.delete(wave.targetId)
                        Node.receivedCount++;


                    }

                    return;
                }

                
                if (this.isRelay) {
                    if (this.freeze == 0) {
                        
                        if (wave.ttl > 0) {

                            if (!this.queue.contains(wave.id)) {
                                this.sendWave(waves, wave);
                            }

                        }
                    }


                }
            }

        });


    }

    sendWave(waves, toSend) {
        this.freeze = 3;

        let newWave = new Wave(this.pos.x, this.pos.y, toSend.id, toSend.ttl - 1, toSend.targetId, this.bluetoothClass);

        append(waves, newWave)
        this.queue.push(newWave.id)

        return toSend.id;
    }

    sendNewWave(waves) {
        this.currentMsgTarget = Math.floor(Math.random() * Node.count);
        let id = this.sendWave(waves, new Wave(this.pos.x, this.pos.y, undefined, TTL, this.currentMsgTarget, this.bluetoothClass));

        this.currentMsgId = id;
        Node.sentCount++;
        Node.receivers.add(this.currentMsgTarget);



        this.nextResendIn = Math.floor(Math.random() * 100);
    }

    resendPrevMsg() {

        if (this.nextResendIn == 0 && this.currentResendCount < this.maxResendCount && this.currentMsgId != -1) {

            this.sendWave(waves, new Wave(this.pos.x, this.pos.y, this.currentMsgId, TTL, this.currentMsgTarget, this.bluetoothClass))

            this.nextResendIn = Math.floor(Math.random() * 1000);
            this.currentResendCount += 1;

        }

    }

}

Node.count = 0;

Node.receivers = new Set();

Node.sentCount = 0;
Node.receivedCount = 0;
