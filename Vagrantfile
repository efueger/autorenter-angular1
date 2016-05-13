# -*- mode: ruby -*-
# vi: set ft=ruby :

# Specify Vagrant version and Vagrant API version
Vagrant.require_version ">= 1.6.0"
VAGRANTFILE_API_VERSION = "2"

# Install dependency vagrant-vbguest
unless Vagrant.has_plugin?("vagrant-vbguest")
  system("vagrant plugin install vagrant-vbguest")
  puts "Dependencies install, please try the command again."
  exit
end

# Create and configure the Docker container(s)
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "docker-host"
  config.vm.network(:forwarded_port, guest: 3000, host: 3000)
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
  end
  # Only run the provisioning on the first 'vagrant up'
   if Dir.glob("#{File.dirname(__FILE__)}/.vagrant/machines/default/*/id").empty?
     # Install Docker
     pkg_cmd = 
       "apt-get update -qq; apt-get install -y curl python-pip;" \
       "curl -fsSL https://get.docker.io/gpg | apt-key add -;" \
       "curl -fsSL https://get.docker.com/ | sh;" \
       "pip install docker-compose;" \
       "service docker restart;"
     # Add vagrant user to the docker group
     pkg_cmd << "usermod -aG docker ${USER}"
     config.vm.provision :shell, :inline => pkg_cmd
   end
  #config.vm.provision :shell, inline: "apt-get update"
  config.vm.provision :shell, inline: "docker-compose -f /vagrant/docker-compose.yml up -d;", run: "always"
end
