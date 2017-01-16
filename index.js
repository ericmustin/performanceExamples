var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var responseTime = require('response-time')

var controller = require('./controller/controller.js');


var app = express();
var router = express.Router();

var routes = function(app) {
  app.post('/cache', controller.getValueWithCache)
  app.post('/noCache', controller.getValueWithoutCache)
  app.post('/setTuple', controller.setTuple)
};

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(responseTime());


//Example of setting max age header on static files

//default is a max-age of 0
app.use(express.static(__dirname+'/client'));

//max age of 60 seconds
// app.use(express.static(__dirname+'/client', {maxAge: 60000 }));

app.use('/api', router);
routes(router);

app.set('port', (process.env.PORT || 3000) );

app.listen(app.get('port'), function() {
  console.log('server is running');
});

