var Name = require('../db/model.js');
var request = require('request');

var controller = {};

//sends necessary user data back to client side as an array of objects
controller.getName = function(req,res) {
  console.log('hi',req)
  res.send(200,'hello world')
  // Name.find({firstName: req.body.firstName}).exec( function(err,name) {
  //   if(err) {
  //     console.log('we had an error retrieving stats');
  //     res.send(404, err);
  //   } else {
  //     //console.log("The data we retrieved looks like: ", found);
  //     res.send(200, name);
  //   }
  // });
};

module.exports = controller;
