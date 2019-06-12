let nodes = [];
let walls = [];
let waves = [];

let overNode = false;
let currentNodeOver = null;

function setup() {
    createCanvas(windowWidth, windowHeight);
    input = createInput();
    input.position(windowWidth - 200, windowHeight - 50);
    input.size(30, 10);
    input.value(0);
    button = createButton('Add random nodes');
    button.position(input.x + input.width + 5, windowHeight - 50);
    button.mousePressed(addRandomNodes);

    insertFloors(2);
}

function draw() {
    background(51);
    waves.forEach(wave => {
        wave.update(walls);
        wave.show();
        if (wave.toDelete) {
            waves.splice(0, 1);
        }
        waves.forEach(otherWave => {
            if (wave !== otherWave) {
                wave.checkCrossing(otherWave);
            }
        })
    });

    nodes.forEach(node => {
        node.moveRandomly(walls);
        node.show();
        node.update();
        node.processWaves(waves);
        node.resendPrevMsg();
    });

    walls.forEach(wall => {
        wall.show();
    });


    fill(255);
    noStroke();
    textSize(32);
    textAlign(LEFT);
    if (Node.sentCount !== 0) {
        text('Received ratio: ' + Math.round(Node.receivedCount * 100 / Node.sentCount) + '%', 50, windowHeight - 50);
    }

}

function mousePressed() {
    console.log("X: ", mouseX / PIXELS_PER_METER)
    console.log("Y: ", mouseY / PIXELS_PER_METER)
    
    nodes.forEach(node => {
        if (Math.abs(mouseX / PIXELS_PER_METER - node.pos.x) < 30 / PIXELS_PER_METER &&
            Math.abs(mouseY / PIXELS_PER_METER - node.pos.y) < 30 / PIXELS_PER_METER) {
            overNode = true;
            currentNodeOver = node;
            if (node.toReset) {
                node.mobile = false;
                node.toReset = false;
            }
            else {
                if (!node.isRelay && !node.mobile) {
                    node.isRelay = true;
                } else if (node.isRelay && !node.mobile) {
                    node.mobile = true;
                } else if (node.isRelay && node.mobile) {
                    node.isRelay = false;
                    node.toReset = true;
                }
            }
            node.updateStatus();
        }
    });

    if (!overNode && (mouseX <= windowWidth - 235 || mouseY <= windowHeight - 70)) {
        append(nodes, new Node(mouseX / PIXELS_PER_METER, mouseY / PIXELS_PER_METER, Math.floor(Math.random() * 3 + 1), false, false));
    }
}

function keyPressed() {
    if (nodes.length !== 0) {
        if (keyCode === ENTER) {
            let randomIndex = Math.floor(Math.random() * nodes.length);
            let randomNode = nodes[randomIndex];
            randomNode.sendNewWave(waves, nodes);
        }

    }

    if (key === "Z") {
        walls = [];
    }

    if (key === "X") {
        insertFloors(2);
    }
}

function mouseDragged() {
    if (overNode) {
        currentNodeOver.pos.x = mouseX / PIXELS_PER_METER;
        currentNodeOver.pos.y = mouseY / PIXELS_PER_METER;
        currentNodeOver.isRelay = false;
        currentNodeOver.mobile = false;
        currentNodeOver.updateStatus();
    }

}

function mouseReleased() {
    overNode = false;
    currentNodeOver = null;
}

function addRandomNodes() {

    let allNodes = STATIC_NODE_COUNT + MOBILE_NODE_COUNT;

    let staticNodes = Math.round(input.value() * (STATIC_NODE_COUNT / allNodes));
    let mobileNodes = input.value() - staticNodes;

    for (let i = 0; i < staticNodes; i++) {
        let floor = Math.floor(random(0, 2));
        const x = random(2, 58);
        const y = random(4 + (floor * FLOOR_V_OFFSET), 33 + (floor * FLOOR_V_OFFSET));


        append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), false, Math.random() <= RELAY_RATIO));
    }


    for (let i = 0; i < mobileNodes; i++) {
        let floor = Math.floor(random(0, 2));
        const x = random(2, 58);
        const y = random(4 + (floor * FLOOR_V_OFFSET), 33 + (floor * FLOOR_V_OFFSET));

        append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), true, Math.random() <= RELAY_RATIO));
    }

}

