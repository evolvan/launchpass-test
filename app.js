const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const rp = require('request-promise');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/chatsticker-data', function(req, res) {
    var options = {
        method: 'GET',
        uri: 'https://chatsticker.com?apiKey=CbAT3TnhoE0FXAqv61hcSxNQrqlZHK0KKEAP9Vl1Yn329l6fVIftXVWKO0rIKuXPN8MdraQLb6aN4kFrMyR7CjE67PGPfZPz4830VgmxMRZbI5YxMRH8ZtW2Z9AbjhdI&term=dog',
        headers: {
            'content-type': 'application/json'
        }
    };
    rp(options).then(function (data) {
        //console.log("data", data);
        res.status(200).json({success: true, result: data});
    }).catch(function (err) {
        //console.log("err", err);
        res.status(500).json({success: false, result: err});
    });
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

var server = http.createServer(app);

server.listen(9001, function() {
    console.log("listen on port 9001");
})