function updateObject(obj) {
    obj.foo = 'foo'
    obj.bar = 'bar'
    obj.bizz = 'bizz'
    obj.bang = 'bang'
    return obj

  }
  
  
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  (function testUpdateObject() {
    var oldObj = {
      cats: 'cats',
      dogs: 'dogs',
    };
    var newObj = updateObject(oldObj);
    if (typeof newObj !== 'object') { 
      console.error('ERROR: `createMyObject` must return an object');
      return false
    }
    ['foo', 'bar', 'bizz', 'bang'].forEach(function(key) {
      if (!(key in newObj)) {
        console.error('ERROR: `' + key + '` not in object returned by `updateObject`');
        return false;
      }
    });
    ['foo', 'bar', 'bizz', 'bang'].forEach(function(key) {
      if (newObj[key] !== key) {
        console.error('ERROR: `' + key + '` should be "' + key + '" but was ' + newObj[key]);
        return false;
      }
    });
    if (!(newObj.cats === 'cats' && newObj.dogs === 'dogs')) {
      console.error('ERROR: your function doesn\'t preserve existing key/value pairs');
      return false;
    }
    console.log('SUCCESS: `updateObject` works correctly!');
    
  })();