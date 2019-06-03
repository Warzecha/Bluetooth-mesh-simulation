class Wave {

    constructor(x, y, id, ttl, targetId) {
        this.center = createVector(x, y);

        this.points = [];

        for (let i = 0; i < WAVE_ANGULAR_RES; i++) {
            append(this.points, createVector(x, y))

        }

        this.moveF = true;
        this.maxRadius = 24;
        this.toDelete = false;

        this.id = id;
        this.ttl = ttl;

        if (typeof id === 'undefined') {
            id = Math.floor(Math.random() * 1000000);
        }

        if (typeof targetId === 'undefined') {
            targetId = Math.floor(Math.random() * Node.count);
        }

        this.targetId = targetId;

        this.distance = 24;
    }

    show(walls) {

        let propagates = false;
        noFill();
        strokeWeight(1.5);
        walls.forEach(wall => {

            for (let i = 0; i < this.points.length; i++) {
                let point = this.points[i];


                let intersects = this.intersectsWall(this.center, point, wall);

                let max = this.maxRadius;
                if (intersects) {
                    max /= 12;
                }


                let propagationDirection = p5.Vector.fromAngle(i * 2 * PI / WAVE_ANGULAR_RES, 0.01);


                if (this.center.dist(point) < max) {
                    point.add(propagationDirection)
                    propagates = true;
                }

            }



        });

        if (this.intersection) {
            stroke(238, 244, 66);
        } else stroke(255);


        // ellipse(this.center.x * PIXELS_PER_METER, this.center.y * PIXELS_PER_METER, this.i * PIXELS_PER_METER, this.i * PIXELS_PER_METER);

        beginShape();
        this.points.forEach(point => {
            vertex(point.x * PIXELS_PER_METER, point.y * PIXELS_PER_METER);

        });

        endShape(CLOSE);



        if (!propagates) {
            this.toDelete = true;
        }
    }

    intersects(pos) {
        let x = pos.x, y = pos.y;

        let inside = false;

        let intersections = 0;

        let ss;

        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {

            let xi = this.points[i].x, yi = this.points[i].y; let xj = this.points[j].x, yj = this.points[j].y;

            if (yj == yi && yj == y && x > Math.min(xj, xi) && x < Math.max(xj, xi)) { // Check if point is on an horizontal polygon boundary

                return true;

            }

            if (y > Math.min(yj, yi) && y <= Math.max(yj, yi) && x <= Math.max(xj, xi) && yj != yi) {

                ss = (y - yj) * (xi - xj) / (yi - yj) + xj;

                if (ss == x) { // Check if point is on the polygon boundary (other than horizontal)

                    return true;

                }

                if (xj == xi || x <= ss) {

                    intersections++;
                }
            }
        }

        // If the number of edges we passed through is odd, then it’s in the polygon.

        if (intersections % 2 != 0) {

            return true;

        } else {

            return false;

        }
    }

    intersectsWall(center, end, wall) {
        let det, gamma, lambda;
        det = (end.x - center.x) * (wall.p2.y - wall.p1.y) - (wall.p2.x - wall.p1.x) * (end.y - center.y);
        if (det === 0) {
            return false;
        } else {
            lambda = ((wall.p2.y - wall.p1.y) * (wall.p2.x - center.x) + (wall.p1.x - wall.p2.x) * (wall.p2.y - center.y)) / det;
            gamma = ((center.y - end.y) * (wall.p2.x - center.x) + (end.x - center.x) * (wall.p2.y - center.y)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    };

}