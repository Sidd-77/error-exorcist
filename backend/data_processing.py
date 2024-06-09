from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
)

embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

def process_data(data):
    documents = []
    for doc in data:
        content = doc['content']
        chunks = text_splitter.split_documents(content)
        documents.extend(chunks)
    db = FAISS.from_documents(documents, embeddings)
    return db
