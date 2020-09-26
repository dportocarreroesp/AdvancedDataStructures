#include <bits/stdc++.h>
#include "Timer.hpp"

using namespace std;

void insertion_sort(int arr[], int n) 
{
	
	int i, key, j;
	for (i = 1; i < n; ++i) 
	{
		key = arr[i]; 
		j = i - 1; 
		while (j >= 0 && arr[j] > key) 
		{
			arr[j + 1] = arr[j]; 
			j = j - 1;
		}
		arr[j + 1] = key;
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
            insertion_sort(arr,n);
            timer.stop();
            avg += timer.elapsedMilliseconds();
            delete [] arr;
        }
        avg /= numArrays;
        cout << n << " " << avg << endl;
    }

    return 0;
}