k = 2;

class Node {
	constructor(point, axis) {
		this.point = point;
		this.left = null;
		this.right = null;
		this.axis = axis;
	}
}

function preorden(node) {
	if (!node) return;
	console.log(node.point);
	preorden(node.left);
	preorden(node.right);
}

function getHeight(node) {
	if (!node) return -1;
	else return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function recursive_generate_dot(node) {
	let txt = "";
	if (node) {
		if (node.left) {
			txt = txt + '\t"';
			txt = txt + node.point;
			txt = txt + '" -> "';
			txt = txt + node.left.point;
			txt = txt + '";\n';
			txt = txt + recursive_generate_dot(node.left);
		}
		if (node.right) {
			txt = txt + '\t"';
			txt = txt + node.point;
			txt = txt + '" -> "';
			txt = txt + node.right.point;
			txt = txt + '";\n';
			txt = txt + recursive_generate_dot(node.right);
		}
	}
	return txt;
}

function generate_dot(node) {
	string = "digraph G {\n";
	string = string + recursive_generate_dot(node);
	string = string + "}\n";
	return string;
}

function build_kdtree(points, depth = 0, father = null) {
	if (!points.length) return null;

	n = points.length;
	m = points[0].length;

	eje = depth % m;

	points.sort((a, b) => a[eje] - b[eje]);
	median = Math.ceil((points.length - 1) / 2);

	let izq = [];
	let der = [];
	for (let i = 0; i < median; i++) izq.push(points[i]);
	for (let i = median + 1; i < n; i++) der.push(points[i]);

	let node = new Node(points[median], eje);

	/******************creacion de sectores****************/
	var width = 250;
	var height = 200;
	var c = color(255, 204, 0);
	stroke(c);
	if (eje == 1) {
		var y = node.point[eje];
		if (node.point[father.axis] < father.point[father.axis]) {
			line(0, 200 - y, father.point[father.axis], 200 - y);
		} else {
			line(father.point[father.axis], 200 - y, width, 200 - y);
		}
	} else if (eje == 0) {
		var x = node.point[eje];
		if (!father) {
			line(x, 0, x, height);
		} else {
			if (node.point[father.axis] < father.point[father.axis]) {
				line(x, 200 - father.point[father.axis], x, height);
			} else {
				line(x, 0, x, 200 - father.point[father.axis]);
			}
		}
	}
	father = node;
	/*****************************************************/

	node.left = build_kdtree(izq, depth + 1, father);
	node.right = build_kdtree(der, depth + 1, father);

	return node;
}

function distanceSquared(point1, point2) {
	var distance = 0;
	for (var i = 0; i < k; i++) distance += Math.pow(point1[i] - point2[i], 2);
	return Math.sqrt(distance);
}

function distanceNonSquared(point1, point2) {
	var distance = 0;
	for (var i = 0; i < k; i++) distance += Math.pow(point1[i] - point2[i], 2);
	return distance;
}

function rectangleContains(up_left, low_right, point) {
	return (
		point[0] >= up_left[0] &&
		point[0] <= low_right[0] &&
		point[1] <= up_left[1] &&
		point[1] >= low_right[1]
	);
}

function closest_point_brute_force(points, point) {
	if (points.length < 1) return null;
	if (points.length == 1) return points[0];

	var min = distanceSquared(point, points[0]);
	var minPoint = points[0];

	for (let i = 1; i < points.length; i++) {
		var distance = distanceSquared(point, points[i]);
		if (distance < min) {
			min = distance;
			minPoint = points[i];
		}
	}

	return minPoint;
}

function naive_closest_point(node, point, depth = 0, best = null) {
	if (!node) return best;

	if (!depth) {
		best = node.point;
	} else {
		if (distanceSquared(node.point, point) < distanceSquared(best, point)) {
			best = node.point;
		}
	}

	var axis = depth % node.point.length;

	if (point[axis] < node.point[axis]) {
		return naive_closest_point(node.left, point, depth + 1, best);
	} else {
		return naive_closest_point(node.right, point, depth + 1, best);
	}
}

function closest_point(node, point, depth = 0, best = null) {
	if (!node) return best;

	if (!depth) {
		best = node.point;
	} else {
		if (distanceSquared(node.point, point) < distanceSquared(best, point)) {
			best = node.point;
		}
	}
	var axis = depth % node.point.length;

	if (point[axis] < node.point[axis]) {
		best = closest_point(node.left, point, depth + 1, best);
		if (
			Math.abs(point[axis] - node.point[axis]) <
			distanceSquared(point, best)
		)
			best = closest_point(node.right, point, depth + 1, best);
	} else {
		best = closest_point(node.right, point, depth + 1, best);
		if (
			Math.abs(point[axis] - node.point[axis]) <
			distanceSquared(point, best)
		)
			best = closest_point(node.left, point, depth + 1, best);
	}
	return best;
}

function k_nearest_neighbor(node, point, arr, depth = 0, best = null) {
	if (!node) return best;

	if (!depth) {
		best = node.point;
	} else {
		if (distanceSquared(node.point, point) < distanceSquared(best, point)) {
			best = node.point;
		}
	}
	var axis = depth % node.point.length;
	arr.push(node.point);
	if (point[axis] < node.point[axis]) {
		best = k_nearest_neighbor(node.left, point, arr, depth + 1, best);
		if (
			Math.abs(point[axis] - node.point[axis]) <
			distanceSquared(point, best)
		)
			best = k_nearest_neighbor(node.right, point, arr, depth + 1, best);
	} else {
		best = k_nearest_neighbor(node.right, point, arr, depth + 1, best);
		if (
			Math.abs(point[axis] - node.point[axis]) <
			distanceSquared(point, best)
		)
			best = k_nearest_neighbor(node.left, point, arr, depth + 1, best);
	}
	return best;
}

function k_closest_order(arr, k, point, res) {
	if (arr.lenght < k) {
		k = arr.lenght;
	}
	for (i = 0; i < k; i++) {
		var tmp = arr[0];
		var pos = 0;
		for (j = 1; j < arr.length; j++) {
			if (distanceSquared(arr[j], point) < distanceSquared(tmp, point)) {
				tmp = arr[j];
				pos = j;
			}
		}
		arr.splice(pos, 1);
		res.push(tmp);
	}
}

function knn(node, query_point, depth = 0) {
	/*
    Let the test point be P = (y0, y1, ..., yk).
    Maintain a BPQ of the candidate nearest neighbors, called 'bpq'
    Set the maximum size of 'bpq' to k
    Starting at the root, execute the following procedure:
    
    if curr == NULL
        return
    
    Add the current point to the BPQ. Note that this is a no-op if the
    point is not as good as the points we've seen so far.
     
     enqueue curr into bpq with priority distance(curr, P)

    Recursively search the half of the tree that contains the test point. 
    
    if yi < curri
        recursively search the left subtree on the next axis
    else
        recursively search the right subtree on the next axis
    
    If the candidate hypersphere crosses this splitting plane, look on the
      other side of the plane by examining the other subtree.
     
     if:
        bpq isn't full
     -or-
     |curri – yi| is less than the priority of the max-priority elem of bpq
        then
        recursively search the other subtree on the next axis
    */

	nodes_visited += 1;

	if (node === null) return;

	bpq.insert(node.point, distanceSquared(node.point, query_point)); //insertamos el nodo visitado a l a pila

	var axis = depth % k;
	var next_branch = null;
	var opposite_branch = null;

	if (query_point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}

	knn(next_branch, query_point, depth + 1);

	//si aun hay espacio en la pila y ademas el de prioridad mayor es > a y_1-y_0
	if (
		bpq.queue.length < bpq.size ||
		Math.abs(query_point[axis] - node.point[axis]) <
			bpq.queue[bpq.queue.length - 1].priority
	) {
		knn(opposite_branch, query_point, depth + 1);
	}
}

function knn(node, query_point, depth = 0) {
	/*
    Let the test point be P = (y0, y1, ..., yk).
    Maintain a BPQ of the candidate nearest neighbors, called 'bpq'
    Set the maximum size of 'bpq' to k
    Starting at the root, execute the following procedure:
    
    if curr == NULL
        return
    
    Add the current point to the BPQ. Note that this is a no-op if the
    point is not as good as the points we've seen so far.
     
     enqueue curr into bpq with priority distance(curr, P)

    Recursively search the half of the tree that contains the test point. 
    
    if yi < curri
        recursively search the left subtree on the next axis
    else
        recursively search the right subtree on the next axis
    
    If the candidate hypersphere crosses this splitting plane, look on the
      other side of the plane by examining the other subtree.
     
     if:
        bpq isn't full
     -or-
     |curri – yi| is less than the priority of the max-priority elem of bpq
        then
        recursively search the other subtree on the next axis
    */

	if (node === null) return;

	bpq.insert(node.point, distanceSquared(node.point, query_point));

	var axis = depth % k;
	var next_branch = null;
	var opposite_branch = null;

	if (query_point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}

	knn(next_branch, query_point, depth + 1);

	if (
		bpq.queue.length < bpq.size ||
		Math.abs(query_point[axis] - node.point[axis]) <
			bpq.queue[bpq.queue.length - 1].priority
	) {
		knn(opposite_branch, query_point, depth + 1);
	}
}

function range_query_circle(node, center, radio, queue, depth = 0) {
	if (node === null) return;

	var axis = depth % k;

	if (distanceNonSquared(node.point, center) <= radio * radio)
		queue.push(node.point);

	nodes_visited++;

	if (node.point[axis] - center[axis] >= radio) {
		range_query_circle(node.left, center, radio, queue, depth + 1);
		return;
	}
	if (center[axis] - node.point[axis] >= radio) {
		range_query_circle(node.right, center, radio, queue, depth + 1);
		return;
	}

	range_query_circle(node.left, center, radio, queue, depth + 1);
	range_query_circle(node.right, center, radio, queue, depth + 1);
}

function range_query_rec(node, up_left, low_right, queue, depth = 0) {
	if (node === null) return;

	var axis = depth % k;
	if (rectangleContains(up_left, low_right, node.point)) {
		queue.push(node.point);
	}

	nodes_visited++;
	if (!axis) {
		if (low_right[axis] <= node.point[axis]) {
			range_query_rec(node.left, up_left, low_right, queue, depth + 1);
			return;
		}
		if (up_left[axis] >= node.point[axis]) {
			range_query_rec(node.right, up_left, low_right, queue, depth + 1);
			return;
		}
	} else {
		if (up_left[axis] <= node.point[axis]) {
			range_query_rec(node.left, up_left, low_right, queue, depth + 1);
			return;
		}
		if (low_right[axis] >= node.point[axis]) {
			range_query_rec(node.right, up_left, low_right, queue, depth + 1);
			return;
		}
	}

	range_query_rec(node.left, up_left, low_right, queue, depth + 1);
	range_query_rec(node.right, up_left, low_right, queue, depth + 1);
}
