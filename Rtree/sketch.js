function setup() {
	var width = 400;
	var height = 400;
	createCanvas(width, height);

	background(0);
	rt = new RTree(4);
	for (i = 0; i < 20; i++) {
		var x = Math.floor(Math.random() * width);
		var y = Math.floor(Math.random() * height);
		var p = new Rectangle(x, y, 0, 0);

		fill(225, 225, 225);
		circle(p.x, 400 - p.y, 7);
		textSize(8);
		text(p.x + "," + p.y, p.x + 5, 400 - p.y);
		rt.insertPoint(p);
	}
	console.log(rt);
	rt.traverse(rt.root);
}