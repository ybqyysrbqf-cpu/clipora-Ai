FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --omit=dev

COPY backend/ .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
