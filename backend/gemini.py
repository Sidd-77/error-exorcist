from langchain_google_genai import GoogleGenerativeAI
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from data_collection import get_error_message_gemini, get_results_stackoverflow
from data_ingestion import load_data
from data_processing import process_data

chatbot = GoogleGenerativeAI(model="gemini-1.5-pro-latest")

prompt = ChatPromptTemplate.from_template("""
    Answer the following question using provided context.
    <context>
        {context}
    </context>
    Question: {input}
""")

chain = create_stuff_documents_chain(chatbot, prompt)

def get_answer_gemini(input, reference=None):
    msg = get_error_message_gemini(input)
    urls = get_results_stackoverflow(msg, reference)
    data = load_data(urls)
    db = process_data(data)
    retriver = db.as_retriever()
    retrievla_chain = create_retrieval_chain(retriver, chain)
    result = retrievla_chain.invoke({"input": input})
    return result['answer']


if __name__ == "__main__":
    print(get_answer_gemini("Pip install dot env error code 1 windows 10"))