
# kezifutar

(M)EAN app to implement a handheld departure board for BKK stops.

WIP

## dev config

### prerequisites

- install git <https://tortoisegit.org/download/>
- install nodejs <https://nodejs.org/en/download/>

### clone and build the server

```POWERSHELL
your-folder> git checkout https://github.com/mkaboldy/kezifutar.git
your-folder> npm update
```

### configure your local environment

define an enviromnet var:

```POWERSHELL
your-folder/config> $env:NODE_ENV="your-env"
```

create a config file based on your-folder/config/example.js

```POWERSHELL
vi your-folder/config/your-env.js
```

add this content:

```JSON
module.exports = {
    http_host   : "192.168.0.x",    // your local IP
    http_port   : 8080,             // your port
    https_host  : "192.168.0.x",    // your local IP
    https_port  : 8443,             // your porty
    ssl_cert    : "path-to-your-ssl-cert",
    ssl_key     : "path-to-your-ssl-key"
}
```

### run the server with the compiled client

```POWERSHELL
your-folder> npm install -g nodemon
your-folder> nodemon index.js
```

open your browser <https://your-IP:your-port>

### build and run the Angular client only

```POWERSHELL
your-folder/angular> npm update
your-folder/angular> ng serve --o --host your-ip --ssl
```

## more doc

<https://bkkfutar.docs.apiary.io/#>
