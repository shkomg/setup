setup.git
=========
Clone and run this on a new EC2 instance running Ubuntu 12.04.2 LTS to
configure both the machine and your individual development environment as
follows:

```sh
cd $HOME
sudo apt-get install -y git-core
git clone https://github.com/bitfundit/setup.git
./setup/setup.sh   
```
or for local setup (no phantom js and chromium added)
```sh
./setup/setup-local.sh
```

To create new Meteor JS app do previous + next:

```sh
cd $HOME
./setup/newapp.sh appname
cd appname
meteor
```

check if app is working at http://localhost:3000
