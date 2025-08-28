FROM node:20-bullseye AS build

WORKDIR /app/web-app/frontend

COPY ./web-app/frontend/package.json .

# Clear npm cache and install dependencies without lock file
RUN npm cache clean --force

# Install dependencies fresh without package-lock to avoid platform issues
RUN npm install --no-package-lock --no-optional=false

COPY ./web-app/frontend .

# Try to install the missing rollup binary explicitly
RUN npm install @rollup/rollup-linux-x64-gnu --save-optional || echo "Fallback binary not available"

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