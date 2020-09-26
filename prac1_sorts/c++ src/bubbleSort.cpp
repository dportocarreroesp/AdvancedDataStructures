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
            bubble_sort(arr,n);
            timer.stop();
            avg += timer.elapsedMilliseconds();
            delete [] arr;
        }
        avg /= numArrays;
        cout << n << " " << avg << endl;
    }
    

    return 0;
}