from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
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

with open('train.csv', encoding="utf8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:

        word_tokens = word_tokenize(row['Title'])
        filtered_sentence = [w for w in word_tokens if not w in stop_words]
        filtered_sentence = []
        for w in word_tokens:
            if w not in stop_words:
                filtered_sentence.append(w)

        word_tokens2 = word_tokenize(row['Body'])
        filtered_sentence2 = [w for w in word_tokens2 if not w in stop_words]
        filtered_sentence2 = []
        for w in word_tokens2:
            if w not in stop_words:
                filtered_sentence2.append(w)
        print(filtered_sentence)
        print(filtered_sentence2)