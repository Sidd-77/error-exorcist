from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gemini import get_answer
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

class Gemini(BaseModel):
    query: str
    reference: str

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/gemini")
def get_gemini(gemini: Gemini):
    return get_answer(gemini.query)
