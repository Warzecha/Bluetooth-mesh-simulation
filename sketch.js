let nodes = [];
let walls = [];
let waves = [];

function setup() {
    createCanvas(windowWidth, windowHeight);


    //OUTER WALLS
    append(walls, new Wall(createVector(1, 1), createVector(WIDTH + 30, 4), 3));
    append(walls, new Wall(createVector(WIDTH + 30, 4), createVector(WIDTH + 30, HEIGHT - 7), 3));
    append(walls, new Wall(createVector(WIDTH + 30, HEIGHT - 7), createVector(WIDTH + 20, HEIGHT - 7), 3));
    append(walls, new Wall(createVector(WIDTH + 20, HEIGHT - 7), createVector(WIDTH + 20, HEIGHT - 4), 3));
    append(walls, new Wall(createVector(WIDTH + 20, HEIGHT - 4), createVector(21, HEIGHT - 4), 3));
    append(walls, new Wall(createVector(21, HEIGHT - 4), createVector(21, HEIGHT - 7), 3));
    append(walls, new Wall(createVector(21, HEIGHT - 7), createVector(1, HEIGHT - 7), 3));
    append(walls, new Wall(createVector(1, HEIGHT - 7), createVector(1, 1), 3));


    //INNER WALLS DOWN
    append(walls, new Wall(createVector(21, HEIGHT - 7), createVector(21, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(21, HEIGHT - 18), createVector(24, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(27, HEIGHT - 18), createVector(30, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(27, HEIGHT - 18), createVector(27, HEIGHT - 4), 2));
    append(walls, new Wall(createVector(33, HEIGHT - 18), createVector(37, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(37, HEIGHT - 18), createVector(37, HEIGHT - 4), 2));
    append(walls, new Wall(createVector(37, HEIGHT - 18), createVector(39, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(42, HEIGHT - 18), createVector(44, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(47, HEIGHT - 18), createVector(49, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(49, HEIGHT - 18), createVector(49, HEIGHT - 4), 2));
    append(walls, new Wall(createVector(55, HEIGHT - 18), createVector(60, HEIGHT - 18), 2));
    append(walls, new Wall(createVector(60, HEIGHT - 18), createVector(60, HEIGHT - 7), 2));

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
    append(walls, new Wall(createVector(10, 29), createVector(10, HEIGHT - 7), 2));






    //  USED FOR TESTING
    append(nodes, new Node(14, 5, 1, false));
    append(nodes, new Node(14, 10, 1, false));
    append(nodes, new Node(14, 15, 1, false));
    append(nodes, new Node(14, 20, 1, false));
    append(nodes, new Node(14, 25, 1, false));
    append(nodes, new Node(14, 30, 1, false));



    // for (let i = 0; i < STATIC_NODE_COUNT; i++) {
    //     const x = random(2, WIDTH-1);
    //     const y = random(2, HEIGHT-1);


    //     append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), false));
    // }


    // for (let i = 0; i < MOBILE_NODE_COUNT; i++) {
    //     const x = random(2, WIDTH-1);
    //     const y = random(2, HEIGHT-1);

    //     append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), true));
    // }

}

function draw() {
    background(51);

    waves.forEach(wave => {
        wave.show(walls);
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