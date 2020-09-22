
import java.util.*;

class BubbleSort {
    public static void main(String[] args) {
        int n;
        Scanner input = new Scanner(System.in);
        n = input.nextInt();
        


        int arr[] = new int [n];

        for(int i = 0; i < n; ++i)
            arr[i] = input.nextInt();
        
        bubble_sort(arr, n);
        
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

    static void bubble_sort(int arr[], int n) 
    { 
        int i, j; 
        int temp;
        for (i = 0; i < n-1; i++)
            for (j = 0; j < n-i-1; j++) 
                if (arr[j] > arr[j+1]) 
                {
                    temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
    }
}