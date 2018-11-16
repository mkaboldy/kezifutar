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

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/angular/dist/angular/')); // Provide static directory for frontend
// app.use('/authentication', authentication);
// app.use('/blogs', blogs);
app.use('/api',api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/angular/dist/angular/index.html'));
});

const privateKey  = fs.readFileSync(__dirname + '/sslcert/privateKey.key', 'utf8');
const certificate = fs.readFileSync(__dirname + '/sslcert/certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080,'192.168.0.14');
httpsServer.listen(8443,'192.168.0.14');
