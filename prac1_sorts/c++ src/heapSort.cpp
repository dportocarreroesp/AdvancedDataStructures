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
        heapSort(arr,n);
        timer.stop();
        cout<<n<<' '<<timer.elapsedMilliseconds()<<endl;
        delete [] arr;
    }
    
    return 0;
}