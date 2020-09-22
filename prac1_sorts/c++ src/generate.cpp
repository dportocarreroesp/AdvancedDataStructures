#include <iostream>

using namespace std;

#define MX 1000

int main() {
    cout<<5<<endl;
    for(int i=100000; i<=500000; i+=100000) {
            cout<<i<<endl;
            for( int j=0; j<i; j++) {
                    cout << rand()%MX << ' ';
            }
            cout<< endl;
    }
    return 0;
}