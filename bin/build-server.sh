#!/bin/bash

# Build and run containers

UI_BUILD_ID=$(docker ps -a --filter=name=aur-build-ui -q)
if [ -z $UI_BUILD_ID ]
then
  echo '=> Building ui build image' && docker build -t aur-build-ui-image:latest -f Dockerfile.build .
  echo '=> Starting ui build' && docker run -it -v $(pwd):/home/app --name aur-build-ui aur-build-ui-image
else
  echo '=> Found non-running ui build container with id $UI_BUILD_ID'
  echo '=> Restarting ui build' && docker start $UI_BUILD_ID
fi

UI_ID=$(docker ps -a --filter=name=aur-ui -q)
if [ -z $UI_ID ]
then
  echo '=> Building ui image' && docker build -t aur-ui-image:latest -f Dockerfile.run .
  echo '=> Starting ui' && docker run -d -p 80:80 -v $(pwd):/home/app --link aur-api:aur-api --name aur-ui aur-ui-image
else
  echo '=> Found non-running ui container with id $UI_ID'
  echo '=> Restarting ui' && docker start $UI_ID
fi

UI_WATCH_ID=$(docker ps -a --filter=name=aur-watch-ui -q)
if [ -z $UI_WATCH_ID ]
then
  echo '=> Starting ui watch' && docker run -it -v $(pwd):/home/app --name aur-watch-ui aur-build-ui-image npm run watch:dev
else
  echo '=> Found non-running ui watch container with id $UI_WATCH_ID'
  echo '=> Restarting ui watch' && docker start $UI_WATCH_ID
fi