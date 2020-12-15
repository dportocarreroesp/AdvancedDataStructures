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
	getPerimeter() {
		/* Multiplied by 4 because it's half and 2 sides */
		return this.w * 4 + this.h * 4;
	}
}

/* 
    Cuando el nodo sea hoja, el arreglo MBRs
    a pesar de contener objetos de la clase rectangulo,
    contendra las cordenadas de los puntos.
*/
class Node {
	constructor(isLeaf, parent, childIdx) {
		this.MBRs = [];
		this.childs = [];
		this.isLeaf = isLeaf;
		this.parent = parent;
        this.childIdx = childIdx;
        /* fixeo temporal */
        this.sortFactor = -1;
	}
}

/* 
    Given an MBR and a point. calculate the minimum perimeter increase
    required in order to contain the point 
*/
function perimeterIncrease(MBR, point, newMBR) {
	if (MBR.contains(point)) {
		newMBR.x = MBR.x;
		newMBR.y = MBR.y;
		newMBR.w = MBR.w;
		newMBR.h = MBR.h;
		return 0;
	} else {
		if (point.y <= MBR.y + MBR.h && point.y >= MBR.y - MBR.h) {
			/* Left or right*/
			if (point.x <= MBR.x - MBR.w) {
				newMBR.w = (MBR.x + MBR.w - point.x) / 2;
				newMBR.x = point.x + newMBR.w;
			} else {
				newMBR.w = (point.x - (MBR.x - MBR.w)) / 2;
				newMBR.x = point.x - newMBR.w;
			}
			newMBR.y = MBR.y;
			newMBR.h = MBR.h;
			return newMBR.getPerimeter();
		} else if (point.x <= MBR.x + MBR.w && point.x >= MBR.x - MBR.w) {
			/* Down or up */
			if (point.y <= MBR.y - MBR.h) {
				newMBR.h = (MBR.y + MBR.h - point.y) / 2;
				newMBR.y = point.y + newMBR.h;
			} else {
				newMBR.h = (point.y - (MBR.y - MBR.h)) / 2;
				newMBR.y = point.y - newMBR.h;
			}
			newMBR.x = MBR.x;
			newMBR.w = MBR.w;
		} else {
			var upLeft = [MBR.x - MBR.w, MBR.y + MBR.h];
			var upRight = [MBR.x + MBR.w, MBR.y + MBR.h];
			var downLeft = [MBR.x - MBR.w, MBR.y - MBR.h];
			var downRight = [MBR.x + MBR.w, MBR.y - MBR.h];
			if (point.x <= upLeft[0] && point.y >= upLeft[1]) {
				newMBR.w = (MBR.x + MBR.w - point.x) / 2;
				newMBR.x = point.x + newMBR.w;
				newMBR.h = (point.y - (MBR.y - MBR.h)) / 2;
				newMBR.y = point.y - newMBR.h;
			} else if (point.x <= downLeft[0] && point.y <= upLeft[1]) {
				newMBR.w = (MBR.x + MBR.w - point.x) / 2;
				newMBR.x = point.x + newMBR.w;
				newMBR.h = (MBR.y + MBR.h - point.y) / 2;
				newMBR.y = point.y + newMBR.h;
			} else if (point.x >= upRight[0] && point.y >= upRight[1]) {
				newMBR.w = (point.x - (MBR.x - MBR.w)) / 2;
				newMBR.x = point.x - newMBR.w;
				newMBR.h = (point.y - (MBR.y - MBR.h)) / 2;
				newMBR.y = point.y - newMBR.h;
			} else if (point.x >= downRight[0] && point.y <= downRight[1]) {
				newMBR.w = (point.x - (MBR.x - MBR.w)) / 2;
				newMBR.x = point.x - newMBR.w;
				newMBR.h = (MBR.y + MBR.h - point.y) / 2;
				newMBR.y = point.y + newMBR.h;
			}
		}
		return newMBR.getPerimeter();
	}
}

