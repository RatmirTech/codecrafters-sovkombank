import os

DATABASE_HOST = os.getenv('DATABASE_HOST', 'localhost')
DATABASE_PORT = os.getenv('DATABASE_PORT', '5432')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'postgres')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', 'codecrafters')
DATABASE_DBNAME = os.getenv('DATABASE_DBNAME', 'predictions')
