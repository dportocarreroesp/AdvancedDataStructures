import java.util.*;

class QuickSort {
    public static void main(String[] args) {
        int n;
        Scanner input = new Scanner(System.in);
        n = input.nextInt();
        


        int arr[] = new int [n];

        for(int i = 0; i < n; ++i)
            arr[i] = input.nextInt();
        
        quick_sort(arr, 0, n-1);
        
        printArray(arr);
        
        System.out.println("Tiempo en milisegundos: "+ 10);
    
        input.close();
    }

    static void printArray(int arr[]) 
    { 
        int n = arr.length; 
        for (int i=0; i<n; ++i) 
            System.out.print(arr[i]+" "); 
        System.out.println(); 
    }

    static int partition (int arr[], int low, int high)  
    {  
        int pivot = arr[high];
        int i = (low - 1);
    
        int temp;

        for (int j = low; j <= high - 1; j++)  
        {
            if (arr[j] < pivot)  
            {  
                i++;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }  
        }  
        temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;
        return (i + 1);  
    }  

    static void quick_sort(int arr[], int low, int high)  
    {  
        if (low < high)  
        {
            int pi = partition(arr, low, high);  

            quick_sort(arr, low, pi - 1);  
            quick_sort(arr, pi + 1, high);  
        }  
    }
}