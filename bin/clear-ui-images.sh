#!/bin/bash

# Stop and remove all ui-related containers and images. This is useful when
# containers and/or images are hosed and you need to start clean.

docker rm -f aur-ui;
docker rm -f aur-watch-ui;
docker rm -f aur-build-ui;

docker rmi aur-ui-image;
docker rmi aur-build-ui-image;