function perimeterPoints(points, tempMBR) {
	var minX = Infinity;
	var minY = Infinity;
	var maxX = -Infinity;
	var maxY = -Infinity;
	points.forEach((point) => {
		if (point.x < minX) minX = point.x;
		if (point.x > maxX) maxX = point.x;
		if (point.y < minY) minY = point.y;
		if (point.y > maxY) maxY = point.y;
	});

	tempMBR.w = (maxX - minX) / 2;
	tempMBR.h = (maxY - minY) / 2;
	tempMBR.x = minX + tempMBR.w;
	tempMBR.y = minY + tempMBR.h;

	return tempMBR.getPerimeter();
}

function perimeterMBRs(MBRs, tempMBR) {
	var minX = Infinity;
	var minY = Infinity;
	var maxX = -Infinity;
	var maxY = -Infinity;
	MBRs.forEach((MBR) => {
		if (MBR.x - MBR.w < minX) minX = MBR.x - MBR.w;
		if (MBR.x + MBR.w > maxX) maxX = MBR.x + MBR.w;
		if (MBR.y - MBR.h < minY) minY = MBR.y - MBR.h;
		if (MBR.y + MBR.h > maxY) maxY = MBR.y + MBR.h;
	});

	tempMBR.w = (maxX - minX) / 2;
	tempMBR.h = (maxY - minY) / 2;
	tempMBR.x = minX + tempMBR.w;
	tempMBR.y = minY + tempMBR.h;

	return tempMBR.getPerimeter();
}

class RTree {
	constructor(B) {
		this.root = new Node(true, null, -1);
		this.size = 0;
		this.B = B;
	}

	/* 
        choose_subtree updates the mbr of the optimal subtree
        and returns its index
    */
	choose_subtree(node, point) {
		var minPerimeter = Infinity;
		var minIndex = -1;
		var minMBR = new Rectangle(0, 0, 0, 0);
		var newMBR = new Rectangle(0, 0, 0, 0);
		node.MBRs.forEach((MBR, index) => {
			var perimeterInc = perimeterIncrease(MBR, point, newMBR);
			if (perimeterInc < minPerimeter) {
				minPerimeter = perimeterInc;
				minIndex = index;
				minMBR.x = newMBR.x;
				minMBR.y = newMBR.y;
				minMBR.w = newMBR.w;
				minMBR.h = newMBR.h;
			}
		});
		node.MBRs[minIndex].x = minMBR.x;
		node.MBRs[minIndex].y = minMBR.y;
		node.MBRs[minIndex].w = minMBR.w;
		node.MBRs[minIndex].h = minMBR.h;
		return minIndex;
	}

