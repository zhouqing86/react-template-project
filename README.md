React app template
=============================


## Development

### Technical stack

- Node.js

#### Application related library

- react

- react-router

- formik

- yup

- axios

#### Build tool

- yarn

#### Suggested IDEA

- VSCode

### Local environment

- Run `yarn` to download all dependencies into node_modules directory

- Run `yarn test` to run all unit tests, `yarn lint` to static check the code

- Run `yarn mockServer` to start local mock api server with [http://localhost:4010](http://localhost:4010)

- Run `yarn start` to start local environment and can be visited with [http://localhost:3010](http://localhost:3010)

### Build

- Run `yarn version` to change the version that will be built

- Run `yarn build` to build static files for `production` environment into `build` directory, can start a server with `yarn serve` and then visit [http://localhost:5010](http://localhost:5010)

- Run `yarn build:dev` to build static files for `development` environment into `build` directory, can start a server with `yarn serve` and then visit [http://localhost:5010](http://localhost:5010)

## Deployment

### Deployment with one command

- Install docker in your local machine, refer to [Get Docker](https://docs.docker.com/get-docker/).

- Make sure your private key to login the remote machine is located at `~/.ssh`

- Make sure the remote server is using *nix system

- Check current version in dev/prod environment with `http://[host:port]/version`

- Pull docker images that support ansible:

  ```
  docker pull wendll/node_ansible_container:latest
  ```

  > If you don't want to pull image from docker hub, you can build the container by yourself: `docker build -t wendll/node_ansible_container .`

- Run docker locally with:

  ```
  docker-compose run deploy 
  ```

  In docker container interactive shell console, run `./deploy/to-dev.sh --key [your private key name]`

  > Notice: private key name default is `id_rsa`, can override it with `--key`

  Or you can just run followed command example to do the deployment:

  ```
  docker-compose run deploy ./deploy/to-[env].sh [version] --key [your private key name] [--copyFromLocal] [--freshBuild] ....
  ```

#### To DEV environment 

- Check application version before newly deployment [http://dev_host:5000/version](http://dev_host:5000/version)

- After login docker, can run followed commands to do the deployment

  ```
  ./deploy/to-dev.sh 0.1.7 --copyFromLocal --freshBuild
  ```

  > `--copyFromLocal` will copy package (build with `yarn build:dev` in local development machine) from local to remote server

You can also just run one command to execute the deployment in your local machine:

```
docker-compose run deploy ./deploy/to-dev.sh 0.1.7 --copyFromLocal --freshBuild
```

- Check application version after newly deployment [http://dev_host:5000/version](http://dev_host:5000/version)
