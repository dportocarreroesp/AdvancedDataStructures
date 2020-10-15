import vtk
import random
import Tkinter as Tk


colors = vtk.vtkNamedColors()

#asignar actor al renderizado

renderer = vtk.vtkRenderer()
renderWindow = vtk.vtkRenderWindow()
renderWindow.SetWindowName("Quadtree")
renderWindow.AddRenderer(renderer)

renderWindowInteractor = vtk.vtkRenderWindowInteractor()
renderWindowInteractor.SetRenderWindow(renderWindow)



class Point:
    def __init__(self, x, y,z):
        self.x = x
        self.y = y
        self.z = z

class Cube:
    def __init__(self, x, y,z,w,h,d):
        self.x = x
        self.y = y
        self.z = z
        self.w = w
        self.h = h
        self.d = d
    def contains(self,point):
        if(point.x >= self.x - self.w and point.x <= self.x + self.w and
        point.y >= self.y - self.h and point.y <= self.y + self.h and
        point.z >= self.z - self.d and point.z <= self.z + self.d):
            return True
        return False

    def intersects(self,range):
        if(range.x - range.w > self.x + self.w or range.x + range.w < self.x - self.w or
        range.y - range.h > self.y + self.h or range.y + range.h < self.y - self.h or
        range.z - range.d > self.z + self.d or range.z + range.d < self.z - self.d):
            return False;
        return True;

class Octree:
    def __init__(self,volumen,n):
        self.volumen = volumen
        self.capacity = n
        self.points = []
        self.divided = False

    def subdivide(self):
        x = self.volumen.x
        y = self.volumen.y
        z = self.volumen.z
        w = self.volumen.w
        h = self.volumen.h
        d = self.volumen.d

        nefront = Cube(x+w/2,y+h/2,z+d/2,w/2,h/2,d/2)
        self.northeastfront = Octree(nefront,self.capacity)

        nwfront = Cube(x-w/2,y+h/2,z+d/2,w/2,h/2,d/2)
        self.northwestfront = Octree(nwfront,self.capacity)

        sefront = Cube(x+w/2,y-h/2,z+d/2,w/2,h/2,d/2)
        self.southeastfront = Octree(sefront,self.capacity)

        swfront = Cube(x-w/2,y-h/2,z+d/2,w/2,h/2,d/2)
        self.southwestfront = Octree(swfront,self.capacity)

        neback = Cube(x+w/2,y+h/2,z-d/2,w/2,h/2,d/2)
        self.northeastback = Octree(neback,self.capacity)

        nwback = Cube(x-w/2,y+h/2,z-d/2,w/2,h/2,d/2)
        self.northwestback = Octree(nwback,self.capacity)

        seback = Cube(x+w/2,y-h/2,z-d/2,w/2,h/2,d/2)
        self.southeastback = Octree(seback,self.capacity)

        swback = Cube(x-w/2,y-h/2,z-d/2,w/2,h/2,d/2)
        self.southwestback = Octree(swback,self.capacity)

        self.divided = True

    def query(self,rango,found):
        if(not found):
            found = []
        if(not rango.intersects(self.volumen)):
            return found
        for i in range(len(self.points)):
            if(rango.contains(i)):
                found.append(i)
        if(self.divided):
            self.northeastfront.query(rango, found)
            self.northwestfront.query(rango, found)
            self.southeastfront.query(rango, found)
            self.southwestfront.query(rango, found)
            self.northeastback.query(rango, found)
            self.northwestback.query(rango, found)
            self.southeastback.query(rango, found)
            self.southwestback.query(rango, found)
        return found
        

    def insert(self,point):
        if(not self.volumen.contains(point)):
            return
        if(len(self.points) < self.capacity):
            spx = point.x
            spy = point.y
            spz = point.z
            aux = []
            for i in range(3):
                if( i == 0):
                    aux.append(spx)
                elif(i==1):
                    aux.append(spy)
                elif(i==2):
                    aux.append(spz)
            print(aux)
            self.points.append(aux)

        else:
            if( not self.divided):
                self.subdivide()
            self.northeastfront.insert(point)
            self.northwestfront.insert(point)
            self.northeastback.insert(point)
            self.northwestback.insert(point)
            self.southeastfront.insert(point)
            self.southwestfront.insert(point)
            self.southeastback.insert(point)
            self.southwestback.insert(point)

    def show(self):
        cube = vtk.vtkCubeSource()
        cube.SetCenter(self.volumen.x,self.volumen.y,self.volumen.z)
        #cube.SetBounds(double xMin, double xMax, double yMin, double yMax, double zMin, double zMax)
        cube.SetXLength(self.volumen.w*2)
        cube.SetYLength(self.volumen.h*2)
        cube.SetZLength(self.volumen.d*2)
        cube.Update()

        # Mpear
        cubeMapper = vtk.vtkPolyDataMapper()
        cubeMapper.SetInputData(cube.GetOutput())

        # Actor.
        cubeActor = vtk.vtkActor()
        cubeActor.SetMapper(cubeMapper)
        cubeActor.GetProperty().SetOpacity(.2);
        cubeActor.GetProperty().SetColor(colors.GetColor3d("Cornsilk"))#Banana

        if(self.divided):
            self.northeastfront.show()
            print("northeastfront: ",self.northeastfront.points)
            self.northwestfront.show()
            print("northwestfront: ",self.northwestfront.points)
            self.northeastback.show()
            print("northeastback: ",self.northeastback.points)
            self.northwestback.show()
            print("northwestback: ",self.northwestback.points)
            self.southeastfront.show()
            print("southeastfront: ",self.southeastfront.points)
            self.southwestfront.show()
            print("southwestfront: ",self.southwestfront.points)
            self.southeastback.show()
            print("southeastback: ",self.southeastback.points)
            self.southwestback.show()
            print("southwestback: ",self.southwestback.points)

        for i in range(len(self.points)):
            sphereSource = vtk.vtkSphereSource()

            xs = self.points[i][0]
            ys = self.points[i][1]
            zs = self.points[i][2]
            sphereSource.SetCenter(xs,ys,zs)
            sphereSource.SetRadius(10)

            # Make the surface smooth.
            sphereSource.SetPhiResolution(100)
            sphereSource.SetThetaResolution(100)

            mapper = vtk.vtkPolyDataMapper()
            mapper.SetInputConnection(sphereSource.GetOutputPort())

            actor = vtk.vtkActor()
            actor.SetMapper(mapper)

            #prueba para verificar los hijos
            if(self.divided):
                actor.GetProperty().SetColor(colors.GetColor3d("Black"))
            else:
                actor.GetProperty().SetColor(colors.GetColor3d("Red"))

            renderer.AddActor(actor)

        renderer.AddActor(cubeActor)

def setup():

    volumen = Cube(0,0,0,400,400,400)
    qt = Octree(volumen,4)
    # Create a sphere
    for i in range(100):
        xs = random.uniform(-399,399)#-400,400
        ys = random.uniform(-400,400)#-400,400
        zs = random.uniform(-400,400)#-400,400
        p = Point(xs,ys,zs)
        qt.insert(p)


    rango = Cube(event.x, event.y, 50 , 50)
    points = []
    qt.query(rango,points)
    qt.show()
    print(qt.points)
    #renderer.AddActor(cubeActor)
    renderer.SetBackground(colors.GetColor3d("DarkGreen"))
    renderWindow.SetSize(1000,1000)
    renderWindow.Render()
    renderWindowInteractor.Start()

    



setup()

#p1 = Point(0,0,0)
#p1.impri()
