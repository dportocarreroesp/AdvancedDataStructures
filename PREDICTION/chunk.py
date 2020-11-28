from google.colab import drive
drive.mount('/content/drive')

import math


class BPQ:
    def __init__(self,size):
        self.size = size;
        self.queue = []

    def insert(self,val, priority):
        queue = []
        queue.append(val);
        queue.append(priority);

        if(len(self.queue) < self.size):
            self.queue.append(queue);
        else:
            if (self.queue[len(self.queue) - 1][1] >  priority):
                self.queue[len(self.queue)  - 1] = queue;

        self.queue.sort(key=lambda x:x[1]);

class Node:
    def __init__(self):
        self.point = None;
        self.axis = None;
        self.left = None;
        self.right = None;

def getHeight(node):
	if(not node):
		return -1
	else:
		return 1 + max(getHeight(node.left), getHeight(node.right));

def build_kdtree(points, depth = 0):
    n = len(points)
    if n == 0:
      return;
    m = len(points[0])-1;
    axis = depth % m;

    sortedArr = points[points[:,axis].argsort()]

    median = math.ceil((len(sortedArr)-1)/2)

    node = Node();
    node.point = sortedArr[median];
    node.axis = axis;
    node.left = build_kdtree(sortedArr[0:median], depth+1);
    node.right = build_kdtree(sortedArr[median+1:], depth+1);
    return node;

def build_kdtreeArray(points, depth = 0):
    if not points:
        return;
    n = len(points);
    m = len(points[0]);
    axis = depth % m;

    points.sort(key=lambda x:x[axis]);

    median = len(points)//2;
    #print(median);

    node = Node();
    node.point = points[median];
    node.axis = axis;
    node.left = build_kdtreeArray(points[0:median], depth+1);
    node.right = build_kdtreeArray(points[median+1:], depth+1);
    return node;

def distanceSquared(point1, point2):
    distance = 0;
    for i in range(k):
        distance += pow(point1[i] - point2[i], 2);
    return math.sqrt(distance);

def closest_point_brute_force(points,point):
    if(len(points) < 1):
        return None;
    if(len(points) == 1):
        return points[0];

    min = distanceSquared(point, points[0]);
    minPoint = points[0];

    for i in range(1,len(points)):
        distance = distanceSquared(point, points[i]);
        if(distance < min):
            min = distance;
            minPoint = points[i];

    return minPoint

def closest_point(node, point, depth = 0, best = None):
    if (not node):
        return best;
    if (depth == 0):
        best = node.point;
    else:
        if (distanceSquared(node.point, point) < distanceSquared(best, point)):
            best = node.point;
    axis = depth % len(node.point);


    if (point[axis] < node.point[axis]):
        best = closest_point(node.left, point, depth + 1, best);
        if (abs(point[axis] - node.point[axis]) < distanceSquared(point, best)):
            best = closest_point(node.right, point, depth + 1, best);
    else:
        best = closest_point(node.right, point, depth + 1, best);
        if( abs(point[axis] - node.point[axis]) < distanceSquared(point, best)):
            best = closest_point(node.left, point, depth + 1, best);

    return best;

def knn(node, query_point, depth = 0):

    if (not node):
        return;

    bpq.insert(node.point, distanceSquared(node.point, query_point)); # insertamos el nodo visitado a la pila

    axis = depth % k;
    next_branch = None;
    opposite_branch = None;

    if (query_point[axis] < node.point[axis]):
        next_branch = node.left;
        opposite_branch = node.right;
    else:
        next_branch = node.right;
        opposite_branch = node.left;

    knn(next_branch, query_point, depth + 1);

    if ((len(bpq.queue) < bpq.size) or (abs(query_point[axis] - node.point[axis]) < bpq.queue[len(bpq.queue) - 1][1])):
        knn(opposite_branch, query_point, depth + 1);
def recursive_generate_dot(node):
	txt = "";
	if(node):
		if(node.left):
			txt = txt + '\t"';
			txt = txt + "[" + ",".join(str(x) for x in node.point) + "]";
			txt = txt + '" -> "';
			txt = txt + "[" + ",".join(str(x) for x in node.left.point) + "]";
			txt = txt + '";\n';
			txt = txt + recursive_generate_dot(node.left);

		if (node.right):
			txt = txt + '\t"';
			txt = txt + "[" + ",".join(str(x) for x in node.point) + "]";
			txt = txt + '" -> "';
			txt = txt + "[" + ",".join(str(x) for x in node.right.point) + "]";
			txt = txt + '";\n';
			txt = txt + recursive_generate_dot(node.right);

	return txt;

def generate_dot(node):
	string = "digraph G {\n";
	string = string + recursive_generate_dot(node);
	string = string + "}\n";
	return string;

import pandas as pd

