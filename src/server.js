let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let https = require('https');
let http = require('http');
let fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let privateKey  = fs.readFileSync('/etc/ssl/vegabot-certs/server.key', 'utf8');
let certificate = fs.readFileSync('/etc/ssl/vegabot-certs/vegabot_opusconsulting_com.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};


let router = require('./router.js')(app);

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(8082);
httpsServer.listen(443);