class Wall {

    constructor(p1, p2, wallClass) {
        this.p1 = p1;
        this.p2 = p2;
        this.wallClass = wallClass;

    }

    show() {
        switch (this.wallClass) {
            case 1:
                stroke(0, 255, 0);
                break;
            case 2:
                stroke(0, 0, 255);
                break;
            case 3:
                stroke(255, 0, 0);
                break;
            default:
                console.log("Unknown wall class");
                stroke(255);
        }
        strokeWeight(6);
        line(this.p1.x * PIXELS_PER_METER, this.p1.y * PIXELS_PER_METER, this.p2.x * PIXELS_PER_METER, this.p2.y * PIXELS_PER_METER);
    }
}