public class counting_sort {
    int[] count_sort(int array[],int new_array[]){
        
        int num_max = array[0];
        for (int i = 1; i < array.length; i++)
        {
            if(array[i] > num_max)
                num_max = array[i];
        }
        int count[]=new int[10000+1];

        for (int j=0; j < array.length ;j++ )
        {  
            count[array[j]]++;
        }
        for (int i=0; i < num_max ;i++ )//fijar el rango 
        {  
            count[i+1] = count[i] + count[i+1];
        }
        
        for (int i = 0; i < array.length ; i++)
        {
            new_array[count[array[i]]-1] = array[i];
            count[array[i]]--;
        }
        return new_array;
    }

    void print(int new_array[]){
        for(int i=0;i<new_array.length;i++)
            System.out.print(new_array[i]+" "); 
        System.out.println(); 
    }

    public static void main(String[] args) {
        counting_sort sort = new counting_sort(); 
        int array[] = {5435,8606,9263,5398,3231,6944,3186,1333,1626,245}; 
        int aux[] = new int[array.length];
        
        int[] new_array = sort.count_sort(array,aux);  
        sort.print(new_array);  
    }
}
