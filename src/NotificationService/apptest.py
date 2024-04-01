import httpx
import websockets
import asyncio
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Получение базового URL из .env файла или установка значения по умолчанию
BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8003")

# Данные для создания нового уведомления
notification_data = {
    "title": "Test dqdwdqdw qw dqwdqw",
    "description": "This is a test",
    "status": "New",
    "user_id": "658a0285-27ad-4cea-bbbe-eb0a02afa9e5",
    "is_read": False
}


async def test_create_notification():
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{BASE_URL}/notifications/", json=notification_data)
        print("Create Notification Response:", response.json())


async def test_get_notifications(user_id):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/notifications/{user_id}")
        print("Get Notifications Response:", response.json())


# async def test_websocket_notifications(user_id):
#     try:
#         async with websockets.connect(f"{BASE_URL.replace('http', 'ws')}/ws/notifications/{user_id}") as websocket:
#             greeting = await websocket.recv()
#             print(f"WebSocket Notification Received: {greeting}")
#     except websockets.exceptions.ConnectionClosedError as e:
#         print(f"Connection closed error: {e}")
#     except asyncio.exceptions.IncompleteReadError as e:
#         print(f"Incomplete read error: {e}")
#     except Exception as e:
#         print(f"Unexpected error: {e}")


async def main():
    # Тестирование создания нового уведомления
    await test_create_notification()

    # Тестирование получения уведомлений по user_id
    await test_get_notifications(notification_data["user_id"])

    # Тестирование получения уведомлений через WebSocket
    #await test_websocket_notifications(notification_data["user_id"])


# Запуск асинхронного основного цикла
if __name__ == "__main__":
    asyncio.run(main())
