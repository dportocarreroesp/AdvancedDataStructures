array_split = [];
mbr = null;
k = 2;

var mbr1 = null;
var mbr2 = null;
var v_l;
var v_d;

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Rectangle {
	constructor(x, y, w, h) {
		this.x = x; // center x
		this.y = y; // center y
		this.w = w; // half width
		this.h = h; // half height
	}
	contains(point) {
		if (
			point.x >= this.x - this.w &&
			point.x <= this.x + this.w &&
			point.y >= this.y - this.h &&
			point.y <= this.y + this.h
		) {
			return true;
		}
		return false;
	}
}

class NodoRTree {
	constructor(Bi, leaf, id = false) {
		this.Bi = Bi;
		this.is_root = id;
		this.minimum = ceil(0.4 * Bi);
		this.points = [];
		this.nro_data = 0;
		this.subtree = [];
		this.leaf = leaf;
	}
}

class Rtree {
	constructor(Bi) {
		this.Bi = Bi;
	}
	splitNode(NodeTree, i, first, last) {
		if (i == 0) {
			var max_x = NodeTree.points[last - 1].x;
			var min_x = NodeTree.points[first].x;
			var middle_x = (max_x + min_x) / 2;

			var max_y = 0;
			var min_y = 401;

			for (var j = first; j < last; j++) {
				if (NodeTree.points[j].y >= max_y) {
					max_y = NodeTree.points[j].y;
				}
				if (NodeTree.points[j].y <= min_y) {
					min_y = NodeTree.points[j].y;
				}
			}
			var middle_y = (max_y + min_y) / 2;

			mbr = null;
			mbr = new Rectangle(
				middle_x,
				middle_y,
				middle_x - min_x,
				middle_y - min_y
			);

			array_split = [];
			for (var h = first; h < last; h++) {
				array_split.push(NodeTree.points[h]);
			}

			var perimeter = (max_x - min_x) * 2 + (max_y - min_y) * 2;
			return perimeter;
		} else {
			var max_y = NodeTree.points[last - 1].y;
			var min_y = NodeTree.points[first].y;
			var middle_y = (max_y + min_y) / 2;

			var max_x = 0;
			var min_x = 401;

			for (var j = first; j < last; j++) {
				if (NodeTree.points[j].x >= max_x) {
					max_x = NodeTree.points[j].x;
				}
				if (NodeTree.points[j].x <= min_x) {
					min_x = NodeTree.points[j].x;
				}
			}
			var middle_x = (max_x + min_x) / 2;

			mbr = null;

			mbr = new Rectangle(
				middle_x,
				middle_y,
				middle_x - min_x,
				middle_y - min_y
			);

			array_split = [];
			for (var h = first; h < last; h++) {
				array_split.push(NodeTree.points[h]);
			}

			var perimeter = (max_x - min_x) * 2 + (max_y - min_y) * 2;
			return perimeter;
		}
	}

	split(NodeTree) {
		var m = NodeTree.nro_data;
		let i = 0;

		NodeTree.points.sort((a, b) => a.x - b.x);

		var sum_peri = 1600 * 2; // infinito
		while (i < k) {
			for (var j = NodeTree.minimum; j < m - NodeTree.minimum; j++) {
				var left_peri = this.splitNode(NodeTree, i, 0, j);
				var left_array = array_split;
				var left_s = mbr;

				var right_peri = this.splitNode(NodeTree, i, j, m);
				var right_array = array_split;
				var right_s = mbr;

				if (left_peri + right_peri <= sum_peri) {
					sum_peri = left_peri + right_peri;
					v_l = left_array;
					v_d = right_array;
					mbr1 = left_s;
					mbr2 = right_s;
				}
			}

			NodeTree.points.sort((a, b) => a.y - b.y);
			i++;
		}
	}

