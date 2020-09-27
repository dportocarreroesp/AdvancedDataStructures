from pylab import *
import matplotlib.pyplot as plt 
import numpy as np 
import pandas as pd 

datos=pd.read_csv('TimeCompare10k80k.csv',header=0,iterator=True, chunksize=20)

for chunk in datos:
	x = list(chunk.iloc[:,0])
	y1 = list(chunk.iloc[:,1])
	y2 = list(chunk.iloc[:,2])
	y3 = list(chunk.iloc[:,3])
	y4 = list(chunk.iloc[:,4])
	y5 = list(chunk.iloc[:,5])	
	y6 = list(chunk.iloc[:,6])
	y7 = list(chunk.iloc[:,7])

#	print(x)
#	print(y)

print(x)
print(y1)
print(y2)
print(y3)
print(y4)
print(y5)
print(y6)
print(y7)

plot(x,y1,'bp-',x,y2,'rd-',x,y3,'go-',x,y4,'m<-',x,y5,'y>-',x,y6,'ko-',x,y7,'cp-')
legend(('couting','heap','merge','quick','buble','insertion','selection'),prop = {'size':10},loc='upper left')
'''

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
