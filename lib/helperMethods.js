var expensiveOperation = function(array) {
  updatedArray = array.map( function(object) {
        var randomOperation = object.value + '4523452345'
        var anotherRandomOperation = randomOperation.split("").reverse().join("").split("").reverse().join("").split("").reverse().join("").split("").reverse().join("").length > 5
        return anotherRandomOperation
      });
  return updatedArray.length > 10
};

module.exports = expensiveOperation
