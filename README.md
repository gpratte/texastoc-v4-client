# texastoc-v4-client

Version 4 will

* refactor the [texastoc-v3-client](https://github.com/gpratte/texastoc-v3-client) react/redux client to
  make use of the new [texastoc-v4-integration-testing](https://github.com/gpratte/texastoc-v4-integration-testing)
  backend APIs
* dockerize the application

# Profiles, Building and Running
The urls for the client and server are defined as environment variables

For running locally they are defined in a `.env` file (that is not under source control)
```
REACT_APP_CLIENT_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://localhost:8080
```
When running in a docker container these variables are defined in the docker-compose.yml file
which will be shown in the Docker section.

### Run from the command line
Run the client locally by running
* `npm start`

#### Docker

The client can be run a container alongside the server running in another container.

See the server readme to know more about how the server is dockerized.
https://github.com/gpratte/texastoc-v4-integration-testing#readme

This example continues using the server running with an in-memory H2 database.

Build the client Docker image

```
docker build -t texastoc-v4-ui-image .
```

A snippet of how the image looks

```
REPOSITORY                TAG
texastoc-v4-ui-image      latest
```

You will set the environment in the docker-compose file. Here's the
enviroment variables being set in the `docker-compose-h2.yml` file

```
client:
  ...
  environment:
    - REACT_APP_CLIENT_URL=http://localhost:3000
    - REACT_APP_SERVER_URL=http://localhost:8080
  ...
```

Bring up the containers `docker compose -f docker-compose-h2.yml up`

## Current Branch: 05-dockerize
Moved the deployment from building a war which was deployed to tomcat to 
run as a Docker container in node.js
