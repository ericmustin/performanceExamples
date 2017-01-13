var db = require('./config.js');

var mongoose = require('mongoose');

//some properties here aren't used in production at the moment such as pressure
var nameSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String
} );

var Name = mongoose.model('Name', nameSchema);

module.exports = Name;
