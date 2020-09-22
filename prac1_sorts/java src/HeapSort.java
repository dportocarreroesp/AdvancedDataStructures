public class HeapSort {
    void swap(int arr[], int a, int b){
        int tmp = arr[a];
        arr[a]=arr[b];
        arr[b]=tmp;
    }

    void heapify(int arr[], int n, int i){
        int largo=i;
        int l=2*i+1;
        int r=2*i+2;
        if(l<n && arr[l]>arr[largo]){
            largo=l;
        }
        if(r<n && arr[r]>arr[largo]){
            largo=r;
        }
        if(largo != i){
            swap(arr,i,largo);
            heapify(arr,n,largo);
        }
    }
    public void heapsort(int arr[],int n){
        for(int i=n/2-1;i>=0;i--){
            heapify(arr,n,i);
        }
        for(int i=n-1;i>0;i--){
            swap(arr,0,i);
            heapify(arr,i,0);
        }
    }


    public static void main(String[] args) {
        int arr[]={23,45,7,3,56,98,56,7};
        int n=arr.length;
        HeapSort heap = new HeapSort();
        heap.heapsort(arr,n);
        for(int i=0;i<n;i++){
            System.out.print(arr[i]+" ");
        }
            System.out.println();
    }
}
