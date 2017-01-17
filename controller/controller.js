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
      res.send(200, {data: informationForClient, wasCached: false})
    }
  })
};

controller.getValueWithCache = function(req,res) {
  var key = req.body.key

  //Checks Redis for key before checking database
  redis.get("key"+key, function(err,reply) {
    if (err) {
      res.send(400, 'error')
    } else if (reply) {

      //The key exists in redis
      res.send(200, {data: reply, wasCached: true})
    } else {
      //The key doesn't exist so we hit the database
      Tuple.find( {key: key} ).exec( function(err,result) {
        if (err) {
          res.send(400, 'error')
        } else {

          //Do lots of complicated math and stuff once
          var informationForClient = expensiveOperation(result)

          //Set the key/value pair in redis so that it's available going forward
          redis.set("key"+key, informationForClient, function() {
            //30 second expiry
            redis.expire("key"+key, 30)
            res.send(200, {data:informationForClient, wasCached: false })
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
