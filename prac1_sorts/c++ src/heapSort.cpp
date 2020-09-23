#include <iostream>
#include "Timer.hpp"

using namespace std;
void swap(int *arr,int a,int b){
    int tmp=arr[a];
    arr[a]=arr[b];
    arr[b]=tmp;
}
void heapify(int *arr,int n, int i){
    int largo=i;
    int l=2*i+1;
    int r=2*i+2;
    if(l<n && arr[l]>arr[largo]){
        largo=l;
    }
    if(r<n && arr[r]>arr[largo]){
        largo=r;
    }
    if(largo!=i){
        swap(arr,i,largo);
        heapify(arr,n,largo);
    }
}
void heapSort(int *arr,int n){
    for(int i=(n/2)+1;i>=0;i--){
        heapify(arr,n,i);
    }
    for(int i=n-1;i>0;i--){
        swap(arr,0,i);
        heapify(arr,i,0);
    }
}
void print(int *arr,int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
    cout<<endl;
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
            heapSort(arr,n);
            timer.stop();
            avg += timer.elapsedMilliseconds();
            delete [] arr;
        }
        avg /= numArrays;
        cout << n << " " << avg << endl;
    }
    

    return 0;
}