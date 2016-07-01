#!/bin/bash

# Stop and remove containers

UI_ID=$(docker ps -a --filter=name=aur-ui -q)
if [ ! -z $UI_ID ]
then
  echo '=> Stopping ui' && docker kill aur-ui
  echo '=> Removing ui' && docker rm aur-ui
fi

UI_BUILD_ID=$(docker ps -a --filter=name=aur-build-ui -q)
if [ ! -z $UI_BUILD_ID ]
then
  echo '=> Stopping ui build' && docker kill aur-build-ui
  echo '=> Removing ui build' && docker rm aur-build-ui
fi

UI_WATCH_ID=$(docker ps -a --filter=name=aur-watch-ui -q)
if [ ! -z $UI_WATCH_ID ]
then
  echo '=> Stopping ui watch' && docker kill aur-watch-ui
  echo '=> Removing ui watch' && docker rm aur-watch-ui
fi

# Build and run containers
source ./bin/build-server.sh
