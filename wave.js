class Wave {

    constructor(x, y, id, ttl, targetId, blClass) {
        this.center = createVector(x, y);

        this.points = [];

        for (let i = 0; i < WAVE_ANGULAR_RES; i++) {
            append(this.points, createVector(x, y))

        }

        this.moveF = true;

        this.toDelete = false;

        this.id = id;
        this.ttl = ttl;

        if (typeof id === 'undefined') {
            id = Math.floor(Math.random() * 1000000);
        }

        if (typeof targetId === 'undefined') {
            targetId = Math.floor(Math.random() * Node.count);
        }

        if (typeof blClass === 'undefined') {
            blClass = 3;
        }

        switch (blClass) {
            case 3:
                this.maxRadius = 10;
                break;
            case 2:
                this.maxRadius = 16;
                break;
            case 1:
                this.maxRadius = 24;
                break;
            default:
                this.maxRadius = 12;
        }

        this.targetId = targetId;
        this.id = id;
        this.crossesOtherWall = false;
        this.speed = 0.05;

    }

    checkCrossing(wave) {
        if (this.intersectsOtherWave(wave) && this.crossesOtherWall === false) {
            this.maxRadius *= 0.91;
            this.speed *= 0.9;
            this.crossesOtherWall = true;
        }
    }

    update(walls) {

        let propagates = false;
        noFill();
        strokeWeight(1.5);
        for (let i = 0; i < this.points.length; i++) {

            let intersects = false;
            let interferes = false;
            let point = this.points[i];

            for (let j = 0; j < walls.length; j++) {

                let wall = walls[j];

                if (this.intersectsWall(this.center, point, wall)) {
                    if (wall.wallClass == 3) {
                        intersects = true;
                    } else {
                        interferes = true;

                    }
                }

            }

            let propagationDirection = p5.Vector.fromAngle(i * 2 * PI / WAVE_ANGULAR_RES, this.speed);

            if (!intersects) {

                if (!interferes && this.center.dist(point) < this.maxRadius) {
                    point.add(propagationDirection);
                    propagates = true;
                } else if (interferes && this.center.dist(point) < (this.maxRadius / 2)) {
                    point.add(propagationDirection);
                    propagates = true;
                }
            }

        }

        if (!propagates) {
            this.toDelete = true;
        }
    }

    show() {


        colorMode(HSB, 255);

        beginShape();
        this.points.forEach(point => {

            let hue = Math.max(120 - this.center.dist(point) * 10, 0);

            let c = color(hue, 126, 255);

            stroke(c);

            vertex(point.x * PIXELS_PER_METER, point.y * PIXELS_PER_METER);

        });

        endShape(CLOSE);

        colorMode(RGB, 255);
    }

    intersects(pos) {
        let x = pos.x, y = pos.y;
        let intersections = 0;
        let ss;

        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {

            let xi = this.points[i].x, yi = this.points[i].y;
            let xj = this.points[j].x, yj = this.points[j].y;

            if (yj == yi && yj == y && x > Math.min(xj, xi) && x < Math.max(xj, xi)) { // Check if point is on an horizontal polygon boundary
                return true;
            }

            if (y > Math.min(yj, yi) && y <= Math.max(yj, yi) && x <= Math.max(xj, xi) && yj != yi) {

                ss = (y - yj) * (xi - xj) / (yi - yj) + xj;

                if (ss == x) {
                    return true;
                }

                if (xj == xi || x <= ss) {

                    intersections++;
                }
            }
        }

        if (intersections % 2 != 0) {

            return true;

        } else {

            return false;

        }
    }

    intersectsOtherWave(otherWave) {
        return this.intersects(otherWave.center);
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