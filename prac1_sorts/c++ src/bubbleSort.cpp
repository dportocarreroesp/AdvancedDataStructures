#include <iostream>
#include "Timer.hpp"

using namespace std;

void swap(int *xp, int *yp) 
{ 
	int temp = *xp; 
	*xp = *yp; 
	*yp = temp; 
} 

void bubble_sort(int arr[], int n) 
{ 
	int i, j; 
	for (i = 0; i < n-1; i++)
        for (j = 0; j < n-i-1; j++) 
            if (arr[j] > arr[j+1]) 
                swap(&arr[j], &arr[j+1]); 
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
    bubble_sort(arr, n);
    timer.stop();
    
    cout<<"Tiempo en milisegundos: "<<timer.elapsedMilliseconds()<<endl;

    delete [] arr;
    return 0;
}