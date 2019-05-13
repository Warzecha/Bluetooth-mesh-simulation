let nodes = [];
let connections = [];
let walls = [];



let time;

function setup() {
	createCanvas(windowWidth, windowHeight);

	time = 0.0;

	// append(walls, new Wall(createVector(100, 100), createVector(600, 100), 1))
	// append(walls, new Wall(createVector(100, 200), createVector(600, 200), 2))
	append(walls, new Wall(createVector(100, 300), createVector(600, 300), 3))


	for (let i = 0; i < STATIC_NODE_COUNT; i++) {
		const x = random(0, windowWidth)
		const y = random(0, windowHeight)

		append(nodes, new Node(x, y, 2, false));
	}

	for (let i = 0; i < MOBILE_NODE_COUNT; i++) {
		const x = random(0, windowWidth)
		const y = random(0, windowHeight)

		append(nodes, new Node(x, y, 1, true));
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
		node.moveRandomly(time);
		node.show();
	});

	walls.forEach(wall => {
		wall.show();
	})

	connections.forEach(connection => {
		walls.forEach(w => {
			connection.updateIntersection(w);
		})
		connection.show();
	});


	time += 0.01;

	console.log(connections.length)
}