from langchain_groq import ChatGroq
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from data_collection import get_error_message_groq, get_results_stackoverflow
from data_ingestion import load_data
from data_processing import process_data


prompt = ChatPromptTemplate.from_template("""
    Answer the following question using provided context and use you knowledge if context is insufficient. Don't say in the context, just answer the question in descriptive way.
    <context>
        {context}
    </context>
    Question: {input}
""")


def get_answer_groq_8b(input, reference=None):
    chatbot = ChatGroq(model='llama3-8b-8192')
    chain = create_stuff_documents_chain(chatbot, prompt)
    msg = get_error_message_groq(input)
    urls = get_results_stackoverflow(msg, reference)
    data = load_data(urls)
    db = process_data(data)
    retriver = db.as_retriever()
    retrievla_chain = create_retrieval_chain(retriver, chain)
    result = retrievla_chain.invoke({"input": input})
    return result['answer']

def get_answer_groq_70b(input, reference=None):
    chatbot = ChatGroq(model='llama3-70b-8192')
    chain = create_stuff_documents_chain(chatbot, prompt)
    msg = get_error_message_groq(input)
    urls = get_results_stackoverflow(msg, reference)
    data = load_data(urls)
    db = process_data(data)
    retriver = db.as_retriever()
    retrievla_chain = create_retrieval_chain(retriver, chain)
    result = retrievla_chain.invoke({"input": input})
    return result['answer']


if __name__ == "__main__":
    print(get_answer_groq_8b("Pip install dot env error code 1 windows 10"))