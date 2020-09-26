from timer import Timer

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
            heapsort(arr, n)
            t.stop()
            promedio += t.printTime()
        print(n,round(promedio/10,3))
        
       


