def bubble_sort(arr, n):
    for i in range(n-1):
        for j in range(n-i-1):
            if(arr[j] > arr[j+1]):
                arr[j], arr[j+1] = arr[j+1], arr[j]

def printArray(arr, n):
    for i in range(n):
        print(arr[i], end=" ")
    print()


arr = []
n = int(input())

for i in range(n):
    arr.append(int(input()))

print("mmm")

bubble_sort(arr,n)

printArray(arr,n)
print("hello world")