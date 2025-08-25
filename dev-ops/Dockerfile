FROM python:3.12-bullseye

WORKDIR /app

COPY ./web-app/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /app/web-app
EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "--timeout", "300", "-w", "5", "wsgi"]