from timeit import default_timer

filer = open('arrays.txt', "r")
filew = open("insertionSortTime.txt","w")
#lectura de lineas
lines = []
for line in filer:
    lines.append(line)
filer.close()


def insertionSort(arr): 

    for i in range(1, len(arr)): 
  
        key = arr[i] 
  
        j = i-1
        while j >= 0 and key < arr[j] : 
                arr[j + 1] = arr[j] 
                j -= 1
        arr[j + 1] = key 
  
if __name__ == "__main__":
    index = 0
    numArrays = int(lines[index])
    for i in range(numArrays):
        arr = []
        index +=1
        n = int(lines[index])
        index +=1
        aux = lines[index].split(" ")
        for j in range(n):
            arr.append(int(aux[j]))
            
        inicio = default_timer()
        insertionSort(arr)
        fin = default_timer()
        ''' for i in range(n):
            print(arr[i], end=" ")
        print() '''
        filew.writelines([str(n)," ",str(round(((fin-inicio)*1000),3)),"\n"])    
    filew.close()