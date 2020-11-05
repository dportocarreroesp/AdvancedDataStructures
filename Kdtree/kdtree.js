
k = 2;
class Node {
    constructor(point,axis){
        this.point = point;
        this.left = null;
        this.right = null;
        this.axis = axis;
    }
}
function getHeight(node){
    if (!node)
        return;
    console.log(node.point);
    getHeight(node.left);
    getHeight(node.right);
}
function generate_dot (node){}
function build_kdtree(points,depth = 0){
    if(points.length == 0){
        return null;
    }
    n   = points.length;
    m   = points[0].length;
    eje = depth % m;

    //console.log(eje);
    

    points.sort((a,b)=>a[eje] - b[eje]);
    median = Math.floor(points.length/2);
    
    let izq = [];
    let der = [];
    for(let i = 0 ; i < median; i++)
        izq.push(points[i]);
    for(let i = median+1 ; i < n; i++)
        der.push(points[i]);

    
    let node = new Node(points[median],eje);
    //console.log("nodo",node.point);
    //console.log(izq);
    //console.log(der);

    node.left = build_kdtree(izq,depth++); 
    node.right = build_kdtree(der,depth++); 

    return node;

}
const arr = [[10, 4], [40, 32], [67, 12], [43, 31], [65, 1]];
arr.sort((a,b)=>a[0] - b[0]);
let root = build_kdtree(arr);
getHeight(root);