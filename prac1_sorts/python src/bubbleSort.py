from timeit import default_timer

filer = open('arrays.txt', "r")
filew = open("bubbleSortTime.txt","w")
#lectura de lineas
lines = []
for line in filer:
    lines.append(line)
filer.close()


def bubble_sort(arr, n):
    for i in range(n-1):
        for j in range(n-i-1):
            if(arr[j] > arr[j+1]):
                arr[j], arr[j+1] = arr[j+1], arr[j]

def printArray(arr, n):
    for i in range(n):
        print(arr[i], end=" ")
    print()


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
        bubble_sort(arr,n)
        fin = default_timer()
        #printArray(arr,n)
        filew.writelines([str(n)," ",str(round(((fin-inicio)*1000),3)),"\n"])    
    filew.close()
