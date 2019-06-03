let nodes = [];
let connections = [];
let walls = [];
let waves = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // append(walls, new Wall(createVector(100, 100), createVector(600, 100), 1))
    // append(walls, new Wall(createVector(100, 200), createVector(600, 200), 2))
    append(walls, new Wall(createVector(0, 50), createVector(windowWidth / 2 - 40, 50), 3));
    append(walls, new Wall(createVector(windowWidth / 2 + 40, 50), createVector(windowWidth, 50), 3));
    append(walls, new Wall(createVector(windowWidth, 50), createVector(windowWidth, windowHeight), 3));
    append(walls, new Wall(createVector(windowWidth, windowHeight), createVector(0, windowHeight), 3));
    append(walls, new Wall(createVector(0, windowHeight), createVector(0, 50), 3));


        //  USED FOR TESTING
        // append(nodes, new Node(300, 200, 1, false));
        // append(nodes, new Node(300, 300, 1, false));
        // append(nodes, new Node(300, 400, 1, false));
        // append(nodes, new Node(300, 500, 1, false));
        // append(nodes, new Node(300, 600, 1, false));
        // append(nodes, new Node(300, 700, 1, false));
        // append(nodes, new Node(300, 800, 1, false));

    for (let i = 0; i < STATIC_NODE_COUNT; i++) {
        const x = random(0, windowWidth);
        const y = random(0, windowHeight);

    
        append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), false));
    }




    for (let i = 0; i < MOBILE_NODE_COUNT; i++) {
        const x = random(0, windowWidth);
        const y = random(0, windowHeight);

        append(nodes, new Node(x, y, Math.floor(Math.random() * 3 + 1), true));
    }


    // for (let i = 0; i < nodes.length; i++) {
    //     for (let j = i + 1; j < nodes.length; j++) {
    //         append(connections, new Connection(nodes[i], nodes[j]));
    //     }
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

    connections.forEach(connection => {
        walls.forEach(w => {
            connection.updateIntersection(w);
        });
        connection.show();
    });


}


function mouseClicked() {

    let randomIndex = Math.floor(Math.random()*nodes.length);
    let randomNode = nodes[randomIndex];
    randomNode.sendNewWave(waves);

    console.log(Node.receivers)
  }