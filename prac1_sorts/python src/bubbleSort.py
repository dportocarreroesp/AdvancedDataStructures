from timer import Timer

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
            bubble_sort(arr,n)
            t.stop()
            promedio += t.printTime()
        print(n,round(promedio/10,3))