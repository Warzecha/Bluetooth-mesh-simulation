const classToRange = {
    1: 300,
    2: 200,
    3: 100
};

class Connection {

    constructor(n1, n2) {

        this.n1 = n1;
        this.n2 = n2;
        this.maxRange = Math.min(classToRange[n1.bluetoothClass], classToRange[n2.bluetoothClass]);
        this.intersected = false;

    }

    show() {
        if (p5.Vector.dist(this.n1.getPositionVector(), this.n2.getPositionVector()) <= this.maxRange) {

            if (this.intersected) {
                stroke(255, 208, 0);
            } else {
                stroke(255);
            }
            strokeWeight(1);
            let linePoints = this.calculateLinePoints();
            line(linePoints[0], linePoints[1], linePoints[2], linePoints[3])
        }
    }

    checkIntersection(wall) {
        let det, gamma, lambda;
        det = (wall.p2.x - wall.p1.x) * (this.n2.y - this.n1.y) - (this.n2.x - this.n1.x) * (wall.p2.y - wall.p1.y);
        if (det === 0) {
            return false;
        } else {
            lambda = ((this.n2.y - this.n1.y) * (this.n2.x - wall.p1.x) + (this.n1.x - this.n2.x) * (this.n2.y - wall.p1.y)) / det;
            gamma = ((wall.p1.y - wall.p2.y) * (this.n2.x - wall.p1.x) + (wall.p2.x - wall.p1.x) * (this.n2.y - wall.p1.y)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    }

    updateIntersection(wall) {
        this.intersected = this.checkIntersection(wall);
    }


    calculateLinePoints() {
        let horizontalDistance = Math.abs(this.n1.x - this.n2.x);
        let verticalDistance = Math.abs(this.n1.y - this.n2.y);

        let sinus = verticalDistance / Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));

        let yCorrection = 15 * sinus;
        let xCorrection = 15 * Math.sqrt(1 - Math.pow(sinus, 2));

        let nX1 = 0;
        let nY1 = 0;
        let nX2 = 0;
        let nY2 = 0;

        if (this.n1.x < this.n2.x) {
            nX1 = this.n1.x + xCorrection;
            nX2 = this.n2.x - xCorrection;
        } else {
            nX1 = this.n1.x - xCorrection;
            nX2 = this.n2.x + xCorrection;
        }

        if (this.n1.y < this.n2.y) {
            nY1 = this.n1.y + yCorrection;
            nY2 = this.n2.y - yCorrection;
        } else {
            nY1 = this.n1.y - yCorrection;
            nY2 = this.n2.y + yCorrection;
        }

        return [nX1, nY1, nX2, nY2];
    }

}