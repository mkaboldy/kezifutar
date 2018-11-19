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

const privateKey  = fs.readFileSync(config.ssl_key, 'utf8');
const certificate = fs.readFileSync(config.ssl_cert, 'utf8');
const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(config.http_port, config.http_host);
httpsServer.listen(config.https_port, config.https_host);
