#include <iostream>
#include "Timer.hpp"
using namespace std;
#define max 10

int* counting_sort(int* array,int* new_array){
    int num_max = array[0];
    for (int i = 1; i < max; i++)
    {
        if(array[i] > num_max)
            num_max = array[i];
    }
    
    int *count = new int [num_max+1];
    for (int j=0; j < max ;j++ )
    {  
        count[array[j]]++;
    }

    for (int i=0; i < num_max+1 ;i++ )
    {  
        count[i+1] = count[i] + count[i+1];
    }
    for (int i = 0; i < max; i++)
    {
        new_array[count[array[i]]-1] = array[i];
        count[array[i]]--;
    }
    return new_array;

}

void print(int* new_array){
     for(int i=0;i<max;i++){
        cout<<new_array[i]<<" ";
    }
}
int main(){

    int num;
    int array[max];
    for (int i = 0; i < max; i++)
    {
        cin>>num;
        array[i] = num;
        cout<<array[i] <<" ";
    }
    cout<<endl;
    
    //Counting sort
    int aux[max];
    int* new_array = counting_sort(array,aux);

    //print  
    cout<<endl;
    print(new_array);
   
    cout<<endl;
    return 0;

}
