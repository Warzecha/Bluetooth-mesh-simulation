class Wave {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.i = 0;
        this.secondCircleDelay = -30;
        this.thirdCircleDelay = -60;
        this.moveF = true;
        this.moveS = true;
        this.moveT = true;
        this.maxRadius = 300;
        this.toDelete = false;
        this.intersection = false;

    }

    show(walls) {

        noFill();
        strokeWeight(1.5);
        if (!this.intersection) {
            walls.forEach(wall => {
                let nominator = Math.abs((wall.p2.y - wall.p1.y) * this.x - (wall.p2.x - wall.p1.x) * this.y + wall.p2.x * wall.p1.y - wall.p2.y * wall.p1.x);
                let denominator = Math.sqrt(Math.pow((wall.p2.y - wall.p1.y), 2) + Math.pow((wall.p2.x - wall.p1.x), 2));

                let distance = nominator / denominator;

                if (this.i >= 2 * distance) {
                    this.maxRadius = this.i;
                    this.intersection = true;
                }

            });
        }

        if (this.intersection) {
            stroke(238, 244, 66);
        } else stroke(255);


        ellipse(this.x, this.y, this.i, this.i);

        if (this.secondCircleDelay >= 0) {
            ellipse(this.x, this.y, this.secondCircleDelay, this.secondCircleDelay);
        }

        if (this.thirdCircleDelay >= 0) {
            ellipse(this.x, this.y, this.thirdCircleDelay, this.thirdCircleDelay);
        }

        if (this.moveF) {
            this.i += 1;
            if (this.i >= this.maxRadius) {
                this.i = 0;
                this.moveF = false;
            }
        }

        if (this.moveS) {
            this.secondCircleDelay += 1;
            if (this.secondCircleDelay >= this.maxRadius) {
                this.secondCircleDelay = -30;
                this.moveS = false;
            }
        }

        if (this.moveT) {
            this.thirdCircleDelay += 1;
            if (this.thirdCircleDelay >= this.maxRadius) {
                this.thirdCircleDelay = -60;
                this.moveT = false;
            }
        }

        if (!this.moveF && !this.moveS && !this.moveT) {
            this.toDelete = true;
        }
    }
}