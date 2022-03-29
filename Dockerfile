FROM node:17

COPY . /app

WORKDIR /app

ENV CLIENT_ID=985dabfc6fd040be9cceb3d5d1f4ccc3
ENV CLIENT_SECRET=929e1272c32f423292d96020bf81232b
ENV REDIRECT_URI=http://localhost:3000/api/callback
ENV SECRET_KEY=DCB53B242F71952E8A9AE45559EDB

RUN npm install


WORKDIR /app/client

RUN npm install
RUN npm run build

WORKDIR /app



EXPOSE 3000

CMD ["npm", "start"]