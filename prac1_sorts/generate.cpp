#include <iostream>

using namespace std;

#define MX 1000

/* int main() {
    cout<<6<<endl;
    for(int i=100000; i<=600000; i+=100000) {
        cout<<i<<endl;
        for (int k = 0; k < 10; ++k)
        {
            for( int j=0; j<i; j++) {
                cout << rand()%MX << ' ';
            }
            cout<< endl;
        }
    }
    return 0;
} */

int main() {
    cout<<15<<endl;
    for(int i=10000; i<=150000; i+=10000) {
        cout<<i<<endl;
        for (int k = 0; k < 5; ++k)
        {
            for( int j=0; j<i; j++) {
                cout << rand()%MX << ' ';
            }
            cout<< endl;
        }
    }
    return 0;
}