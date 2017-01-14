var Tuple = require('../db/model.js');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');
var expensiveOperation = require('../lib/helperMethods.js')

var controller = {};

controller.getValueWithoutCache = function(req,res) {
  //Check database immediately
  Tuple.find({key: req.body.key, value: '2' }).exec( function(err,result) {
    if (err) {
      res.send(400, 'error')
    } else {
      //Do lots of complicated math and stuff
      var informationForClient = expensiveOperation(result)
      res.send(200, informationForClient)
    }
  })
};

controller.getValueWithCache = function(req,res) {
  //Checks Redis for key before checking database
  redis.get("key"+req.body.key,function(err,reply) {
    if (err) {
      res.send(400, 'error')
    } else if (reply) {

      //The key exists in redis
      res.send(200, reply )

    } else {
      //The key doesn't exist so we hit the database
      Tuple.find({key: req.body.key, value: '2' }).exec( function(err,result) {
        if (err) {
          res.send(400, 'error')
        } else {

          //Do lots of complicated math and stuff once
          var informationForClient = expensiveOperation(result)

          //Set the key/value pair in redis so that it's available going forward
          redis.set("key"+req.body.key, informationForClient, function() {
            res.send(200, informationForClient)
          });
        }
      })
    }
  });
};

controller.setTuple = function(req,res) {
  console.log('hi',req)
  var add = new Tuple({
    key: 1,
    value: 2
  });

  add.save(function(err,addition) {
    if(err) {
      console.log('error saving');
      res.send(400,err);
    } else {
      console.log('saved!')
      res.send(200,addition);
    }
  });
};

module.exports = controller;
