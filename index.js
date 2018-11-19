const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
const router = express.Router();
const api = require('./api')(router);
const path = require('path'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/angular/dist/angular/')); // Provide static directory for frontend

app.use('/api',api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/angular/dist/angular/index.html'));
});

const httpServer = http.createServer(app);
httpServer.listen(config.http_port, config.http_host);

if (config.ssl_key && config.ssl_cert&& config.https_host && config.https_port) {
    const privateKey  = fs.readFileSync(config.ssl_key, 'utf8');
    const certificate = fs.readFileSync(config.ssl_cert, 'utf8');
    const credentials = {key: privateKey, cert: certificate};

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(config.https_port, config.https_host);
}

