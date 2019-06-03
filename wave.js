class Wave {

    constructor(x, y, id, ttl, targetId) {
        this.center = createVector(x, y);
        this.i = 0;
        this.moveF = true;
        this.maxRadius = 24;
        this.toDelete = false;
        this.intersection = false;

        this.id = id;

        this.ttl = ttl;

        if (typeof id === 'undefined') {
            id = Math.floor(Math.random() * 1000000);
        }

        if (typeof targetId === 'undefined') {
            targetId = Math.floor(Math.random()*Node.count);
        }

        this.targetId = targetId;

        this.distance = 24;
    }

    show(walls) {

        noFill();
        strokeWeight(1.5);
        if (!this.intersection) {
            walls.forEach(wall => {
                let nominator = Math.abs((wall.p2.y - wall.p1.y) * this.center.x - (wall.p2.x - wall.p1.x) * this.center.y + wall.p2.x * wall.p1.y - wall.p2.y * wall.p1.x);
                let denominator = Math.sqrt(Math.pow((wall.p2.y - wall.p1.y), 2) + Math.pow((wall.p2.x - wall.p1.x), 2));

                this.distance = nominator / denominator;

                if (this.i >= 2 * this.distance) {
                    this.maxRadius = this.i;
                    this.intersection = true;
                }

            });
        }

        if (this.intersection) {
            stroke(238, 244, 66);
        } else stroke(255);


        ellipse(this.center.x * PIXELS_PER_METER, this.center.y * PIXELS_PER_METER, this.i * PIXELS_PER_METER, this.i * PIXELS_PER_METER);

        if (this.moveF) {
            this.i += 0.1;
            if (this.i >= this.maxRadius) {
                this.i = 0;
                this.moveF = false;
            }
        }

        if (!this.moveF) {
            this.toDelete = true;
        }
    }
}