#include <iostream>
#include <chrono>
#include <ctime>
using namespace std;


#define max 1000000

class Timer
{
public:
    void start()
    {
        m_StartTime = std::chrono::system_clock::now();
        m_bRunning = true;
    }
    
    void stop()
    {
        m_EndTime = std::chrono::system_clock::now();
        m_bRunning = false;
    }
    
    double elapsedMilliseconds()
    {
        std::chrono::time_point<std::chrono::system_clock> endTime;
        
        if(m_bRunning)
        {
            endTime = std::chrono::system_clock::now();
        }
        else
        {
            endTime = m_EndTime;
        }
        
        return std::chrono::duration_cast<std::chrono::milliseconds>(endTime - m_StartTime).count();
    }
    
    double elapsedSeconds()
    {
        return elapsedMilliseconds() / 1000.0;
    }

private:
    std::chrono::time_point<std::chrono::system_clock> m_StartTime;
    std::chrono::time_point<std::chrono::system_clock> m_EndTime;
    bool                                               m_bRunning = false;
};

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

    cout << "Milisegundos: " << timer.elapsedMilliseconds() <<endl;
    
    cout<<endl;
    return 0;

}