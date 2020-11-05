
k = 2;
class Node {
    constructor(point,axis){
        this.point = point;
        this.left = null;
        this.right = null;
        this.axis = axis;
    }
}

function preorden(node){
    if (!node)
        return;
    console.log(node.point);
    preorden(node.left);
    preorden(node.right);
}
function getHeight(node){
}
function generate_dot(node){
    
    let txt = "";
    if(node)
    {
        if(node.left)
        {      
            txt = txt + "\t";
            txt = txt + node.point;
            txt = txt + " -> ";
            txt = txt + node.left.point;
            txt = txt +";\n";
            txt = txt + generate_dot(node.left);
        }
        if(node.right)
        {
            txt = txt + "\t";
            txt = txt + node.point;
            txt = txt + " -> ";
            txt = txt + node.right.point;
            txt = txt +";\n";
            txt = txt + generate_dot(node.right);

        }
    }
    return txt;
}

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
//const arr = [[10, 4], [40, 32], [67, 12], [43, 31], [65, 1]];
//let root = build_kdtree(arr);
//getHeight(root);
//preorden(root);
//string = "digraph G {\n";
//string = string + generate_dot(root);
//string = string + "}\n";
//console.log(string);