from timeit import default_timer

filer = open('arrays.txt', "r")
filew = open("selectionSortTime.txt","w")
#lectura de lineas
lines = []
for line in filer:
    lines.append(line)
filer.close()

def selection_sort(array):  
    for i in range(len(array)-1):
        primer = i
        for j in range(i+1, len(array)):
            if array[primer] > array[j]:
                primer = j

        array[primer], array[i] = array[i], array[primer]

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
        selection_sort(arr)
        fin = default_timer()
        #print(arr)
        filew.writelines([str(n)," ",str(round(((fin-inicio)*1000),3)),"\n"])    
    filew.close()    
    
    