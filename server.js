var express = require('express');
var path = require('path');
var compression = require('compression');
var request = require('axios');
var utils = require('./modules/utils/content');
var jsonp = require('jsonp-express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
// var router = express.Router();
// app.use(router);
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // for parsing application/x-www-form-urlencoded

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

// app.use(jsonp);

app.post('/more-stories', function(req, res, next) {
    var data = JSON.parse(req.body.data);
    var language = req.body.language;
    res.json(utils.parseStories(data, language));
});

app.post('/translate-boinga', function(req, res, next) {
    var data = JSON.parse(req.body.data);
    res.json(utils.translatePageToBoinga(data))
});

// send all requests to index.html so browserHistory in React Router works
app.all('/', function (req, res, next) {
    if (req.method == 'GET') {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
        next();
    }
    else {
        res.status(403).send("Method is Forbidden");
    }
});

app.get('/get-stories/:language', function(req, res) {
    var language = req.params.language;
    var url = 'http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion2.js';
    request
        .get(
            url
        ).then(function(resp) {
        res.json(utils.parseStories(resp.data, language));
    }).catch(function(resp) {
        console.log(resp);
    })
});


var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
});