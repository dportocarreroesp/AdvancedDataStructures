import java.util.Arrays;

public class CountingSort {
    void count_sort(int array[],int n){
        int[] count = new int[1000];
        for (int i = 0; i < n; i++)
            count[array[i]]++;

        for (int i = 0; i < 999 ; i++)
            count[i + 1] = count[i] + count[i + 1];

        for (int i = 999; i > 0; i--)
            count[i] = count[i-1];
        count[0] = 0;

        int[] newA = new int[n];
        
        for (int i = 0; i < n; i++)
        {
            newA[count[array[i]]] = array[i];
            count[array[i]]++;
        }
        
        for (int i = 0; i < n; ++i)
            array[i] = newA[i];
    }

    void print(int new_array[]){
        for(int i=0;i<new_array.length;i++)
            System.out.print(new_array[i]+" "); 
        System.out.println(); 
    }

    public static void main(String[] args) {
        CountingSort sort = new CountingSort(); 
        int array[] = {5435,8606,9263,5398,3231,6944,3186,1333,1626,245}; 
        int n = array.length;
        sort.count_sort(array, n);
        sort.print(array);  
    }
}
