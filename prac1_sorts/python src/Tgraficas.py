from pylab import *
import matplotlib.pyplot as plt 
import numpy as np 
import pandas as pd 

datos=pd.read_csv('TimeComparacion.csv',header=0,iterator=True, chunksize=10)

for chunk in datos:
	x = list(chunk.iloc[:,0])
	y1 = list(chunk.iloc[:,1])
	y2 = list(chunk.iloc[:,2])
	

#	print(x)
#	print(y)

print(x)
print(y1)
print(y2)


plot(x,y1,'bp-',x,y2,'rd-')
legend(('couting','heap'),prop = {'size':10},loc='upper left')



show()
