from timer import Timer

filer = open('arrays.txt', "r")
filew = open("countingSortTime.txt","w")
#lectura de lineas
lines = []
for line in filer:
    lines.append(line)
filer.close()
#arreglo ordenado
array = []
max = 1000

def counting_sort(arr,n):
    count = [0 for i in range(max+1)]

    for i in range(n):
        count[arr[i]] += 1
 
    for i in range(max):
        count[i+1] = count[i] + count[i+1]

    for i in range(max,0,-1):
        count[i] = count[i-1]
    count[0] = 0
    
    newA = [0 for i in range(n)]

    for i in range(n):
        newA[count[arr[i]]] = arr[i]
        count[arr[i]] += 1
    array = newA


if __name__ == "__main__":
    t=Timer()
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
            
        t.start()
        counting_sort(arr,n)
        addtimer = t.stop()
        filew.writelines([str(n)," ",str(round(addtimer,5)),"\n"])  
    filew.close()