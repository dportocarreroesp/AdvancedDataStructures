from timer import Timer

def insertionSort(arr): 
    for i in range(1, len(arr)): 
  
        key = arr[i] 
  
        j = i-1
        while j >= 0 and key < arr[j] : 
                arr[j + 1] = arr[j] 
                j -= 1
        arr[j + 1] = key 

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

            if n > 50000:
                t=Timer(n)   
                t.start()
                insertionSort(arr)
                t.stop()
                promedio += t.printTime()
        if n > 50000:
            print(n,round(promedio/10,3))