array_split = [];
mbr = null;
k = 2;
class Point {
    constructor (x, y){
        this.x = x;
        this.y = y;
        //this.userData = userData;
    }
}

class Rectangle{
    constructor (x, y, w, h){
        this.x = x; // center x
        this.y = y; // center y
        this.w = w; // half width
        this.h = h; // half height
    }
}

class NodoRTree{
    constructor(Bi,leaf){
        this.Bi = Bi;
        this.minimun = round(0.4 * Bi);
        this.points = [];
        this.nro_data = 0;
        this.subtree = [];
        this.leaf = leaf;
    }
}

class Rtree{
    constructor(Bi){
        this.Bi = Bi;
        //this.root = null;
    }
    splitNode(NodeTree,i,first,last){
        if(i == 0){
            console.log("Respecto a X");
            console.log(NodeTree.points[0]);
            var max_x = NodeTree.points[last-1].x;//para 3 posibles casos
            var min_x = NodeTree.points[first].x;
            var middle_x = (max_x+min_x)/2;

            var max_y = 0; 
            var min_y = 401;
       
            for(var j = first; j < last ;j++){
                if(NodeTree.points[j].y >= max_y){
                    max_y = NodeTree.points[j].y;
                }
                if(NodeTree.points[j].y <= min_y){
                    min_y = NodeTree.points[j].y;
                }
            }
            var middle_y = (max_y+min_y)/2;
            
            mbr = null;
            mbr = new Rectangle(middle_x,400-middle_y,middle_x-min_x,middle_y-min_y);
            

            array_split = [];
            for(var h = first ; h < last ; h++){            
                array_split.push(NodeTree.points[h]);
            }

            var perimeter = (max_x-min_x)*2 + (max_y-min_y)*2;
            return perimeter;
         }else{
            console.log("Respecto a Y");
            console.log(NodeTree.points[0]);
            var max_y = NodeTree.points[last-1].y;//para 3 posibles casos
            var min_y = NodeTree.points[first].y;
            var middle_y = (max_y+min_y)/2;

            var max_x = 0; 
            var min_x = 401;
        //aca encontrar el menor y mayor en y 
            for(var j = first; j < last ;j++){
                if(NodeTree.points[j].x >= max_x){
                    max_x = NodeTree.points[j].x;
                }
                if(NodeTree.points[j].x <= min_x){
                    min_x = NodeTree.points[j].x;
                }
            }
            var middle_x = (max_x+min_x)/2;
            
            mbr = null;
            mbr = new Rectangle(middle_x,400-middle_y,middle_x-min_x,middle_y-min_y);
            

            array_split = [];
            for(var h = first ; h < last ; h++){            
                array_split.push(NodeTree.points[h]);
            }

            var perimeter = (max_x-min_x)*2 + (max_y-min_y)*2;
            return perimeter;
        }
    }

    split(NodeTree){
        var m = NodeTree.nro_data;
        let i = 0;

        NodeTree.points.sort((a, b) => a.x - b.x);
        console.log(NodeTree.points);
        console.log(NodeTree.points[0]);
        console.log(NodeTree.minimun);
        console.log(m - NodeTree.minimun);

        var sum_peri = 1600*2;
        var mbr1 = null;
        var mbr2 = null;
        var v_l;
        var v_d;
        while (i<k) {
            
            for(var j = NodeTree.minimun ; j < m-NodeTree.minimun; j++){//4 split posibles
                var left_peri = this.splitNode(NodeTree,i,0,j);
                var left_array = array_split;
                var left_s = mbr;
                console.log(left_array);
    
                var right_peri = this.splitNode(NodeTree,i,j,m);
                var right_array = array_split;
                var right_s = mbr;
                console.log(right_array);
    
                console.log("perimetro");
                console.log(left_peri);
                console.log(right_peri);
                console.log(left_peri+right_peri);
                if((left_peri+right_peri) <= sum_peri){
                    sum_peri = left_peri+right_peri;
                    v_l = left_array;
                    v_d = right_array;
                    mbr1 = left_s;
                    mbr2 = right_s;
                }
            }
            
            console.log("minimun MBR " + sum_peri);
            console.log("split_left " , v_l);
            console.log("split_right ", v_d);

            NodeTree.points.sort((a, b) => a.y - b.y);
            i++;    
        }
        

        stroke(0 ,255 ,0);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(mbr1.x,mbr1.y,mbr1.w*2,mbr1.h*2);
        rect(mbr2.x,mbr2.y,mbr2.w*2,mbr2.h*2);

        
        //NodeTree.points.sort((a, b) => a.y - b.y);
        //console.log(NodeTree.points[0]);
        //console.log(NodeTree.points[1]);
    }
    
    handle_overflow(NodeTree){
        this.split(NodeTree);
    }
    choose_subtree(nodetree,point){

    }
    insert(root,point){
        if(root === null){
            root = new NodoRTree(this.Bi,true);
            //console.log("hi test");
        }
        if(root.leaf){
            root.points.push(point);
            root.nro_data++;
            if(root.nro_data > root.Bi){//u has B+1 points
                //Node = new NodoRTree(this.Bi,false);
                //Node.subtree[0] = this.root;
                //Node.handle_overflow(this.root);    
                console.log(root.points[0]);
                console.log(root.nro_data);
                //console.log(root.points.length);
                this.handle_overflow(root);
                console.log("ver el root points")
                console.log(root.points[0]);
            }   
        }else{
            //NodeTree = this.choose_subtree(this.root,point);
            //choose_subtree(this.root,point);
            //insert(point,NodeTree);
        }
        return root;
    }
}