
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


array = [64, 34, 25, 12, 22, 11, 90, 23]
na = len(array)
heapsort(array, na)
for i in range(na):
    print("%d" % array[i]),