function insertWalls(level) {

    let offset = FLOOR_V_OFFSET * level;

    //OUTER WALLS
    append(walls, new Wall(createVector(1, 1 + offset), createVector(70, 4 + offset), 3));
    append(walls, new Wall(createVector(70, 4 + offset), createVector(70, 33 + offset), 3));
    append(walls, new Wall(createVector(70, 33 + offset), createVector(60, 33 + offset), 3));
    append(walls, new Wall(createVector(60, 33 + offset), createVector(60, 36 + offset), 3));
    append(walls, new Wall(createVector(60, 36 + offset), createVector(21, 36 + offset), 3));
    append(walls, new Wall(createVector(21, 36 + offset), createVector(21, 33 + offset), 3));
    append(walls, new Wall(createVector(21, 33 + offset), createVector(1, 33 + offset), 3));
    append(walls, new Wall(createVector(1, 33 + offset), createVector(1, 1 + offset), 3));


    //INNER WALLS DOWN
    append(walls, new Wall(createVector(21, 33 + offset), createVector(21, 22 + offset), 2));
    append(walls, new Wall(createVector(21, 22 + offset), createVector(24, 22 + offset), 2));
    append(walls, new Wall(createVector(27, 22 + offset), createVector(30, 22 + offset), 2));
    append(walls, new Wall(createVector(27, 22 + offset), createVector(27, 36 + offset), 2));
    append(walls, new Wall(createVector(33, 22 + offset), createVector(37, 22 + offset), 2));
    append(walls, new Wall(createVector(37, 22 + offset), createVector(37, 36 + offset), 2));
    append(walls, new Wall(createVector(37, 22 + offset), createVector(39, 22 + offset), 2));
    append(walls, new Wall(createVector(42, 22 + offset), createVector(44, 22 + offset), 2));
    append(walls, new Wall(createVector(47, 22 + offset), createVector(49, 22 + offset), 2));
    append(walls, new Wall(createVector(49, 22 + offset), createVector(49, 36 + offset), 2));
    append(walls, new Wall(createVector(55, 22 + offset), createVector(60, 22 + offset), 2));
    append(walls, new Wall(createVector(60, 22 + offset), createVector(60, 33 + offset), 2));

    //extra
    append(walls, new Wall(createVector(1, 15 + offset), createVector(10, 15 + offset), 2));
    append(walls, new Wall(createVector(10, 15 + offset), createVector(10, 12 + offset), 2));
    append(walls, new Wall(createVector(10, 9 + offset), createVector(10, 1.6  + offset), 2));


    //INNER WALLS UP
    append(walls, new Wall(createVector(21, 14 + offset), createVector(21, 2.1 + offset), 2));
    append(walls, new Wall(createVector(21, 14 + offset), createVector(25, 14 + offset), 2));
    append(walls, new Wall(createVector(28, 14 + offset), createVector(30, 14 + offset), 2));
    append(walls, new Wall(createVector(30, 14 + offset), createVector(30, 2.5 + offset), 2));
    append(walls, new Wall(createVector(30, 14 + offset), createVector(30, 16 + offset), 2));
    append(walls, new Wall(createVector(30, 16 + offset), createVector(32, 16 + offset), 2));
    append(walls, new Wall(createVector(35, 16 + offset), createVector(39, 16 + offset), 2));
    append(walls, new Wall(createVector(39, 16 + offset), createVector(39, 2.8 + offset), 2));
    append(walls, new Wall(createVector(39, 16 + offset), createVector(42, 16 + offset), 2));
    append(walls, new Wall(createVector(45, 16 + offset), createVector(49, 16 + offset), 2));
    append(walls, new Wall(createVector(52, 16 + offset), createVector(55, 16 + offset), 2));
    append(walls, new Wall(createVector(55, 16 + offset), createVector(55, 3.4 + offset), 2));

    //extra
    append(walls, new Wall(createVector(55, 16 + offset), createVector(63, 16 + offset), 2));
    append(walls, new Wall(createVector(63, 16 + offset), createVector(63, 12 + offset), 2));
    append(walls, new Wall(createVector(63, 9 + offset), createVector(63, 3.9 + offset), 2));

    //extra 2
    append(walls, new Wall(createVector(1, 20 + offset), createVector(10, 20 + offset), 2));
    append(walls, new Wall(createVector(10, 20 + offset), createVector(10, 23 + offset), 2));
    append(walls, new Wall(createVector(10, 26 + offset), createVector(10, 29 + offset), 2));
    append(walls, new Wall(createVector(10, 29 + offset), createVector(10, 33 + offset), 2));
}

function insertFloors(levels) {
    for (let i = 0; i < levels; i++) {
        insertWalls(i);        
    }
}