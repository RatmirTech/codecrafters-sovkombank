from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from g4f.client import Client
from g4f.client import AsyncClient 
import nest_asyncio
nest_asyncio.apply()

app = FastAPI()

class News(BaseModel):
    title: str
    description: str

class GPTResponse(BaseModel):
    score: int

async def get_gpt_score(news_item: News) -> int:
    message = f"{news_item.title}\n{news_item.description}\nОцени эту новость по 10 бальной шкале, учитывая все положительные и отрицательные факторы про курс валют. Напиши только итоговый балл без каких либо сообщений (только цифра от 1 до 10), насколько новость положительна для поднятия уровня курса валют в новости."
    
    client = AsyncClient()

    response = client.chat.completions.create_async(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}],
    )
    print(response.choices[0].message.content)
    return int(response.choices[0].message.content)

@app.post("/addnews", response_model=List[GPTResponse])
async def add_news(news_items: List[News]) -> List[GPTResponse]:
    scores = []
    print(news_items)
    for news_item in news_items:
        try:
            score = await get_gpt_score(news_item)
            scores.append(GPTResponse(score=score))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return scores
