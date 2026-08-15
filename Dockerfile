FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY src/ ./src/

RUN mkdir -p /app/uploads/images

EXPOSE 5000

CMD ["node", "src/server.js"]
