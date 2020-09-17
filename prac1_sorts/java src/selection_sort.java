public class selection_sort {

    void select_sort(int array[]){
        int primer;
        int temp;
        for(int i = 0; i < array.length-1; i++)
        {
            primer = i;
            for (int j = i+1; j < array.length; j++)
            {
                if(array[primer] > array[j])
                    primer = j;
            }
            temp = array[primer];
            array[primer] = array[i];
            array[i] = temp;
        }

    }
  
    void print(int array[]) 
    { 
        for (int i=0; i<array.length; ++i) 
            System.out.print(array[i]+" "); 
        System.out.println(); 
    } 
    public static void main(String[] args) {
        selection_sort sort = new selection_sort(); 
        int array[] = {5435,8606,9263,5398,3231,6944,3186,1333,1626,245}; 
        sort.select_sort(array);  
        sort.print(array);  
    }
}