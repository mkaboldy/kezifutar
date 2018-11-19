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

### adjust config:

```
your-folder/config> vi default.json
```

(or specify own environment **$env:NODE_ENV="yourenv"** and build your own config, **yourenv.json** )

### run the server:

```
your-folder> npm install -g nodemon
your-folder> nodemon index.js
```

### clone and build the Angular client:

```
your-folder/angular> npm update
your-folder/angular> ng serve --host <your-ip> --ssl
open your browser https://<your-IP>:<your-port>
```

