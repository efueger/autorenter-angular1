# TODO: Switch to an offical alpine-node when one is made or create our own Fusion alpine image
FROM ubuntu:16.04

MAINTAINER Fusion Alliance <code@fusionalliance.com>

ENV NODE_VERSION=6.2.1
ENV DEBUG=ui
ENV HOME=/home/ui

RUN mkdir -p $HOME
WORKDIR $HOME


RUN apt-get update \
  && apt-get install build-essential -y curl \
  && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
  && apt-get install -y nodejs \
  && apt-get install -y nginx \
  && npm install -g node-sass sass-loader

COPY package.json $HOME/package.json

RUN npm install

COPY . $HOME/

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.conf /etc/nginx/conf.d/defult.conf

RUN npm run build; mkdir -p /usr/share/nginx/html; cp -R dist/app/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
