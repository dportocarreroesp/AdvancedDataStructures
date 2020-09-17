#array = [5435,8606,9263 ,5398, 3231 ,6944, 3186, 1333 ,1626 ,245]

import numpy as np
A=np.loadtxt("prueba.txt",skiprows=0,dtype = "int")
array = A

def selection_sort(array):  
    for i in range(len(array)-1):
        primer = i
        for j in range(i+1, len(array)):
            if array[primer] > array[j]:
                primer = j

        array[primer], array[i] = array[i], array[primer]

selection_sort(array)
print(array)
    
    