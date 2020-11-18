import math

k = 2;

class BPQ:
    def __init__(self,size):
        self.size = size;
        self.queue = []

    def insert(self,val, priority):
        queue = []
        queue.append(val);
        queue.append(priority);

        if(len(self.queue) < self.size):
            self.queue.append(queue);
        else:
            if (self.queue[len(self.queue) - 1][1] >  priority):
                self.queue[len(self.queue)  - 1] = queue;

        self.queue.sort(key=lambda x:x[1]);

class Node:
    def __init__(self):
        self.point = None;
        self.axis = None;
        self.left = None;
        self.right = None;

def getHeight(node):
	if(not node):
		return -1
	else:
		return 1 + max(getHeight(node.left), getHeight(node.right));

def recursive_generate_dot(node):
	txt = "";
	if(node):
		if(node.left):
			txt = txt + '\t"';
			txt = txt + "[" + ",".join(str(x) for x in node.point) + "]";
			txt = txt + '" -> "';
			txt = txt + "[" + ",".join(str(x) for x in node.left.point) + "]";
			txt = txt + '";\n';
			txt = txt + recursive_generate_dot(node.left);

		if (node.right):
			txt = txt + '\t"';
			txt = txt + "[" + ",".join(str(x) for x in node.point) + "]";
			txt = txt + '" -> "';
			txt = txt + "[" + ",".join(str(x) for x in node.right.point) + "]";
			txt = txt + '";\n';
			txt = txt + recursive_generate_dot(node.right);

	return txt;

def generate_dot(node):
	string = "digraph G {\n";
	string = string + recursive_generate_dot(node);
	string = string + "}\n";
	return string;

def build_kdtree(points, depth = 0):
    if not points:
        return;
    n = len(points);
    m = len(points[0]);
    axis = depth % m;

    points.sort(key=lambda x:x[axis]);

    median = len(points)//2;
    #print(median);

    node = Node();
    node.point = points[median];
    node.axis = axis;
    node.left = build_kdtree(points[0:median], depth+1);
    node.right = build_kdtree(points[median+1:], depth+1);
    return node;

def distanceSquared(point1, point2):
    distance = 0;
    for i in range(k):
        distance += pow(point1[i] - point2[i], 2);
    return math.sqrt(distance);

def closest_point_brute_force(points,point):
    if(len(points) < 1):
        return None;
    if(len(points) == 1):
        return points[0];

    min = distanceSquared(point, points[0]);
    minPoint = points[0];

    for i in range(1,len(points)):
        distance = distanceSquared(point, points[i]);
        if(distance < min):
            min = distance;
            minPoint = points[i];

    return minPoint

def naive_closest_point(node, point, depth = 0, best = None):
    if (not node):
        return best;
    if (depth == 0):
        best = node.point;
    else:
        if (distanceSquared(node.point, point) < distanceSquared(best, point)):
            best = node.point;

    axis = depth % len(node.point);

    if (point[axis] < node.point[axis]):
        return naive_closest_point(node.left, point, depth + 1, best);
    else:
        return naive_closest_point(node.right, point, depth + 1, best);

def closest_point(node, point, depth = 0, best = None):
    if (not node):
        return best;
    if (depth == 0):
        best = node.point;
    else:
        if (distanceSquared(node.point, point) < distanceSquared(best, point)):
            best = node.point;
    axis = depth % len(node.point);


    if (point[axis] < node.point[axis]):
        best = closest_point(node.left, point, depth + 1, best);
        if (abs(point[axis] - node.point[axis]) < distanceSquared(point, best)):
            best = closest_point(node.right, point, depth + 1, best);
    else:
        best = closest_point(node.right, point, depth + 1, best);
        if( abs(point[axis] - node.point[axis]) < distanceSquared(point, best)):
            best = closest_point(node.left, point, depth + 1, best);

    return best;

def knn(node, query_point, depth = 0):

    nodes_visited += 1;
    if (not node):
        return;

    bpq.insert(node.point, distanceSquared(node.point, query_point)); # insertamos el nodo visitado a l a pila

    axis = depth % k;
    next_branch = None;
    opposite_branch = None;

    if (query_point[axis] < node.point[axis]):
        next_branch = node.left;
        opposite_branch = node.right;
    else:
        next_branch = node.right;
        opposite_branch = node.left;

    knn(next_branch, query_point, depth + 1);

    if ((len(bpq.queue) < bpq.size) or (abs(query_point[axis] - node.point[axis]) < bpq.queue[len(bpq.queue) - 1][1])):
        knn(opposite_branch, query_point, depth + 1);

data = [
		[40, 70],
		[70, 130],
		[90 ,40],
		[110, 100],
		[140, 110],
		[160, 100]
        #[150, 30],
	];
point = [140, 90];
#print(data);
root = build_kdtree(data);
aux = root;
print(generate_dot(root));
print("Queried point: ", point);

print("Brute force: " , closest_point_brute_force(data, point));
print("Naive closest point: " , naive_closest_point(root, point));
print("Closest point: " , closest_point(root, point));

bpq = BPQ(3);
queue = [];
nodes_visited = 0;
knn(root, point);
print("k_nearest_neighbor: ",bpq.queue);
