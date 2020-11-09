function setup() {
	var width = 250;
	var height = 200;
	createCanvas(width, height);

	background(0);
	for (var x = 0; x < width; x += width / 10) {
		for (var y = 0; y < height; y += height / 5) {
			stroke(125, 125, 125);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}

	/* var data = [];
	for (let i = 0; i < 6; i++) {
		var x = Math.floor(Math.random() * height);
		var y = Math.floor(Math.random() * height);
		data.push([x, y]);

		fill(225, 225, 225);
		circle(x, 200 - y, 7);
		textSize(8);
		text(x + "," + y, x + 5, 200 - y);
    } */

	// Ejercicio 2
	/* var data = [
		[40, 70],
		[70, 130],
		[90, 40],
		[110, 100],
		[140, 110],
		[160, 100],
	];
    var point = [140, 90]; */

	// Ejercicio 3
	var data = [
		[40, 70],
		[70, 130],
		[90, 40],
		[110, 100],
		[140, 110],
		[160, 100],
		[150, 30],
	];
	var point = [140, 90];
	for (let i = 0; i < data.length; i++) {
		fill(225, 225, 225);
		circle(data[i][0], 200 - data[i][1], 7);
		textSize(8);
		text(data[i][0] + "," + data[i][1], data[i][0] + 5, 200 - data[i][1]);
	}
	fill(255, 0, 0);
	circle(point[0], 200 - point[1], 7);
	textSize(8);
	text(point[0] + "," + point[1], point[0] + 5, 200 - point[1]);

	var root = build_kdtree(data, 0);

    console.log(root);
    var dotString = generate_dot(root)
	console.log(dotString);
	console.log("Queried point: " + point);
	console.log("Brute force: " + closest_point_brute_force(data, point));
    console.log("Naive closest point: " + naive_closest_point(root, point));
    console.log("Closest point: " + closest_point(root, point));

    // Se necesita d3-graphviz para ejecutar la siguiente línea
    // caso contrario, comentar la siguiente línea
    d3.select("#graph").graphviz().renderDot(dotString);
}
