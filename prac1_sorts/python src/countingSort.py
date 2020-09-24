from timer import Timer
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
    arr = newA

if __name__ == "__main__":
   
    index = 0
    numArrays = int(input())
    for i in range(numArrays):
        promedio = 0
        arr = []    
        n = int(input())
        for j in range(10):
            aux = input().split(" ")
            for k in range(n):
                arr.append(int(aux[k]))

            t=Timer(n)   
            t.start()
            counting_sort(arr,n)
            t.stop()
            promedio += t.printTime()
        print(n,round(promedio/10,3))
        
       
