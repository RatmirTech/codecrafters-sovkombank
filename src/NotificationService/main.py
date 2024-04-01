from asyncio import sleep
from fastapi import FastAPI, WebSocket, Depends, HTTPException, WebSocketDisconnect
from sqlalchemy.orm import Session
from models import Notification, SessionLocal
from pydantic import BaseModel, UUID4
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from schemas import NotificationSchema

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=['*'],
	allow_credentials=True,
	allow_methods=['*'],
	allow_headers=['*']
)

# Зависимость для работы с сессией БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic модели для запроса
class NotificationCreate(BaseModel):
    title: str
    description: str
    status: str
    user_id: UUID4
    is_read: bool = False

# Метод для добавления нового уведомления
@app.post("/notifications/")
async def create_notification(notification: NotificationCreate, db: Session = Depends(get_db)):
    db_notification = Notification(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

@app.get('/')
async def get_ping():
    return 'pong'

# Метод для получения уведомлений по userId
@app.get("/notifications/{user_id}", response_model=List[NotificationCreate])
async def read_notifications(user_id: UUID4, db: Session = Depends(get_db)):
    notifications = db.query(Notification).filter(Notification.user_id == user_id).all()
    return notifications

@app.put("/notifications/{notification_id}/read")
async def mark_notification_as_read(notification_id: UUID4, db: Session = Depends(get_db)):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if notification:
        notification.is_read = True
        db.commit()
        return {"message": "Notification marked as read", "notification_id": str(notification_id)}
    raise HTTPException(status_code=404, detail="Notification not found")

# WebSocket для отправки непрочитанных уведомлений
@app.websocket("/ws/notifications/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: UUID4, db: Session = Depends(get_db)):
    await websocket.accept()
    sent = []
    try:
        while True:
            notifications = db.query(Notification).filter(Notification.user_id == user_id, Notification.is_read == False).all()
            for notification in notifications:
                if notification not in sent:
                    notification_data = {
                    "id": str(notification.id),
                    "title": notification.title,
                    "description": notification.description,
                    "status": notification.status,
                    "user_id": str(notification.user_id),
                    "is_read": notification.is_read,
                    "datetime": notification.datetime.isoformat()
                    }
                    await websocket.send_json(notification_data)
                    sent.append(notification)
            await sleep(5)
    except WebSocketDisconnect:
        print(f"Client disconnected: {user_id}")
