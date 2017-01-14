var db = require('./config.js');

var mongoose = require('mongoose');

//attributes
var tupleSchema = new mongoose.Schema( {
  key: String,
  value: String
} );

var Tuple = mongoose.model('Tuple', tupleSchema);

module.exports = Tuple;
