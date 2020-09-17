array = [5435,8606,9263 ,5398, 3231 ,6944, 3186, 1333 ,1626 ,245]
new_array = [0 for i in range(len(array))]

def counting_sort(array):
    num_max = array[0]
    for i in range(len(array)):
        if array[i] > num_max :
            num_max = array[i]

    print(array)

    counts = [0 for i in range(num_max+1)]

    for i in range(len(array)):
        counts[array[i]] = counts[array[i]]+1

    for i in range(num_max):
        counts[i+1] = counts[i] + counts[i+1]


    for i in range(len(array)):
        new_array[counts[array[i]]-1] = array[i];
        counts[array[i]] = counts[array[i]]-1

counting_sort(array)
print(new_array)