var express = require('express');
var path = require('path');
var compression = require('compression');
var request = require('axios');
var utils = require('./modules/utils/content');

var app = express();
var router = express.Router();
app.use(router);
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

// send all requests to index.html so browserHistory in React Router works
router.all('/', function (req, res, next) {
    if (req.method == 'GET') {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
        next();
    }
    else {
        res.status(403).send("Method is Forbidden");
    }
});

router.get('/get-stories/:page/:language', function(req, res){
    var page = req.params.page;
    var language = req.params.language;
    var url = page == 1 ?
        'http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion2.js' :
        'http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion.js';
    request
        .get(
            url
        ).then(function(resp) {
            if (page == 1) {
                res.json(utils.parseStories(resp.data, language));
            }
            else {
                res.jsonp(utils.parseStories(resp.data, language));
            }
        }).catch(function(resp) {
            console.log(resp);
        })
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
});