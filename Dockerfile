FROM node:16-buster

ENV APP_PATH=app

COPY ./ ${APP_PATH}

WORKDIR ${APP_PATH}

RUN npm install

CMD ["./bin/run", "-n", "default"]
