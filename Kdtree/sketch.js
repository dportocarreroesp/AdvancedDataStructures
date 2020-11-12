var bpq = new BPQ(3);
var queue = [];
var nodes_visited = 0;

function setup() {
	var width = 250;
	var height = 200;
	createCanvas(width, height);

	background(0);
	/* for (var x = 0; x < width; x += width / 10) {
		for (var y = 0; y < height; y += height / 5) {
			stroke(125, 125, 125);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	} */

	// Generar 6 puntos aleatorios
	/* var data = [];
	for (let i = 0; i < 6; i++) {
		var x = Math.floor(Math.random() * height);
		var y = Math.floor(Math.random() * height);
		data.push([x, y]);

		fill(225, 225, 225);
		circle(x, 200 - y, 7);
		textSize(8);
		text(x + "," + y, x + 5, 200 - y);
	}
	var point = [
		Math.floor(Math.random() * height),
		Math.floor(Math.random() * height),
	];
	var radio = 40;
	var w = 50;
	var h = 40; */

	// Ejercicio 2
	/* var data = [
		[40, 70],
		[70, 130],
		[90, 40],
		[110, 100],
		[140, 110],
		[160, 100],
	];
    var point = [140, 90]; 
    var radio = 40; 
    var w = 50;
    var h = 40; */

	// Ejercicio 3
	var data = [
		[40, 70],
		[70, 130],
		[90 ,40],
		[110, 100],
		[140, 110],
		[160, 100],
		[150, 30],
	];
    var point = [140, 90];
    var radio = 25;
    var w = 50;
    var h = 40;
	for (let i = 0; i < data.length; i++) {
		fill(225, 225, 225);
		circle(data[i][0], 200 - data[i][1], 7);
		textSize(8);
		text(data[i][0] + "," + data[i][1], data[i][0] + 5, 200 - data[i][1]);
    }
    // Queried point
	fill(255, 0, 0);
	circle(point[0], 200 - point[1], 7);
	textSize(8);
	text(point[0] + "," + point[1], point[0] + 5, 200 - point[1]);

    // Circle
	noFill();
	stroke(0, 255, 0);
	strokeWeight(1);
	circle(point[0], 200 - point[1], radio * 2);

    // Rectangle
	noFill();
	stroke(0, 0, 255);
	strokeWeight(1);
	rect(point[0] - w / 2, 200 - point[1] - h / 2, w, h);

	var root = build_kdtree(data, 0);

	console.log(root);
	var dotString = generate_dot(root);
	console.log(dotString);
	console.log("Queried point: " + point);
	console.log("Brute force: " + closest_point_brute_force(data, point));
	console.log("Naive closest point: " + naive_closest_point(root, point));
	console.log("Closest point: " + closest_point(root, point));

	// Ejercicio 5
	let arr = new Array();
	var n = 3;
	k_nearest_neighbor(root, point, arr);
	arr.sort((a, b) => distanceSquared(point, a) - distanceSquared(point, b));
	console.log(n + " puntos más cercanos: ");
	for (i = 0; i < n; i++) console.log(arr[i]);

	knn(root, point);
	console.log(bpq);

	range_query_circle(root, point, radio, queue);
    for (let i = 0; i < queue.length; i++) {
		fill(0, 255, 0);
		circle(queue[i][0], 200 - queue[i][1], 7);
    }

	/* var up_left = [point[0] - w / 2, point[1] + h / 2];
	var low_right = [point[0] + w / 2, point[1] - h / 2];
	range_query_rec(root, up_left, low_right, queue);
	for (let i = 0; i < queue.length; i++) {
		fill(0, 0, 255);
		circle(queue[i][0], 200 - queue[i][1], 7);
	} */

	console.log(queue);
	console.log(nodes_visited);

	// Se necesita d3-graphviz para ejecutar la siguiente línea
	// caso contrario, comentar la siguiente línea
	/* d3.select("#graph").graphviz().renderDot(dotString); */
}
