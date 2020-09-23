from timeit import default_timer

filer = open('arrays.txt', "r")
filew = open("heapSortTime.txt","w")
#lectura de lineas
lines = []
for line in filer:
    lines.append(line)
filer.close()

def heapify(arr, n, i):
    largo = i
    l = (2*i)+1
    r = (2*i)+2
    if l < n and arr[l] > arr[largo]:
        largo = l
    if r < n and arr[r] > arr[largo]:
        largo = r
    if largo != i:
        arr[i], arr[largo] = arr[largo], arr[i]
        heapify(arr, n, largo)


def heapsort(arr, n):
    for i in range(n//2+1, -1, -1):
        heapify(arr, n, i)
    for j in range(n-1, 0, -1):
        arr[0], arr[j] = arr[j], arr[0]
        heapify(arr, j, 0)


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
        heapsort(arr, n)
        fin = default_timer()
        ''' for i in range(n):
            print(arr[i], end=" ")
        print() '''
        filew.writelines([str(n)," ",str(round(((fin-inicio)*1000),3)),"\n"])    
    filew.close()




