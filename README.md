# kezifutar
(M)EAN app to implement a handheld departure board for BKK stops.

WIP

## dev config:

### prerequisites:

install git https://tortoisegit.org/download/
install nodejs https://nodejs.org/en/download/

### clone and build the server:

```
your-folder> git checkout https://github.com/mkaboldy/kezifutar.git
your-folder> npm update
```

### configure your local environment:

- define an enviromnet var:

```
your-folder/config> $env:NODE_ENV="your-env"
```

- create a config file based on your-folder/config/example.js 

```
vi your-folder/config/your-env.js
```

### run the server with the compiled client:

```
your-folder> npm install -g nodemon
your-folder> nodemon index.js
```
open your browser https://<your-IP>:<your-port>

### build and run the Angular client only:

```
your-folder/angular> npm update
your-folder/angular> ng serve --host <your-ip> --ssl
```
open your browser https://<your-IP>:4200

