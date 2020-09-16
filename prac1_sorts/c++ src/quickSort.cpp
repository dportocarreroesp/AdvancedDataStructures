#include <iostream>
#include "Timer.hpp"


using namespace std;

void swap(int* a, int* b)  
{  
    int t = *a;  
    *a = *b;  
    *b = t;  
} 

int partition (int arr[], int low, int high)  
{  
    int pivot = arr[high];
    int i = (low - 1);
  
    for (int j = low; j <= high - 1; j++)  
    {
        if (arr[j] < pivot)  
        {  
            i++;
            swap(&arr[i], &arr[j]);  
        }  
    }  
    swap(&arr[i + 1], &arr[high]);  
    return (i + 1);  
}  

void quick_sort(int arr[], int low, int high)  
{  
    if (low < high)  
    {
        int pi = partition(arr, low, high);  

        quick_sort(arr, low, pi - 1);  
        quick_sort(arr, pi + 1, high);  
    }  
}

int main()
{
    int n;
    cin>>n;
    int* arr = new int [n];

    for(int i = 0; i < n; ++i)
        cin>>arr[i];
    Timer timer;
    timer.start();
    quick_sort(arr, 0, n-1);
    timer.stop();
    
    cout<<"Tiempo en milisegundos: "<<timer.elapsedMilliseconds()<<endl;

    for(int i = 0; i < n; ++i)
        cout<<arr[i]<<' ';
    cout<<endl;
    delete [] arr;
    return 0;
    return 0;
}