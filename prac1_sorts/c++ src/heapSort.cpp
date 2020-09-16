#include <iostream>

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
int main() {
    int miarr[]={5,8,2,6,7,4,9,23,54,12};
    int n=10;
    heapSort(miarr,n);
    print(miarr,n);
    return 0;
}
