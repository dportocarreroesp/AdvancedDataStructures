#include <iostream>
#include <chrono>
#include <ctime>
#include "Timer.hpp"

using namespace std;


#define max 1000000


void selection_sort(int* array){
    int primer;
    int temp;
    for(int i = 0; i < max-1; i++)
    {
        primer = i;
        for (int j = i+1; j < max; j++)
        {
            if(array[primer] > array[j])
                primer = j;
        }
        temp = array[primer];
        array[primer] = array[i];
        array[i] = temp;
    }
}

void print(int* array){
    for(int i=0;i<max;i++){
        cout<<array[i]<<" ";
    }
}

int main(){

    int num;
    int array[max];
    Timer timer;
    for (int i = 0; i < max; i++)
    {
        cin>>num;
        array[i] = num;
        cout<<array[i] <<" ";
    }
    cout<<endl;

    //Selection Sort
    timer.start();
    selection_sort(array);
    timer.stop();
    print(array);
    
    cout<<endl;
    
    cout << "Milisegundos: " << timer.elapsedMilliseconds() <<endl;
    
    cout<<endl;
    return 0;

}
