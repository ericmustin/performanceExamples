var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
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

app.use(express.static(__dirname+'/client'));
console.log(__dirname)

app.use('/api', router);
routes(router);

app.set('port', (process.env.PORT || 3000) );

app.listen(app.get('port'), function() {
  console.log('server is running');
});