data = pd.read_csv('/content/drive/MyDrive/EDA-Grupo/train.csv')
data.head()

data = data.drop(['Id', 'Y', 'CreationDate'], axis=1)
data['Content'] = data['Title'] + ' ' + data['Body']
data = data.drop(['Title', 'Body'], axis=1)
data.head()

import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

from gensim.parsing.preprocessing import remove_stopwords
from gensim.parsing.preprocessing import STOPWORDS

nltk.download('stopwords')

all_stopwords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]

#add words
all_stopwords.append("'m")
all_stopwords.append("<")
all_stopwords.append(">")
all_stopwords.append("the")
all_stopwords.append("to")
all_stopwords.append("?")
all_stopwords.append("-")
all_stopwords.append(",")
all_stopwords.append(";")
all_stopwords.append(")")
all_stopwords.append("(")
all_stopwords.append("[")
all_stopwords.append("]")
all_stopwords.append("{")
all_stopwords.append("}")
all_stopwords.append("+")
all_stopwords.append("=")
all_stopwords.append("*")
all_stopwords.append("1")
all_stopwords.append("0")
all_stopwords.append("&") 

def del_word(text):
  word_tokens = text.split()
  filtered_sentence = [w for w in word_tokens if not w in all_stopwords]
  filtered_sentence = []
  for w in word_tokens:
    if w not in all_stopwords and w!='/p' and w !='``' and w!='--' and w!="''":
      filtered_sentence.append(w)
  i=' '.join(filtered_sentence)
  return i
def remove_stopwords(string):
    word_list = [word.lower() for word in string.split()]
    stopwords_list = list(stopwords.words("english"))
    for word in word_list:
        if word in stopwords_list:
            word_list.remove(word)
    return ' '.join(word_list)
def superCleanText(text):
  text = re.sub('\\n',' ',str(text))
  text = re.sub(r'\W',' ',str(text))
  text = re.sub(r'https\s+|www.\s+',r'', str(text))
  text = re.sub(r'http\s+|www.\s+',r'', str(text))
  re.sub(r'\s+[a-zA-Z]\s+',' ',str(text))
  text = re.sub(r'\^[a-zA-Z]\s+',' ',str(text))
  text =re.sub(r'\s+',' ',str(text))
  text = text.lower()

  text = re.sub(r"\’", "\'", str(text))
  text = re.sub(r"won\'t", "will not", str(text))
  text = re.sub(r"can\'t", "can not", str(text))
  text = re.sub(r"don\'t", "do not", str(text))
  text = re.sub(r"dont", "do not", str(text))
  text = re.sub(r"n\’t", " not", str(text))
  text = re.sub(r"n\'t", " not", str(text))
  text = re.sub(r"\'re", " are", str(text))
  text = re.sub(r"\'s", " is", str(text))
  text = re.sub(r"\’d", " would", str(text))
  text = re.sub(r"\d", " would", str(text))
  text = re.sub(r"\'ll", " will", str(text))
  text = re.sub(r"\'t", " not", str(text))
  text = re.sub(r"\'ve", " have", str(text))
  text = re.sub(r"\'m", " am", str(text))
  text = re.sub(r"\n", "", str(text))
  text = re.sub(r"\r", "", str(text))
  text = re.sub(r"[0-9]", "digit", str(text))
  text = re.sub(r"\'", "", str(text))
  text = re.sub(r"\"", "", str(text))
  text = re.sub(r'[?|!|\'|"|#]',r'', str(text))
  text = re.sub(r'[.|,|)|(|\|/]',r' ', str(text))
  text = remove_stopwords(text)
  text = re.sub(r"\b[a-zA-Z]\b", "", str(text))
  return text

data['Content'] = data['Content'].apply(superCleanText)
data['Content'] = data['Content'].apply(del_word)


data.head()


tuples = [tuple(x) for x in data.values]
freq = {}
n = 0
for t in tuples:
  temp = t[1].split()
  for w in temp:
    if w in freq:
      freq[w] += 1
    else:
      freq[w] = 1
#  if (n==10000):
#    break
MaxFreq = dict(sorted(freq.items(), key=lambda item: item[1], reverse=True))


import itertools

# 100 más frecuentes
x = itertools.islice(MaxFreq.items(), 0, 100)
#max = 0
print("total words number: ", end=" ")
print(len(freq))
#for key, value in x:
#    print(key, value)

#    max = value
import matplotlib.pyplot as plt
from wordcloud import WordCloud

wordcloud = WordCloud(width=800, height=350)
wordcloud.generate_from_frequencies(frequencies=freq)
plt.figure(figsize=(20,10))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()


'''Classifier Tf-Idf'''

import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer


tuples = [tuple(x) for x in data.values]

content = []

#for i in tuples:
#  content.append(i[1])

