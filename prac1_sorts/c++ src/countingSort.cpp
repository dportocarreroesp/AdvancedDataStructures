#include <iostream>
#include "Timer.hpp"
using namespace std;
#define max 1000

void counting_sort(int* &array, int n)
{

    int *count = new int[max]{0};
    for (int i = 0; i < n; i++)
        count[array[i]]++;

    for (int i = 0; i < max-1 ; i++)
        count[i + 1] = count[i] + count[i + 1];

    for (int i = max-1; i > 0; i--)
        count[i] = count[i-1];
    count[0] = 0;

    int *newA = new int[n]{0};
    
    for (int i = 0; i < n; i++)
    {
        newA[count[array[i]]] = array[i];
        count[array[i]]++;
    }
    
    delete [] array;
    delete [] count;
    array = newA;
}

int main()
{
    int numLengths;
    cin>>numLengths;

    for (int i = 0; i < numLengths; ++i)
    {
        float avg = 0;
        int numArrays = 10;
        int n;
        cin>>n;
        for(int j = 0; j < numArrays; ++j)
        {
            int* arr = new int [n]{0};
            for (int k = 0; k < n; ++k)
                cin>>arr[k];
            Timer timer;
            timer.start();
            counting_sort(arr,n);
            timer.stop();
            avg += timer.elapsedMilliseconds();
            delete [] arr;
        }
        avg /= numArrays;
        cout << n << " " << avg << endl;
    }
    

    return 0;
}