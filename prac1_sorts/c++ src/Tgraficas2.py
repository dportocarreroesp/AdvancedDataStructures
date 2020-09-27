from pylab import *
import matplotlib.pyplot as plt 
import numpy as np 
import pandas as pd 

datos=pd.read_csv('TimeComparacion.csv',header=0,iterator=True, chunksize=10)

for chunk in datos:
	x = list(chunk.iloc[:,0])
	y1 = list(chunk.iloc[:,1])
	y2 = list(chunk.iloc[:,2])
	y3 = list(chunk.iloc[:,3])
	y4 = list(chunk.iloc[:,4])

#	print(x)
#	print(y)

print(x)
print(y1)
print(y2)
print(y3)
print(y4)
plot(x,y1,'bp-',x,y2,'rd-',x,y4,'m<-')
legend(('couting','heap','quick'),prop = {'size':10},loc='upper left')
'''
x,y3,'go-',
,'merge'
for i in range(6):
	pt=np.arange(x,ylabel)
#x = arange(3,40)
#y = arange(3,40)
#plt.subplot(3,2,1()
	plt.plot(pt)    
	plt.xlabel('elementos')
	plt.ylabel('tiempo')
	plt.title('Comparacion Algoritmos')
	plt.grid(True)
'''


show()
