FROM python:3.10

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8003

EXPOSE 8003

ENV DEBUG=production

CMD ["sh", "app_entrypoint.sh"]
