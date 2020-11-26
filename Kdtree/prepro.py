import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter
from _collections import OrderedDict
import csv
stop_words = stopwords.words('english')
stop_words +='?';
stop_words +='-';
stop_words +=',';
stop_words +=':';
stop_words +=';';
stop_words +='<';
stop_words +='>';
stop_words +='(';
stop_words +=')';
stop_words +='.';
stop_words +='/';
stop_words +='[';
stop_words +=']';
stop_words +='{';
stop_words +='}';
stop_words +='=';
stop_words +='``';
stop_words +="'";
stop_words +="''";
stop_words +='!';
stop_words +='$';
stop_words +='I';
stop_words +='p';
stop_words +='/p';
stop_words +='It';
stop_words +='%';
stop_words +='+';
stop_words +='Is';
stop_words +='--';
stop_words +='&';
stop_words +="'s";
stop_words +="How";
stop_words +="how";
with open('train.csv', encoding="utf8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:

        word_tokens = word_tokenize(row['Title'])
        filtered_sentence = [w for w in word_tokens if not w in stop_words]
        filtered_sentence = []
        for w in word_tokens:
            if w not in stop_words:
                filtered_sentence.append(w)
        c=Counter(filtered_sentence)

        word_tokens2 = word_tokenize(row['Body'])
        filtered_sentence2 = [w for w in word_tokens2 if not w in stop_words]
        filtered_sentence2 = []
        for w in word_tokens2:
            if w not in stop_words:
                filtered_sentence2.append(w)
        c2 = Counter(filtered_sentence2)
        print(c.most_common(5))
        print(c2.most_common(5))