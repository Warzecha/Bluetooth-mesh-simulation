
const classToRange = {
    1: 300,
    2: 200,
    3: 100
}

class Connection {

    constructor(n1, n2) {

        this.n1 = n1;
        this.n2 = n2;

        // let node1class = nodes[i].bluetoothClass;
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
            line(this.n1.x, this.n1.y, this.n2.x, this.n2.y)
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
        let intersection = this.checkIntersection(wall);
        this.intersected = intersection;
    }

}