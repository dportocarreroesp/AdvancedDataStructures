#include <iostream>
#include <chrono>
#include <ctime>
#include "Timer.hpp"

using namespace std;

void selection_sort(int* array, int n){
    int primer;
    int temp;
    for(int i = 0; i < n-1; i++)
    {
        primer = i;
        for (int j = i+1; j < n; j++)
        {
            if(array[primer] > array[j])
                primer = j;
        }
        temp = array[primer];
        array[primer] = array[i];
        array[i] = temp;
    }
}

void print(int* array, int n){
    for(int i=0;i<n;i++){
        cout<<array[i]<<" ";
    }
}

int main()
{
    int numLengths;
    cin>>numLengths;

    for (int i = 0; i < numLengths; ++i)
    {
        float avg = 0;
        int numArrays = 5;
        int n;
        cin>>n;
        for(int j = 0; j < numArrays; ++j)
        {
            int* arr = new int [n]{0};
            for (int k = 0; k < n; ++k)
                cin>>arr[k];
            Timer timer;
            timer.start();
            selection_sort(arr,n);
            timer.stop();
            avg += timer.elapsedMilliseconds();
            delete [] arr;
        }
        avg /= numArrays;
        cout << n << " " << avg << endl;
    }
    

    return 0;
}