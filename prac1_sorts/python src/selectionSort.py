from timer import Timer

def selection_sort(array, n):  
    for i in range(n-1):
        primer = i
        for j in range(i+1,n):
            if array[primer] > array[j]:
                primer = j

        array[primer], array[i] = array[i], array[primer]


if __name__ == "__main__":
       
    index = 0
    numArrays = int(input())
    for i in range(numArrays):
        promedio = 0
        arr = []    
        n = int(input())
        for j in range(5):
            aux = input().split(" ")
            for k in range(n):
                arr.append(int(aux[k]))

            t=Timer(n)   
            t.start()
            selection_sort(arr, n)
            t.stop()
            promedio += t.printTime()
        print(n,round(promedio/10,3))
