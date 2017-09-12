# EMP Browser

* [Trello Board](https://trello.com/b/WoAzNyra/)
* [Continuous Integration](https://app.shippable.com/github/svo/emp-browser/dashboard)

__NOTE:__ this project uses git submodules so you will want to clone recursively to have all expected behaviours.

```
git clone --recursive git@github.com:svo/emp-browser.git
```

## Development environment

Requirements:

1. [Ansible (2.2.2.0)](https://www.ansible.com/)
2. [Vagrant (1.9.3)](https://www.vagrantup.com/)
3. [VirtualBox (5.1.18 r114002)](https://www.virtualbox.org/)

To perform provisioning and start using the development environment run:

1. `vagrant up`
2. `vagrant ssh`
3. `cd /vagrant`

## Testing the application

To monitor tests as you edit the source code run the following from the `/vagrant` directory:

1. `yarn test`

To run tests and generate reports:

`./pre-commit.sh`

## Running the application

1. `vagrant up`
2. `vagrant ssh`
3. `cd /vagrant`
4. `yarn start`

Navigate to [vagrant-emp-browser.local:3000](http://vagrant-emp-browser.local:3000/) if you have `MDNS` support.

## Building the application

1. `vagrant up`
2. `vagrant ssh`
3. `cd /vagrant`
4. `yarn build`

## Local Continuous Integration

Navigate to [vagrant-emp-browser-ci.local:8080](http://vagrant-emp-browser-ci.local:8080) if you have `MDNS` support.

## Links

* [NodeJS](https://nodejs.org/)
* [React](https://facebook.github.io/react/)