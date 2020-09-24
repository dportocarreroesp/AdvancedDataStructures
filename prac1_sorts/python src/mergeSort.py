from timer import Timer

def merge(arr, l, m, r):
    n1 = m - l + 1
    n2 = r - m

    L = []
    R = []

    for i in range (0,n1):
        L.append(arr[l+i])
    for i in range (0,n2):
        R.append(arr[m+1+i])
    i = 0
    j = 0
    k = l

    while (i < n1 and j < n2):
        if (L[i] <= R[j]):
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    while (i < n1):
        arr[k] = L[i]
        i += 1
        k += 1
    while (j < n2):
        arr[k] = R[j]
        j += 1
        k += 1



def merge_sort(arr, l, r):
    if (l < r):
        m = int(l + (r - l)/2)

        merge_sort(arr, l, m)
        merge_sort(arr, m+1, r)

        merge(arr, l, m, r)

""" arr = [1, -3, 2, 4, 2]
print(arr)
merge_sort(arr,0,4)
print(arr)
 """

 
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
            merge_sort(arr,0,n-1)
            t.stop()
            promedio += t.printTime()
        print(n,round(promedio/10,3))
        
       
