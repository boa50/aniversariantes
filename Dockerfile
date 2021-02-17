FROM node:15.8

COPY . .
RUN npm install -g gatsby-cli

EXPOSE 8000
EXPOSE 9000