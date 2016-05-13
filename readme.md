# AutoRenter - Angular 1 #

An Angular based implementation of the AutoRenter UI.

## Prerequisites ##

To use docker: 
Make sure docker and docker-compose are installed.

To use Vagrant:
Make sure to have  VirtualBox and Vagrant installed.

For now, the api must also be cloned for the UI to work properly.

## Development Environment Setup ##

To use docker: 
 `docker-compose build`
 `docker-compose up`

To use vagrant:
 `vagrant up`
 If you don't have the correct plugins installed, it will install them and then rerun the above command.

## Browse the App ##

If using docker:

After performing a build you should be able to run the application by browsing to `http://192.168.99.100:9000/`.


If using Vagrant:

After performing a build you should be able to run the application by browsing to `http://localhost:9000/`.

