FROM node:lts-alpine
WORKDIR /usr/src/app

RUN apk add curl

# copy the app, note .dockerignore
COPY ./app/ .
RUN npm install

RUN npm run build

# expose 3000 on container
EXPOSE 3000

# start the app
CMD [ "npm", "run", "start:prod" ]
