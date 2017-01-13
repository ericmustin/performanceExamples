var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var controller = require('./controller/controller.js');

var app = express();
// var router = express.Router();

// var routes = function(app) {
//   console.log('routing')
//   app.post('/name', controller.getName)
// };

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

app.use(express.static(__dirname+'/client'));
console.log(__dirname)

app.post('/api', controller.getName)

// app.use('/api', router);

// routes(router);

app.set('port', (process.env.PORT || 3000) );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(app.get('port'), function() {
  console.log('server is running');
});

