from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gemini import get_answer_gemini
from groq_ap import get_answer_groq
from local_llama import get_answer_local
from pydantic import BaseModel

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str
    reference: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/gemini")
def get_gemini(gemini: Query):
    return get_answer_gemini(gemini.query)

@app.post("/groq")
def get_groq(groq: Query):
    return get_answer_groq(groq.query)

@app.post("/local")
def get_local(local: Query):
    return get_answer_local(local.query)
