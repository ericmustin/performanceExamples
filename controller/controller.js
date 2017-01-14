var Tuple = require('../db/model.js');
var request = require('request');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

var controller = {};

//sends necessary user data back to client side as an array of objects
controller.getValueWithoutCache = function(req,res) {
  console.log('hi request body without cache is', req.body)
  Tuple.find({key: req.body.key, value: '2' }).exec( function(err,result) {
    if (err) {
      console.log('mongodb return an error')
      res.send(400,{data:'hello world'})
    } else {
      newResult = result.map( function(object) {
        var randomOperation = object.value + '4523452345'
        var anotherRandomOperation = randomOperation.split("").reverse().join("").split("").reverse().join("").split("").reverse().join("").split("").reverse().join("").length > 5
        return anotherRandomOperation
      })
      newestResult = newResult.length > 10
      res.send(200,{data: newestResult})
    }
  })
};

controller.getValueWithCache = function(req,res) {
  console.log('hi request body is with cache:',req.body)
  redis.get("key"+req.body.key,function(err,reply) {
    if (err) {
      console.log('redis is broke', err)
      res.send(400,{data: 'hello world'})
    } else if (reply) {
      console.log('CACHED!')
      res.send(200,{data: reply })
    } else {
      Tuple.find({key: req.body.key, value: '2' }).exec( function(err,result) {
        if (err) {
          console.log('mongodb return an error')
          res.send(400,{data:'hello world'})
        } else {
          newResult = result.map( function(object) {
            var randomOperation = object.value + '4523452345'
            var anotherRandomOperation = randomOperation.split("").reverse().join("").split("").reverse().join("").split("").reverse().join("").split("").reverse().join("").length > 5
            return anotherRandomOperation
          })
          newestResult = newResult.length > 10
          redis.set("key"+req.body.key, newestResult, function() {
            console.log('NOT CACHED YET BUT WE JUST CACHED')
            res.send(200,{data: newestResult})
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
