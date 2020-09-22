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
    int numArrays;
    cin>>numArrays;

    for (int i = 0; i < numArrays; ++i)
    {
        int n;
        cin>>n;
        int* arr = new int [n];
        for (int i = 0; i < n; ++i)
            cin>>arr[i];
        Timer timer;
        timer.start();
        selection_sort(arr,n);
        timer.stop();
        cout<<n<<' '<<timer.elapsedMilliseconds()<<endl;
        delete [] arr;
    }
    
    return 0;
}
