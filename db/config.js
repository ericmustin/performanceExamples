var mongoose = require('mongoose');

mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/performanceExamples';
mongoose.connect(mongoURI, function(err, res) {
  if (err) {
    console.log('error connecting to: ' + mongoURI +'.' +err);
  } else {
    console.log('Mongodb connection open');
  }
});

var db = mongoose.connection;

module.exports = db;
