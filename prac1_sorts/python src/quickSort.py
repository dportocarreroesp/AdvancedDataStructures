from timer import Timer

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if(arr[j] < pivot):
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i+1

def quick_sort(arr, low, high):
    if( low < high):
        pi = partition(arr, low, high)

        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def printArray(arr, n):
    for i in range(n):
        print(arr[i], end=" ")
    print()

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
            quick_sort(arr,0,n-1)
            t.stop()
            promedio += t.printTime()
        print(n,round(promedio/10,3))