import vtk
import random

#print(random.randint(0,9))
#print(random.uniform(20, 60)) 


def main():
    colors = vtk.vtkNamedColors()

    #asignar actor al renderizado
      
    renderer = vtk.vtkRenderer()
    renderWindow = vtk.vtkRenderWindow()
    renderWindow.SetWindowName("Quadtree")
    renderWindow.AddRenderer(renderer)
    
    renderWindowInteractor = vtk.vtkRenderWindowInteractor()
    renderWindowInteractor.SetRenderWindow(renderWindow)


    #Crear cubo    
    cube = vtk.vtkCubeSource()
    cube.SetCenter(0.0,0.0,0.0)
    #cube.SetBounds(double xMin, double xMax, double yMin, double yMax, double zMin, double zMax)
    cube.SetXLength(800.00);
    cube.SetYLength(800.00);
    cube.SetZLength(800.00);
    cube.Update()

    # Mpear
    cubeMapper = vtk.vtkPolyDataMapper()
    cubeMapper.SetInputData(cube.GetOutput())

    # Actor.
    cubeActor = vtk.vtkActor()
    cubeActor.SetMapper(cubeMapper)
    cubeActor.GetProperty().SetOpacity(.6);
    cubeActor.GetProperty().SetColor(colors.GetColor3d("Banana"))

    
    #x=y=z=0
    # Create a sphere
    for i in range(100):
        
        sphereSource = vtk.vtkSphereSource()
        sphereSource.SetCenter(random.uniform(0,250),random.uniform(0, 250),random.uniform(0, 250))
        sphereSource.SetRadius(10)
        # Make the surface smooth.
        sphereSource.SetPhiResolution(100)
        sphereSource.SetThetaResolution(100)

        mapper = vtk.vtkPolyDataMapper()
        mapper.SetInputConnection(sphereSource.GetOutputPort())

        actor = vtk.vtkActor()
        actor.SetMapper(mapper)
        actor.GetProperty().SetColor(colors.GetColor3d("Red"))
        

        renderer.AddActor(actor)
        #x+=10
        #y+=20
        #z+=50

    renderer.AddActor(cubeActor)
    renderer.ResetCamera()
    renderer.GetActiveCamera().Azimuth(30)
    renderer.GetActiveCamera().Elevation(30)
    renderer.ResetCameraClippingRange()


    renderer.SetBackground(colors.GetColor3d("DarkGreen"))
    renderWindow.SetSize(1000,1000)
    renderWindow.Render()
    renderWindowInteractor.Start()


if __name__ == '__main__':
    main()