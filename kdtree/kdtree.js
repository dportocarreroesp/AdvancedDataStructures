var k=2;

class Node{
	constructor(point,axis){
		this.point = point;
		this.left = null;
		this.right = null;
		this.axis = axis;
	}
}

function getHeight(node){
	if(node == null)
		return -1;
	else
		return (1 + Math.max(getHeight(node.left), getHeight(node.right)));
}


function generate_dot(node){}



function kdtree(points, depth) {
	var axis, median, node = {};
	

	if (!points || points.length == 0) return;	 

	axis = depth % k;

	points.sort((a, b) => a[axis] - b[axis]);
	median = Math.floor(points.length / 2);

	node.location = points[median];
	node.left = kdtree(points.slice(0, median), depth + 1);
	node.right = kdtree(points.slice(median + 1), depth + 1);

	return node;
}


var points = [[7, 2], [5, 4], [9, 6], [4, 7], [8, 1], [2, 3]];
var kd=kdtree(points, 0);
//console.log(points);
print(kd);
print(getHeight(kd));
