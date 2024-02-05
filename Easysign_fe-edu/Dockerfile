FROM node:lts-alpine as builder

WORKDIR /front-edu

ENV PATH /front-edu/node_modules/.bin:$PATH

#COPY package.json /front-edu/package.json
COPY . .

RUN npm install
RUN npm install react-scripts@3.0.1 -g

CMD ["npm", "start"]

EXPOSE 8080