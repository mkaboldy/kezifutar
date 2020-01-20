# kezifutar

(M)EAN app to implement a handheld departure board for BKK stops.

WIP

## dev config

### prerequisites

- install git <https://tortoisegit.org/download/>
- install nodejs <https://nodejs.org/en/download/>

### clone and build the server

```bash
your-folder> git clone https://github.com/mkaboldy/kezifutar.git
your-folder/kezifutar> npm update
```

### configure your local environment

define an enviromnet var:

```bash
your-folder/kezifutar> $env:NODE_ENV="your-env"
```

create a config file based on your-folder/config/example.js

```bash
vi your-folder/kezifutar/config/your-env.js
```

### run the server with the compiled client

```bash
your-folder/kezifutar> npm install -g nodemon
your-folder/kezifutar> nodemon index.js
```

open your browser <https://your-IP:your-port>

### build and run the Angular client only

```bash
your-folder/kezifutar/angular> npm update
your-folder/kezifutar/angular> ng serve --host your-ip --ssl
```

open your browser <https://your-IP:4200>

## more doc

<https://bkkfutar.docs.apiary.io/#>
