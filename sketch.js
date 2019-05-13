let nodes = [];
let connections = [];
let walls = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // append(walls, new Wall(createVector(100, 100), createVector(600, 100), 1))
    // append(walls, new Wall(createVector(100, 200), createVector(600, 200), 2))
    append(walls, new Wall(createVector(0, windowHeight / 2), createVector(windowWidth, windowHeight / 2), 3));


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


    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            append(connections, new Connection(nodes[i], nodes[j]));
        }
    }

}

function draw() {
    background(51);

    nodes.forEach(node => {
        node.moveRandomly();
        node.show();
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

    console.log(connections.length)
}