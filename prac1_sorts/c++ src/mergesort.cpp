#include <iostream>
using namespace std;

void imprimir(int lista[],int tam){
	for (int i = 0; i < tam; ++i)
	{
		cout << lista[i]<<"-";
	}
	cout << endl;
}

void intercala(int lista[],int p,int q, int r){

	int aux[r+1];
	
	for (int i = p; i <=r; ++i)
	{
		aux[i]=lista[i];

	}
	for (int i = q; i <= r; ++i)
	{
		aux[r+q+1-i]=lista[i];
	}
	int i = p;
	int j = r;
	for (int k = p; k <= r; ++k)
	{
		if (aux[i]<=aux[j])
		{
			lista[k]=aux[i];
			i++;
		}
		else{
			lista[k]=aux[j];
			j--;
		}
	}

}

void mergeSort(int lista[],int p, int r){
	if (p<r)
	{
		int q = (r+p)/2;
		mergeSort(lista,p,q);
		mergeSort(lista,q+1,r);
		intercala(lista,p,q,r);
	}
}