	split_leaf(node, u, ux, newUMBR, newUxMBR) {
		let m = node.MBRs.length;
		let minPerimeter = Infinity;
		let tempUMBR = new Rectangle(0, 0, 0, 0);
		let tempUxMBR = new Rectangle(0, 0, 0, 0);
		let tempU = [];
		let tempUx = [];
		/* Sort with respect to x axis */
		node.MBRs.sort((a, b) => a.x - b.x);
		for (let i = ceil(this.B * 0.4); i <= m - ceil(this.B * 0.4); i++) {
			let s1 = node.MBRs.slice(0, i);
			let s2 = node.MBRs.slice(i, m);
			let perimeterSum =
				perimeterPoints(s1, tempUMBR) + perimeterPoints(s2, tempUxMBR);
			if (perimeterSum < minPerimeter) {
				minPerimeter = perimeterSum;
				tempU = [];
				s1.forEach((MBR) => {
					tempU.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUx = [];
				s2.forEach((MBR) => {
					tempUx.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				newUMBR.x = tempUMBR.x;
				newUMBR.y = tempUMBR.y;
				newUMBR.w = tempUMBR.w;
				newUMBR.h = tempUMBR.h;

				newUxMBR.x = tempUxMBR.x;
				newUxMBR.y = tempUxMBR.y;
				newUxMBR.w = tempUxMBR.w;
				newUxMBR.h = tempUxMBR.h;
			}
		}
		/* Sort with respect to y axis */
		node.MBRs.sort((a, b) => a.y - b.y);
		for (let i = ceil(this.B * 0.4); i <= m - ceil(this.B * 0.4); i++) {
			let s1 = node.MBRs.slice(0, i);
			let s2 = node.MBRs.slice(i, m);
			let perimeterSum =
				perimeterPoints(s1, tempUMBR) + perimeterPoints(s2, tempUxMBR);

			if (perimeterSum < minPerimeter) {
				minPerimeter = perimeterSum;
				tempU = [];
				s1.forEach((MBR) => {
					tempU.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUx = [];
				s2.forEach((MBR) => {
					tempUx.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				newUMBR.x = tempUMBR.x;
				newUMBR.y = tempUMBR.y;
				newUMBR.w = tempUMBR.w;
				newUMBR.h = tempUMBR.h;

				newUxMBR.x = tempUxMBR.x;
				newUxMBR.y = tempUxMBR.y;
				newUxMBR.w = tempUxMBR.w;
				newUxMBR.h = tempUxMBR.h;
			}
		}
		/* Copying by value because won't work doing it by reference */
		tempU.forEach((MBR) => {
			u.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
		});
		tempUx.forEach((MBR) => {
			ux.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
		});
	}

    /* funciona, pero falta mejorar el metodo para sincronizar el indice del mbr con su respectivo hijo */
	split_internal(node, u, ux, newUMBR, newUxMBR, newUChilds, newUxChilds) {
		let m = node.MBRs.length;
		let minPerimeter = Infinity;
		let tempUMBR = new Rectangle(0, 0, 0, 0);
		let tempUxMBR = new Rectangle(0, 0, 0, 0);
		let tempU = [];
		let tempUx = [];
		let tempUChilds = [];
		let tempUxChilds = [];
        /* Sort with respect to left boundary */
        /* los childs de node también tienen que ordenarse para mantener la sincronizacion de indices entre los mbr y los hijos */
        /* fixeo temporal */
        node.childs.forEach((child, index) => {
            child.sortFactor = node.MBRs[index].x - node.MBRs[index].w;
        })
        node.childs.sort((a,b) => a.sortFactor - b.sortFactor);
        /* fin del fixeo temporal */
        node.MBRs.sort((a, b) => a.x - a.w - (b.x - b.w));
        let tempAr = [];
        /* unir los MBR y los child en una sola clase para arreglarlo */

		for (let i = ceil(this.B * 0.4); i <= m - ceil(this.B * 0.4); i++) {
			let s1 = node.MBRs.slice(0, i);
			let s2 = node.MBRs.slice(i, m);
			let perimeterSum =
				perimeterMBRs(s1, tempUMBR) + perimeterMBRs(s2, tempUxMBR);
			if (perimeterSum < minPerimeter) {
				minPerimeter = perimeterSum;
				tempU = [];
				s1.forEach((MBR) => {
					tempU.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUx = [];
				s2.forEach((MBR) => {
					tempUx.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUChilds = node.childs.slice(0, i);
				tempUxChilds = node.childs.slice(i, m);

				newUMBR.x = tempUMBR.x;
				newUMBR.y = tempUMBR.y;
				newUMBR.w = tempUMBR.w;
				newUMBR.h = tempUMBR.h;

				newUxMBR.x = tempUxMBR.x;
				newUxMBR.y = tempUxMBR.y;
				newUxMBR.w = tempUxMBR.w;
				newUxMBR.h = tempUxMBR.h;
			}
		}
        /* Sort with respect to right boundary */
        node.childs.forEach((child, index) => {
            child.sortFactor = node.MBRs[index].x + node.MBRs[index].w;
        })
        node.childs.sort((a,b) => a.sortFactor - b.sortFactor);
		node.MBRs.sort((a, b) => a.x + a.w - (b.x + b.w));
		for (let i = ceil(this.B * 0.4); i <= m - ceil(this.B * 0.4); i++) {
			let s1 = node.MBRs.slice(0, i);
			let s2 = node.MBRs.slice(i, m);
			let perimeterSum =
				perimeterMBRs(s1, tempUMBR) + perimeterMBRs(s2, tempUxMBR);
			if (perimeterSum < minPerimeter) {
				minPerimeter = perimeterSum;
				tempU = [];
				s1.forEach((MBR) => {
					tempU.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUx = [];
				s2.forEach((MBR) => {
					tempUx.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUChilds = node.childs.slice(0, i);
				tempUxChilds = node.childs.slice(i, m);

				newUMBR.x = tempUMBR.x;
				newUMBR.y = tempUMBR.y;
				newUMBR.w = tempUMBR.w;
				newUMBR.h = tempUMBR.h;

				newUxMBR.x = tempUxMBR.x;
				newUxMBR.y = tempUxMBR.y;
				newUxMBR.w = tempUxMBR.w;
				newUxMBR.h = tempUxMBR.h;
			}
		}
        /* Sort with respect to lower boundary */
        node.childs.forEach((child, index) => {
            child.sortFactor = node.MBRs[index].y - node.MBRs[index].h;
        })
        node.childs.sort((a,b) => a.sortFactor - b.sortFactor);
		node.MBRs.sort((a, b) => a.y - a.h - (b.y - b.h));
		for (let i = ceil(this.B * 0.4); i <= m - ceil(this.B * 0.4); i++) {
			let s1 = node.MBRs.slice(0, i);
			let s2 = node.MBRs.slice(i, m);
			let perimeterSum =
				perimeterMBRs(s1, tempUMBR) + perimeterMBRs(s2, tempUxMBR);
			if (perimeterSum < minPerimeter) {
				minPerimeter = perimeterSum;
				tempU = [];
				s1.forEach((MBR) => {
					tempU.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUx = [];
				s2.forEach((MBR) => {
					tempUx.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUChilds = node.childs.slice(0, i);
				tempUxChilds = node.childs.slice(i, m);

				newUMBR.x = tempUMBR.x;
				newUMBR.y = tempUMBR.y;
				newUMBR.w = tempUMBR.w;
				newUMBR.h = tempUMBR.h;

				newUxMBR.x = tempUxMBR.x;
				newUxMBR.y = tempUxMBR.y;
				newUxMBR.w = tempUxMBR.w;
				newUxMBR.h = tempUxMBR.h;
			}
		}
        /* Sort with respect to upper boundary */
        node.childs.forEach((child, index) => {
            child.sortFactor = node.MBRs[index].y + node.MBRs[index].h;
        })
        node.childs.sort((a,b) => a.sortFactor - b.sortFactor);
		node.MBRs.sort((a, b) => a.y + a.h - (b.y + b.h));
		for (let i = ceil(this.B * 0.4); i <= m - ceil(this.B * 0.4); i++) {
			let s1 = node.MBRs.slice(0, i);
			let s2 = node.MBRs.slice(i, m);
			let perimeterSum =
				perimeterMBRs(s1, tempUMBR) + perimeterMBRs(s2, tempUxMBR);
			if (perimeterSum < minPerimeter) {
				minPerimeter = perimeterSum;
				tempU = [];
				s1.forEach((MBR) => {
					tempU.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUx = [];
				s2.forEach((MBR) => {
					tempUx.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
				});
				tempUChilds = node.childs.slice(0, i);
				tempUxChilds = node.childs.slice(i, m);

				newUMBR.x = tempUMBR.x;
				newUMBR.y = tempUMBR.y;
				newUMBR.w = tempUMBR.w;
				newUMBR.h = tempUMBR.h;

				newUxMBR.x = tempUxMBR.x;
				newUxMBR.y = tempUxMBR.y;
				newUxMBR.w = tempUxMBR.w;
				newUxMBR.h = tempUxMBR.h;
			}
		}
		/* Copying by value because won't work doing it by reference */
		tempU.forEach((MBR) => {
			u.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
		});
		tempUx.forEach((MBR) => {
			ux.push(new Rectangle(MBR.x, MBR.y, MBR.w, MBR.h));
        });
        /* tal vez el tempuchilds = node.childs.slice(0,1) esta mal */
		tempUChilds.forEach((child) => {
			newUChilds.push(child);
		});
		tempUxChilds.forEach((child) => {
			newUxChilds.push(child);
		});
	}

	split_node(node, u, ux, newUMBR, newUxMBR, newUChilds, newUxChilds) {
		if (node.isLeaf) {
			this.split_leaf(node, u, ux, newUMBR, newUxMBR);
		} else {
			this.split_internal(
				node,
				u,
				ux,
				newUMBR,
				newUxMBR,
				newUChilds,
				newUxChilds
			);
		}
	}

	handle_overflow(node) {
		var u = new Array();
		var ux = new Array();
		/* childs array only for splitting internal node */
		var newUChilds = new Array();
		var newUxChilds = new Array();
		var newUMBR = new Rectangle(0, 0, 0, 0);
		var newUxMBR = new Rectangle(0, 0, 0, 0);
		this.split_node(
			node,
			u,
			ux,
			newUMBR,
			newUxMBR,
			newUChilds,
			newUxChilds
		);
		if (node === this.root) {
			var newRoot = new Node(false, null, -1);
			newRoot.MBRs.push(newUMBR);
			newRoot.MBRs.push(newUxMBR);
			newRoot.childs.push(new Node(node.isLeaf, newRoot, 0));
			newRoot.childs.push(new Node(node.isLeaf, newRoot, 1));
			newRoot.childs[0].MBRs = u;
            newRoot.childs[1].MBRs = ux;
            
			newRoot.childs[0].childs = newUChilds;
            newRoot.childs[0].childs.forEach((child, index) => {
                child.parent = newRoot.childs[0];
                child.childIdx = index;
            });
            newRoot.childs[1].childs = newUxChilds;
            newRoot.childs[1].childs.forEach((child, index) => {
                child.parent = newRoot.childs[1];
                child.childIdx = index;
            });
            this.root = newRoot;
		} else {
			var w = node.parent;
			w.MBRs[node.childIdx] = newUMBR;
			w.childs[node.childIdx] = new Node(node.isLeaf, w, node.childIdx);
			w.childs[node.childIdx].MBRs = u;
            w.childs[node.childIdx].childs = newUChilds;
            w.childs[node.childIdx].childs.forEach((child, index) => {
                child.parent = w.childs[node.childIdx];
                child.childIdx = index;
            })


			w.MBRs.push(newUxMBR);
			w.childs.push(new Node(node.isLeaf, w, w.childs.length));
			w.childs[w.childs.length - 1].MBRs = ux;
            w.childs[w.childs.length - 1].childs = newUxChilds;
            w.childs[w.childs.length - 1].childs.forEach((child, index) => {
                child.parent = w.childs[w.childs.length - 1];
                child.childIdx = index;
            })
			if (w.MBRs.length > this.B) {
				this.handle_overflow(w);
            }
		}
	}

	insert(node, point) {
		if (node.isLeaf) {
			var newPoint = new Rectangle(point.x, point.y, 0, 0);
			node.MBRs.push(newPoint);
			this.size++;
			if (node.MBRs.length > this.B) {
				this.handle_overflow(node);
			}
		} else {
			var v = this.choose_subtree(node, point);
			this.insert(node.childs[v], point);
		}
	}

	insertPoint(point) {
		this.insert(this.root, point);
	}

	traverse(root) {
		var i;
		var red = Math.floor(Math.random() * 256);
		var green = Math.floor(Math.random() * 256);
		var blue = Math.floor(Math.random() * 256);
		for (i = 0; i < root.MBRs.length; i++) {
			if (root.isLeaf === false) {
				stroke(red, green, blue);
				strokeWeight(1);
				noFill();
				rectMode(CENTER);
				rect(
					root.MBRs[i].x,
					400 - root.MBRs[i].y,
					2 * root.MBRs[i].w,
					2 * root.MBRs[i].h
				);
				this.traverse(root.childs[i]);
			}
		}
	}
}
