FROM node:15.8

COPY . .
RUN npm install -g gatsby-cli
RUN npm install

EXPOSE 8000
EXPOSE 9000