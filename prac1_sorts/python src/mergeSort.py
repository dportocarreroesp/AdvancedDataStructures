from timeit import default_timer

filer = open('arrays.txt', "r")
filew = open("mergeSortTime.txt","w")
#lectura de lineas
lines = []
for line in filer:
    lines.append(line)
filer.close()


def merge_sort(values): 
  
    if len(values)>1: 
        m = len(values)//2
        left = values[:m] 
        right = values[m:] 
        left = merge_sort(left) 
        right = merge_sort(right) 
  
        values =[] 
  
        while len(left)>0 and len(right)>0: 
            if left[0]<right[0]: 
                values.append(left[0]) 
                left.pop(0) 
            else: 
                values.append(right[0]) 
                right.pop(0) 
  
        for i in left: 
            values.append(i) 
        for i in right: 
            values.append(i) 
                  
    return values 
  
 
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
        array = merge_sort(arr)
        fin = default_timer()
        ''' for i in range(n):
            print(array[i], end=" ")
        print() '''
        filew.writelines([str(n)," ",str(round(((fin-inicio)*1000),3)),"\n"])    
    filew.close()
