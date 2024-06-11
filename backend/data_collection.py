import os
import requests
import json
from dotenv import load_dotenv
load_dotenv()

from data_ingestion import load_data

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_community.chat_models import ChatOllama



prompt = ChatPromptTemplate.from_messages(
    [
        ("system","You are a helpful assistant which inputs a question or error from a user and outputs problem in 1 or 2 sentence or just extract the error message which can be used for querying on the internet. Return only the error message or problem statement."),
        ("user","User Input:{user_input}"),
    ]
)

def get_error_message_groq(user_input):
    llm = ChatGroq(model='llama3-8b-8192')
    output_parser = StrOutputParser()
    chain = prompt|llm|output_parser
    return chain.invoke({'user_input':user_input})


def get_error_message_gemini(user_input):
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest")
    output_parser = StrOutputParser()
    chain = prompt|llm|output_parser
    return chain.invoke({'user_input':user_input})

def get_error_message_ollama(user_input):
    llm = ChatOllama(model=os.getenv("LOCAL_LLAMA_MODEL"))
    output_parser = StrOutputParser()
    chain = prompt|llm|output_parser
    return chain.invoke({'user_input':user_input})


def get_results_stackoverflow(search_query:str):
    url = "https://google.serper.dev/search"
    payload = json.dumps({
        "q": search_query+" site:stackoverflow.com",
        "num": 5
    })
    headers = {
        'X-API-KEY': os.getenv("SERPER_API_KEY"),
        'Content-Type': 'application/json',

    }
    response = requests.request("POST", url, headers=headers, data=payload)
    tmp = response.json()['organic']

    return response.json()['organic']

