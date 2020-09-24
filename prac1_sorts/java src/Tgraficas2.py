from pylab import *
import matplotlib.pyplot as plt 
import numpy as np 
import pandas as pd 

datos=pd.read_csv('TimeCompare.csv',header=0,iterator=True, chunksize=20)

for chunk in datos:
	x = list(chunk.iloc[:,0])
	y1 = list(chunk.iloc[:,1])
	y2 = list(chunk.iloc[:,2])
	y3 = list(chunk.iloc[:,3])
	y4 = list(chunk.iloc[:,4])
	#y5 = list(chunk.iloc[:,5])	
	#y6 = list(chunk.iloc[:,6])
	#y7 = list(chunk.iloc[:,7])

#	print(x)
#	print(y)

print(x)
print(y1)
print(y2)
print(y3)
print(y4)

plot(x,y1,'bp-',x,y2,'rd-',x,y3,'go-',x,y4,'ms-')
legend(('couting','heap','merge','quick'),prop = {'size':10},loc='upper left')

show()