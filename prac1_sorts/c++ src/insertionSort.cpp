#include <bits/stdc++.h>
#include "Timer.hpp"

using namespace std;

void show(int arr[], int n)
{
	int i; 
	for(i = 0; i < n; i++)
		cout<<arr[i]<<" ";
	cout<<"\n";
}

void inSort(int arr[], int n)
{
	int i, key, j;
	for (i = 1 ; i < n ; i++)
	{
		key = arr[i];
		j = i - 1;

		while (j >= 0 && arr[i] > key)
		{
			arr[j +1] = arr[j];
			j = j - 1;
		}
		arr[j +1] = key;
	}
}
/*PRUEBA PRRRR*/
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
        inSort(arr,n);
        timer.stop();
        cout<<n<<' '<<timer.elapsedMilliseconds()<<endl;
        delete [] arr;
    }
    
    return 0;
}