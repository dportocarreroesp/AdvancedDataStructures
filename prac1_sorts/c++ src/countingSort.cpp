#include <iostream>
#include "Timer.hpp"
using namespace std;
#define max 1000

void counting_sort(int* &array, int n)
{
    /* int num_max = array[0];
    for (int i = 1; i < max; i++)
        if (array[i] > num_max)
            num_max = array[i]; */

    int *count = new int[max + 1];
    for (int i = 0; i < n; i++)
        count[array[i]]++;

    /* for (int i = 0; i < num_max + 1; i++)
        count[i + 1] = count[i] + count[i + 1]; */

    for (int i = 0; i < max ; i++)
        count[i + 1] = count[i] + count[i + 1];

    for (int i = max; i > 0; i--)
        count[i] = count[i-1];
    count[0] = 0;

    /* for (int i = 0; i < max; i++)
    {
        new_array[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    } */

    int *newA = new int[n]{0};

    for (int i = 0; i < n; i++)
    {
        newA[count[array[i]]] = array[i];
        count[array[i]]++;
    }
    
    delete [] array;
    array = newA;
}

void print(int *new_array)
{
    for (int i = 0; i < max; i++)
    {
        cout << new_array[i] << " ";
    }
}
int main()
{
    int numArrays;
    cin >> numArrays;

    for (int i = 0; i < numArrays; ++i)
    {
        int n;
        cin >> n;
        int *arr = new int[n];
        for (int i = 0; i < n; ++i)
            cin >> arr[i];
        Timer timer;
        timer.start();
        counting_sort(arr, n);
        timer.stop();
        cout << n << ' ' << timer.elapsedMilliseconds() << endl;

        delete [] arr;
    }
    return 0;
}