for i in range(45000):
  content.append(tuples[i][1])


textVectorizer = TfidfVectorizer()
textVectorizer.fit(content)

#print(textVectorizer.transform([content[0]]).shape)

documentTermMatrix = textVectorizer.transform(content)
print(documentTermMatrix.shape)
k = documentTermMatrix.shape[1]





'''Building kd-tree'''
points = documentTermMatrix.toarray()

classifier = build_kdtree(points)




'''Classifier Hashing-vectorizer'''
import re
import numpy as np
from sklearn.feature_extraction.text import HashingVectorizer

tuples = [tuple(x) for x in data.values]

content = []
tags = []
for i in range(45000):
  content.append(tuples[i][1])
  tags.append(tuples[i][0])

tagsVector = []
for w in tags:
  temp = re.split('<|>|><',w)
  temp2 = []
  for t in temp:
    if (t != ""):
      temp2.append(t)
  tagsVector.append(temp2)

#k = 2**12
k = 100
#textVectorizer = HashingVectorizer(n_features=2**10)
textVectorizer = HashingVectorizer(n_features=k)
textVectorizer.fit(content)

documentTermMatrix = textVectorizer.transform(content)
print(documentTermMatrix.shape)


'''build kdtree'''
points = documentTermMatrix.toarray()

a = np.zeros(shape=(len(points),1))

for i in range (len(points)):
  a[i] = [i]
  i += 1

points = np.hstack((points,a))
classifier = build_kdtree(points)

'''predicting'''

tt = input()
tt = superCleanText(tt)
tt = del_word(tt)
point = textVectorizer.transform([tt]).toarray()[0]


bpq = BPQ(7);
queue = [];
knn(classifier, point);
#print("k_nearest_neighbor: ");
#for i in bpq.queue:
#  print(i[0])
print(tt)
predictFreq = {}
for i in bpq.queue:
  for tag in tagsVector[np.int64(i[0][k])]:
    if tag in predictFreq:
      predictFreq[tag] += 1
    else:
      predictFreq[tag] = 1
maxFreq = 0
for key in predictFreq:
  if predictFreq[key] > maxFreq:
    maxFreq = predictFreq[key]

prediction = []
for key in predictFreq:
  if predictFreq[key] == maxFreq:
    prediction.append(key)
print(predictFreq)
prediction



'''TESTING'''

import pandas as pd

tdata = pd.read_csv('/content/drive/MyDrive/EDA-Grupo/valid.csv')
tdata.head()

tdata = tdata.drop(['Id', 'Y', 'CreationDate'], axis=1)
tdata['Content'] = tdata['Title'] + ' ' + tdata['Body']
tdata = tdata.drop(['Title', 'Body'], axis=1)

tdata['Content'] = tdata['Content'].apply(superCleanText)
tdata['Content'] = tdata['Content'].apply(del_word)
tdata.head()

ttuples = [tuple(x) for x in tdata.values]

testingContent = []
testingTags = []
for i in ttuples:
  testingContent.append(i[1])
  testingTags.append(i[0])

testingTagsVector = []
for w in testingTags:
  temp = re.split('<|>|><',w)
  temp2 = []
  for t in temp:
    if (t != ""):
      temp2.append(t)
  testingTagsVector.append(temp2)


testingDocumentTermMatrix = textVectorizer.transform(testingContent)
testingPoints = testingDocumentTermMatrix.toarray()

a = np.zeros(shape=(len(testingPoints),1))
for i in range (len(testingPoints)):
  a[i] = [i]
  i += 1

testingPoints = np.hstack((testingPoints,a))

noTest = 0
success = 0
total = 0
for test in testingPoints:
  
  bpq = BPQ(10);
  queue = [];
  knn(classifier, test);

  predictFreq = {}
  for i in bpq.queue:
    for tag in tagsVector[np.int64(i[0][k])]:
      if tag in predictFreq:
        predictFreq[tag] += 1
      else:
        predictFreq[tag] = 1
  maxFreq = 0
  for key in predictFreq:
    if predictFreq[key] > maxFreq:
      maxFreq = predictFreq[key]

  prediction = []
  for key in predictFreq:
    if predictFreq[key] == maxFreq:
      prediction.append(key)
  print(prediction)
  print(tagsVector[noTest])
  
  for realTag in tagsVector[noTest]:
    for predictTag in prediction:
      if (realTag == predictTag):
        success += 1
        break
    total += 1
  noTest += 1
  if (noTest == 30):
    break
print("Accuracy: ", end=" ")
print(success/total)

print("Success: ", success)
print("Total: ", total)


'''Keywords frequency encoding'''

tuples = [tuple(x) for x in data.values]

tags = []
for i in range(45000):
  tags.append(tuples[i][0])

