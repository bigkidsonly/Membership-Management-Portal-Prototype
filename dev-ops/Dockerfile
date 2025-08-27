FROM node:18-bullseye AS build

WORKDIR /app/web-app/frontend

COPY ./web-app/frontend/package.json .
COPY ./web-app/frontend/package-lock.json .

RUN npm install

COPY ./web-app/frontend .

RUN npm run build

FROM python:3.12-bullseye

WORKDIR /app

COPY ./web-app/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./web-app/backend /app/web-app/backend

WORKDIR /app/web-app/backend
COPY --from=build /app/web-app/frontend/dist/index.html ./assets
COPY --from=build /app/web-app/frontend/dist/assets ./assets

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "--timeout", "300", "-w", "5", "wsgi"]