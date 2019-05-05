let nodes = [];
let connections = [];

const classToRange = {
	1: 300,
	2: 200,
	3: 100
}


let time;

function setup() {
	createCanvas(windowWidth, windowHeight);

	time = 0.0;


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

}

function draw() {
	background(51);

	nodes.forEach(node => {
		node.moveRandomly(time);
		node.show();
	});

	connections = [];

	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {

			let node1Pos = nodes[i].getPositionVector(); 
			let node2Pos = nodes[j].getPositionVector(); 

			let node1class = nodes[i].bluetoothClass;

			let maxRange = classToRange[node1class]

			if(node1Pos.dist(node2Pos) < maxRange) {
				append(connections, new Connection(node1Pos, node2Pos));
			}

		}
	}

	connections.forEach(connection => {
		connection.show();
	});


	time += 0.01;
}