tagsVector = []
for w in range(45000):
  temp = re.split('<|>|><',tags[w])
  temp2 = []
  for t in temp:
    if (t != ""):
      temp2.append(t)
  tagsVector.append(temp2)

k = 100;

x = itertools.islice(MaxFreq.items(), 0, k)
palabras = []

for key, value in x:
    palabras.append(key)

resultado=[]
for t in range(45000):
  temp=tuples[t][1].split()
  artemp=[]
  for a in palabras:
    contpal=0
    if a in temp:
      contpal += 1
    artemp.append(contpal)
  resultado.append(artemp)

from sklearn.decomposition import PCA
from sklearn.preprocessing import normalize

resultado = np.array(resultado)
# Normalizando
#resultado = resultado / np.linalg.norm(resultado)

print(len(resultado))
k = 75
pca = PCA(n_components=k)
pca.fit(resultado)
points = pca.transform(resultado)
variance = pca.explained_variance_ratio_
print(variance)
sum = 0
for i in variance:
  sum += i
print(sum)

a = np.zeros(shape=(len(points),1))

for i in range (len(points)):
  a[i] = [i]
  i += 1

points = np.hstack((points,a))

kwFreqRoot = build_kdtree(points)

#kwFreqRoot = build_kdtreeArray(resultado)


tt = input()
tt = superCleanText(tt)
tt = del_word(tt)
point = []
tempWords = tt.split()
for kw in palabras:
  kwFrequency = 0
  if kw in tempWords:
    kwFrequency += 1
  point.append(kwFrequency)

point = pca.transform([point])[0]
#point = point / np.linalg.norm(point)
#print(len(point))

bpq = BPQ(7);
queue = [];

knn(kwFreqRoot, point);
print(tt)
predictFreq = {}
for i in bpq.queue:
  for tag in tagsVector[np.int64(i[0][k])]:
    if tag in predictFreq:
      predictFreq[tag] += 1
    else:
      predictFreq[tag] = 1
predictMaxFreq = dict(sorted(predictFreq.items(), key=lambda item: item[1], reverse=True))

itPredict = itertools.islice(predictMaxFreq.items(), 0, 4)
for key, value in itPredict:
    print(key, value)



'''TESTING'''
import pandas as pd

tdata = pd.read_csv('/content/drive/MyDrive/EDA-Grupo/valid.csv')
tdata.head()


'''CLEANING'''
tdata = tdata.drop(['Id', 'Y', 'CreationDate'], axis=1)
tdata['Content'] = tdata['Title'] + ' ' + tdata['Body']
tdata = tdata.drop(['Title', 'Body'], axis=1)

tdata['Content'] = tdata['Content'].apply(superCleanText)
tdata['Content'] = tdata['Content'].apply(del_word)
tdata.head()
ttuples = [tuple(x) for x in tdata.values]

testingResultado = []
for t in range(250):
  temp = ttuples[t][1].split()
  artemp = []
  for a in palabras:
    contpal=0
    if a in temp:
      contpal += 1
    artemp.append(contpal)
  testingResultado.append(artemp)
testingTags = []
for i in range(250):
  testingTags.append(ttuples[i][0])

testingTagsVector = []
for w in testingTags:
  temp = re.split('<|>|><',w)
  temp2 = []
  for t in temp:
    if (t != ""):
      temp2.append(t)
  testingTagsVector.append(temp2)

testingPoints = pca.transform(testingResultado)

a = np.zeros(shape=(len(testingPoints),1))
for i in range (len(testingPoints)):
  a[i] = [i]
  i += 1

testingPoints = np.hstack((testingPoints,a))

noTest = 0
success = 0
total = 0
for test in testingPoints:
  
  bpq = BPQ(7);
  queue = [];
  knn(kwFreqRoot, test);

  predictFreq = {}
  for i in bpq.queue:
    for tag in tagsVector[np.int64(i[0][k])]:
      if tag in predictFreq:
        predictFreq[tag] += 1
      else:
        predictFreq[tag] = 1
  predictMaxFreq = dict(sorted(predictFreq.items(), key=lambda item: item[1], reverse=True))

  itPredict = itertools.islice(predictMaxFreq.items(), 0, 4)
  print("Test ", noTest+1)
  print("Predicciones: ", end=" ")
  for key, value in itPredict:
      print(key, end=" ")
  print()
  print("Real tags: ", end=" ")
  print(testingTagsVector[noTest])
  print()
  for realTag in testingTagsVector[noTest]:
    total += 1
    itPredict = itertools.islice(predictMaxFreq.items(), 0, 4)
    for key, value in itPredict:
      if (realTag == key):
        success += 1
        break
  noTest+=1
print("Accuracy: ", end=" ")
print(success/total)

print("Success: ", success)
print("Total: ", total)





































































