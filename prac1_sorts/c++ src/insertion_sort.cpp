#include <bits/stdc++.h>

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
	show(arr,n);
}



int main()
{
	int arr[]={12,11,13,5,6};
	int n = sizeof(arr)/sizeof(arr[0]);

	inSort(arr,n);
	show(arr,n);

	return 0;
}












