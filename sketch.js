let nodes = [];
let walls = [];
let waves = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // append(walls, new Wall(createVector(100, 100), createVector(600, 100), 1))
    // append(walls, new Wall(createVector(100, 200), createVector(600, 200), 2))
    append(walls, new Wall(createVector(1, 1), createVector(1, HEIGHT-1), 3));


        //  USED FOR TESTING
        // append(nodes, new Node(14, 5, 1, false));
        // append(nodes, new Node(14, 10, 1, false));
        // append(nodes, new Node(14, 15, 1, false));
        // append(nodes, new Node(14, 20, 1, false));
        // append(nodes, new Node(14, 25, 1, false));
        append(nodes, new Node(3, 20, 1, false));
        append(nodes, new Node(13, 20, 1, false));


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

    let randomIndex = Math.floor(Math.random()*nodes.length);
    let randomNode = nodes[randomIndex];
    randomNode.sendNewWave(waves);

    console.log(Node.receivers)
  }