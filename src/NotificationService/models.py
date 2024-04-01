from sqlalchemy import create_engine, Column, String, Boolean, ForeignKey, func, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import uuid
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    is_read = Column(Boolean, default=False)
    datetime = Column(DateTime(timezone=True), server_default=func.now())

# Создание таблиц, если они не существуют
Base.metadata.create_all(engine)