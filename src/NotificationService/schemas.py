from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class NotificationSchema(BaseModel):
    id: UUID
    title: str
    description: str
    status: str
    user_id: UUID
    is_read: bool
    datetime: datetime

    class Config:
        orm_mode = True