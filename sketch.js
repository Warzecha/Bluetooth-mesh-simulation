let nodes = [];
let walls = [];
let waves = [];

function setup() {
    createCanvas(windowWidth, windowHeight);


    //OUTER WALLS
    append(walls, new Wall(createVector(1, 1), createVector(70, 4), 3));
    append(walls, new Wall(createVector(70, 4), createVector(70, 33), 3));
    append(walls, new Wall(createVector(70, 33), createVector(60, 33), 3));
    append(walls, new Wall(createVector(60, 33), createVector(60, 36), 3));
    append(walls, new Wall(createVector(60, 36), createVector(21, 36), 3));
    append(walls, new Wall(createVector(21, 36), createVector(21, 33), 3));
    append(walls, new Wall(createVector(21, 33), createVector(1, 33), 3));
    append(walls, new Wall(createVector(1, 33), createVector(1, 1), 3));


    //INNER WALLS DOWN
    append(walls, new Wall(createVector(21, 33), createVector(21, 22), 2));
    append(walls, new Wall(createVector(21, 22), createVector(24, 22), 2));
    append(walls, new Wall(createVector(27, 22), createVector(30, 22), 2));
    append(walls, new Wall(createVector(27, 22), createVector(27, 36), 2));
    append(walls, new Wall(createVector(33, 22), createVector(37, 22), 2));
    append(walls, new Wall(createVector(37, 22), createVector(37, 36), 2));
    append(walls, new Wall(createVector(37, 22), createVector(39, 22), 2));
    append(walls, new Wall(createVector(42, 22), createVector(44, 22), 2));
    append(walls, new Wall(createVector(47, 22), createVector(49, 22), 2));
    append(walls, new Wall(createVector(49, 22), createVector(49, 36), 2));
    append(walls, new Wall(createVector(55, 22), createVector(60, 22), 2));
    append(walls, new Wall(createVector(60, 22), createVector(60, 33), 2));

    //extra
    append(walls, new Wall(createVector(1, 15), createVector(10, 15), 2));
    append(walls, new Wall(createVector(10, 15), createVector(10, 12), 2));
    append(walls, new Wall(createVector(10, 9), createVector(10, 1.6), 2));



    //INNER WALLS UP
    append(walls, new Wall(createVector(21, 14), createVector(21, 2.1), 2));
    append(walls, new Wall(createVector(21, 14), createVector(25, 14), 2));
    append(walls, new Wall(createVector(28, 14), createVector(30, 14), 2));
    append(walls, new Wall(createVector(30, 14), createVector(30, 2.5), 2));
    append(walls, new Wall(createVector(30, 14), createVector(30, 16), 2));
    append(walls, new Wall(createVector(30, 16), createVector(32, 16), 2));
    append(walls, new Wall(createVector(35, 16), createVector(39, 16), 2));
    append(walls, new Wall(createVector(39, 16), createVector(39, 2.8), 2));
    append(walls, new Wall(createVector(39, 16), createVector(42, 16), 2));
    append(walls, new Wall(createVector(45, 16), createVector(49, 16), 2));
    append(walls, new Wall(createVector(52, 16), createVector(55, 16), 2));
    append(walls, new Wall(createVector(55, 16), createVector(55, 3.4), 2));

    //extra
    append(walls, new Wall(createVector(55, 16), createVector(63, 16), 2));
    append(walls, new Wall(createVector(63, 16), createVector(63, 12), 2));
    append(walls, new Wall(createVector(63, 9), createVector(63, 3.9), 2));

    //extra 2
    append(walls, new Wall(createVector(1, 20), createVector(10, 20), 2));
    append(walls, new Wall(createVector(10, 20), createVector(10, 23), 2));
    append(walls, new Wall(createVector(10, 26), createVector(10, 29), 2));
    append(walls, new Wall(createVector(10, 29), createVector(10, 33), 2));






    //  USED FOR TESTING
    // append(nodes, new Node(15, 15, 1, false));
    // append(nodes, new Node(14, 10, 1, false));
    // append(nodes, new Node(14, 15, 1, false));
    // append(nodes, new Node(14, 20, 1, false));
    // append(nodes, new Node(14, 25, 1, false));
    // append(nodes, new Node(14, 30, 1, false));



    for (let i = 0; i < STATIC_NODE_COUNT; i++) {
        const x = random(2, 58);
        const y = random(4, 33);


        append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), false));
    }


    for (let i = 0; i < MOBILE_NODE_COUNT; i++) {
        const x = random(2, 58);
        const y = random(4, 33);

        append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), true));
    }

}

function draw() {
    background(51);

    waves.forEach(wave => {
        wave.update(walls);
        wave.show()
        if (wave.toDelete) {
            waves.splice(0, 1);
        }
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


}


function mouseClicked() {

    let randomIndex = Math.floor(Math.random() * nodes.length);
    let randomNode = nodes[randomIndex];
    randomNode.sendNewWave(waves);

    console.log(Node.receivers)
}