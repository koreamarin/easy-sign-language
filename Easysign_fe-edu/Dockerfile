FROM node:lts-alpine as builder

WORKDIR /front-edu

ENV PATH /front-edu/node_modules/.bin:$PATH

COPY package.json /front-edu/package.json
COPY . .

RUN npm install
RUN npm install typescript @types/node @types/react @types/react-dom @types/jest react-router-dom redux react-redux

CMD ["npm", "start"]

EXPOSE 8080