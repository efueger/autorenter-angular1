# AutoRenter - Angular 1 #

An Angular based implementation of the AutoRenter UI.

## Prerequisites ##

For now, the api must also be cloned and running for the UI to work properly.

Must have Docker engine 1.10 or higher:

* Mac: https://docs.docker.com/mac/
* Windows: https://docs.docker.com/windows/
* Linux: https://docs.docker.com/linux/

## Development Environment Setup ##

Use a terminal - *must be the Docker Quickstart Terminal if on Windows or Mac* - to run the following commands from the project's root directory:

```
docker build -t aur-ui-image:latest .
docker run -it -p 80:80  --link aur-api:aur-api --name aur-ui aur-ui-image
```

## Browse the App ##

If using docker:

After performing a build and executing the run command you should be able to run the application by browsing to `http://192.168.99.100:80/`.
