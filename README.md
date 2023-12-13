Nova Environment Service
=========

## Getting started

### Requirements

- [Node / npm](https://nodejs.org/en/)
- [Docker desktop](https://docs.docker.com/get-docker/)

> Please make sure that you are running the most recent versions of Docker Desktop  that your operating system supports.

> For windows installation Docker requires WSL 2 (Windows Subsystem for Linux) for proper operation.
(If your WSL is not updated, Docker shows the prompt to update WSL with a link when you try to run it.)

### Configuration

For non-production environments, copying `.env.example` as `.env` is enough for setting up the environment variables. You can find a list of all the environment variables below :

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_PORT` | `3000` | the port number for API to listen to |
| `MONGODB_HOST` | `mongo` | the host name for MongoDB |
| `MONGODB_PORT` | `27017` | the port number for MongoDB |
| `MONGODB_DB` | `novaUploadService` | the database name for MongoDB |


### Running Dev Environment

The Nova Environment Service uses MongoDB as the database. To run all required services at once, we use Docker Compose. To run the dev environment, run the following command in the root directory of the project :

```bash
# install dependencies
npm install

# build & run Docker containers
docker-compose up
```

> If you are using Windows, please note that sometimes the line endings of files are changed to CRLF. This can cause problems with Docker Compose and you may get some errors while running `docker-compose up` command. To fix this, at least, you must convert the line endings of `docker.init.sh` to LF.

#### Managing Database

To access the database, you can use MongoDB Compass or any other MongoDB GUI. The default connection string is `mongodb://localhost:27017/novaUploadService` while Docker Compose services are running.

You can also use the mongo-express service included in the Docker Compose file. To access mongo-express, go to `http://localhost:8081` in your browser. The default username is `root` and the password is `example`.


## API Routes

[Routes List](./docs/apiRoutes.md)
