#!/bin/bash

# Stop and remove containers

UI_ID=$(docker ps -a --filter=name=aur-ui -q)
if [ ! -z $UI_ID ]
then
  echo '=> Stopping ui' && docker kill aur-ui
  echo '=> Removing ui' && docker rm aur-ui
fi

# Build and run containers
source ./bin/build-server.sh
