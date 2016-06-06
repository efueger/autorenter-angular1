#!/bin/bash

# Build and run containers

UI_ID=$(docker ps -a --filter=name=aur-ui -q)
if [ -z $UI_ID ]
then
  echo '=> Building ui' && docker build -t aur-ui-image:latest .
  echo '=> Starting ui' && docker run -it -d -p 80:80  --link aur-api:aur-api --name aur-ui aur-ui-image
else
  echo '=> Found non-running ui container with id $UI_ID'
  echo '=> Restarting ui' && docker start $UI_ID
fi
