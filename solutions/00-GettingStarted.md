# Getting Started

[Back to Exercises](../exercises/README.md) | [Example](../exercises/00-GettingStarted.md)

## Launching the development environment
Let's get things up and running!

```console
docker-compose up --build
```
<!-- Regular expression to remove timers from build output: s/[ ][ ]+[0-9]\.[0-9]s//g -->
```console
2021-bootcamp-gds % docker-compose up --build
Building frontend
[+] Building 1.4s (11/11) FINISHED
 => [internal] load build definition from Dockerfile
 => transferring dockerfile: 37B
 => [internal] load .dockerignore
 => transferring context: 34B
 => [internal] load metadata for docker.io/library/node:14
 => [internal] load build context
 => transferring context: 854B
 => [1/6] FROM docker.io/library/node:14@sha256:
 => [2/6] RUN mkdir -p /home/node/app && chown -R node /home/node/app
 => [3/6] WORKDIR /home/node/app
 => [4/6] COPY --chown=node package.json package-lock.json ./
 => [5/6] RUN npm install
 => [6/6] COPY --chown=node . .
 => exporting to image
 => exporting layers
 => writing image sha256:
 => naming to docker.io/library/2021-bootcamp-gds_frontend
Building backend
[+] Building 0.6s (12/12) FINISHED                                                                                                                                                                                
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 37B
 => [internal] load .dockerignore
 => => transferring context: 34B
 => [internal] load metadata for docker.io/library/node:14
 => [1/7] FROM docker.io/library/node:14
 => [internal] load build context
 => => transferring context: 323B
 => [2/7] RUN mkdir -p /home/node/app && chown -R node /home/node/app
 => [3/7] WORKDIR /home/node/app
 => [4/7] COPY --chown=node package.json package-lock.json ./
 => [5/7] RUN npm install
 => [6/7] COPY --chown=node . .
 => [7/7] RUN npm run build
 => exporting to image
 => exporting layers
 => writing image sha256:
 => naming to docker.io/library/2021-bootcamp-gds_backend
Starting 2021-bootcamp-gds_frontend_1 ... 
Starting 2021-bootcamp-gds_backend_1  ... done

Starting compilation in watch mode...
backend_1   | 
backend_1   | 
backend_1   | 3:49:29 AM - Found 0 errors. Watching for file changes.
frontend_1  | ℹ ｢wds｣: Project is running at http://localhost:3000/
frontend_1  | ℹ ｢wds｣: webpack output is served from 
frontend_1  | ℹ ｢wds｣: Content not from webpack is served from /home/node/app/public
frontend_1  | ℹ ｢wds｣: 404s will fallback to /
frontend_1  | Starting the development server...
frontend_1  | 
frontend_1  | Compiled successfully!
frontend_1  | 
frontend_1  | You can now view frontend in the browser.
frontend_1  | 
frontend_1  |   Local:            http://localhost:3000
frontend_1  | 
frontend_1  | Note that the development build is not optimized.
frontend_1  | To create a production build, use npm run build.
frontend_1  | 
```

If running docker compose in detached mode instead (`docker-compose up --build --detach`), viewing the logs of a container is simple:

```console
docker logs 2021-bootcamp-gds_frontend_1
```

```console
docker logs 2021-bootcamp-gds_backend_1
```

To tear down the environment:

```console
docker-compose down
```

```console
2021-bootcamp-gds % docker-compose down               
Stopping 2021-bootcamp-gds_backend_1  ... done
Stopping 2021-bootcamp-gds_frontend_1 ... done
Removing 2021-bootcamp-gds_backend_1  ... done
Removing 2021-bootcamp-gds_frontend_1 ... done
Removing network 2021-bootcamp-gds_default
```

---

[Back to Exercises](../exercises/README.md) | [Example](../exercises/00-GettingStarted.md)
