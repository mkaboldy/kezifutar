const express = require('express');
const app = express();
const compression = require('compression');
const fs = require('fs');
const http = require('http');
const https = require('https');
const router = express.Router();
const bkk = require('./api/1.0/bkk')(router);
const path = require('path'); 
const bodyParser = require('body-parser');
const cors = require('cors');

if (typeof process.env.NODE_ENV === 'undefined') {
    console.error('1. Specify environment $env:NODE_ENV="your-env"');
    console.error('2. Create environment config file ./config/your-env.js');
    process.exit(1);
}

const configFile = __dirname + '/config/' + process.env.NODE_ENV + '.js';

if (!fs.existsSync(configFile)) {
    console.error('Missing config file ' + configFile);
}

const config = require(configFile);

app.use(compression());
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/angular10/dist/angular10/`)); // Provide static directory for frontend

app.use('/api/1.0/bkk',bkk);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/angular10/dist/angular10/index.html'));
});

const httpServer = http.createServer(app);

const http_port = config.http_port;
const http_host = config.http_host;

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

if (config.ssl_key && config.ssl_cert && config.https_host && config.https_port) {
    const privateKey  = fs.readFileSync(config.ssl_key, 'utf8');
    const certificate = fs.readFileSync(config.ssl_cert, 'utf8');
    const credentials = {key: privateKey, cert: certificate};

    const httpsServer = https.createServer(credentials, app);
    console.log("starting server https://" + config.https_host + ":" + config.https_port);
    httpsServer.listen(config.https_port, config.https_host);
} else {
    if (http_host) {
        console.log("starting server http://" + http_host + ":" + http_port);
        httpServer.listen(http_port, http_host);
    } else {
        console.log("starting server http://localhost:" + http_port);
        httpServer.listen(http_port);
    }    
}

