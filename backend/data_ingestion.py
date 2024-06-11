import os
import requests
import json
from dotenv import load_dotenv
load_dotenv()
from data_processing import process_data
import bs4
from langchain_community.document_loaders import TextLoader


def load_data(url_collection):
    documents = []
    for obj in url_collection:
        url = obj['link']
        response = requests.get(url)
        soup = bs4.BeautifulSoup(response.text, 'html.parser')
        doc = soup.get_text()

        if obj['title'] == 'User-Reference':
            f = open("output.txt", "w")
            f.write(doc)
            f.close()
            loader = TextLoader('output.txt')
            text_document = loader.load()
            os.remove("output.txt")
            documents.append({
                "title": obj['title'],
                "content": text_document
            })
            continue

        content_div = soup.find_all(class_='answercell')
        content = ' '.join([div.get_text().replace('\n',"").replace('                    ', "\n") for div in content_div])
        f = open("output.txt", "w")
        f.write(content)
        f.close()
        loader = TextLoader('output.txt')
        text_document = loader.load()
        os.remove("output.txt")
        documents.append({
            "title": obj['title'],
            "content": text_document
        })
    return documents



if __name__ == "__main__":
    tmp = load_data([{"link":"https://python.langchain.com/v0.1/docs/use_cases/question_answering/local_retrieval_qa/","title":"User-Reference"}])
    print("Stage one done successfully ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n")
    print(tmp)
    db = process_data(tmp)
    result = db.similarity_search("setuptools")
    print("Stage two done successfully ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n")
    print(result)