	handle_overflow(NodeTree, father = null) {
		this.split(NodeTree);
		if (NodeTree.is_root) {
			var new_Node = new NodoRTree(this.Bi, false, true);

			new_Node.subtree[0] = NodeTree;
			new_Node.points[0] = mbr1;
			new_Node.nro_data = 2;
			for (var i = 0; i < v_l.length; i++) {
				NodeTree.points[i] = v_l[i];
			}
			NodeTree.nro_data = v_l.length;

			var rigth_Node = new NodoRTree(this.Bi, true);
			new_Node.subtree[1] = rigth_Node;
			new_Node.points[1] = mbr2;
			rigth_Node.nro_data = v_d.length;

			for (var j = 0; j < v_d.length; j++) {
				rigth_Node.points[j] = v_d[j];
			}

			NodeTree.is_root = false;
			return new_Node;
		} else {
			var new_Node = new NodoRTree(this.Bi, true); //leaf

			var index;
			for (var i = 0; i < father.nro_data; i++) {
				if (father.subtree[i].nro_data > this.Bi) {
					index = i;
				}
			}
			for (var j = index + 1; j < father.nro_data; j++) {
				father.subtree[j + 1] = father.subtree[j];
				father.points[j + 1] = father.points[j];
			}
			father.subtree[index + 1] = new_Node;
			father.points[index + 1] = mbr2;
			father.points[index] = mbr1;
			father.nro_data++;

			for (var k = 0; k < v_l.length; k++) {
				NodeTree.points[k] = v_l[k];
			}
			NodeTree.nro_data = v_l.length;

			for (var l = 0; l < v_d.length; l++) {
				new_Node.points[l] = v_d[l];
			}

			new_Node.nro_data = v_d.length;

			if (father.nro_data > this.Bi) {
				//split nodo interno
				var new_root = this.handle_overflow(father /*grandfather*/);
				father = new_root;
			}
			return father;
		}
	}
	choose_subtree(NodeTree, point) {
		var i;

		var new_x;
		var new_y;
		var new_w;
		var new_h;
		var min_perimeter = 1600 * 2;
		var index;

		for (i = 0; i < NodeTree.nro_data; i++) {
			var veri_perimeter = 0;
			var x = NodeTree.points[i].x;
			var y = NodeTree.points[i].y;
			var w = NodeTree.points[i].w;
			var h = NodeTree.points[i].h;

			if (NodeTree.points[i].contains(point)) {
				return NodeTree.subtree[i];
			} else {
				//return null;
				var into_x = false;
				var into_y = false;
				var aux_x = 0;
				var aux_y = 0;
				var aux_w = 0;
				var aux_h = 0;

				if (point.x >= x - w && point.x <= x + w) {
					into_x = true;
				}
				if (point.y >= y - h && point.y <= y + h) {
					into_y = true;
				}
				if (into_x == true && into_y == false) {
					var range = point.y - y;
					if (range >= 0) {
						var incre_middle = (point.y + (y - h)) / 2;
						aux_x = x;
						aux_y = incre_middle;
						aux_w = w;
						aux_h = incre_middle - (y - h);
						veri_perimeter = 2 * w + 2 * aux_h;
					} else {
						var incre_middle = (point.y + (y + h)) / 2;
						aux_x = x;
						aux_y = incre_middle;
						aux_w = w;
						aux_h = y + h - incre_middle;
						veri_perimeter = 2 * w + 2 * aux_h;
					}
				} else if (into_x == false && into_y == true) {
					var range = point.x - x;
					if (range >= 0) {
						//var incre_width = x + range;
						var incre_middle = (point.x + (x - w)) / 2;
						aux_x = incre_middle;
						aux_y = y;
						aux_w = incre_middle - (x - w);
						aux_h = h;
						veri_perimeter = 2 * h + 2 * aux_w;
					} else {
						var incre_middle = (point.x + (x + w)) / 2;
						aux_x = incre_middle;
						aux_y = y;
						aux_w = x + w - incre_middle;
						aux_h = h;
						veri_perimeter = 2 * h + 2 * aux_w;
					}
				} else if (into_x == false && into_y == false) {
					var range_x = point.x - x;
					var range_y = point.y - y;
					if (range_x >= 0 && range_y >= 0) {
						var incre_middle_x = (point.x + (x - w)) / 2;
						var incre_middle_y = (point.y + (y - h)) / 2;

						aux_x = incre_middle_x;
						aux_y = incre_middle_y;
						aux_w = incre_middle_x - (x - w);
						aux_h = incre_middle_y - (y - h);
						veri_perimeter = 2 * aux_w + 2 * aux_h;
					} else if (range_x >= 0 && range_y <= 0) {
						var incre_middle_x = (point.x + (x - w)) / 2;
						var incre_middle_y = (point.y + (y + h)) / 2;

						aux_x = incre_middle_x;
						aux_y = incre_middle_y;
						aux_w = incre_middle_x - (x - w);
						aux_h = y + h - incre_middle_y;
						veri_perimeter = 2 * aux_w + 2 * aux_h;
					} else if (range_x <= 0 && range_y <= 0) {
						var incre_middle_x = (point.x + (x + w)) / 2;
						var incre_middle_y = (point.y + (y + h)) / 2;
						aux_x = incre_middle_x;
						aux_y = incre_middle_y;
						aux_w = x + w - incre_middle_x;
						aux_h = y + h - incre_middle_y;
						veri_perimeter = 2 * aux_w + 2 * aux_h;
					} else if (range_x <= 0 && range_y >= 0) {
						var incre_middle_x = (point.x + (x + w)) / 2;
						var incre_middle_y = (point.y + (y - h)) / 2;
						aux_x = incre_middle_x;
						aux_y = incre_middle_y;
						aux_w = x + w - incre_middle_x;
						aux_h = incre_middle_y - (y - h);
						veri_perimeter = 2 * aux_w + 2 * aux_h;
					}
				}
			}
			if (veri_perimeter <= min_perimeter) {
				min_perimeter = veri_perimeter;
				new_x = aux_x;
				new_y = aux_y;
				new_w = aux_w;
				new_h = aux_h;
				index = i;
			}
		}
		NodeTree.points[index].x = new_x;
		NodeTree.points[index].y = new_y;
		NodeTree.points[index].w = new_w;
		NodeTree.points[index].h = new_h;

		return NodeTree.subtree[index];
	}
	insert(root, point, father = null) {
		if (root === null) {
			root = new NodoRTree(this.Bi, true, true);
		}
		if (root.leaf) {
			root.points[root.nro_data] = point;
			root.nro_data++;
			if (root.nro_data > root.Bi) {
				//u has B+1 points
				var new_root = this.handle_overflow(root, father);
				root = new_root;
			}
		} else {
			var v = this.choose_subtree(root, point);
			this.insert(v, point, root);
		}
		return root;
	}

	traverse(root) {
		var i;
		for (i = 0; i < root.nro_data; i++) {
			console.log(root.points[i]);
			if (root.leaf === false) {
				stroke(0, 255, 0);
				strokeWeight(1);
				noFill();
				rectMode(CENTER);
				rect(
					root.points[i].x,
					400 - root.points[i].y,
					2 * root.points[i].w,
					2 * root.points[i].h
				);
				this.traverse(root.subtree[i]);
			}
		}

		// Print the subtree rooted with last child
		//if (root.leaf == false)
		//  this.traverse(root.subtree[i]);
	}
}
