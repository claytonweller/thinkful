const sampleObj = {
    foo: 'foo',
    bar: 'bar',
    bizz: 'bizz',
    bang: 'bang',
  };
  
  function keyDeleter(obj) {
    delete obj.foo
    delete obj.bar
    return obj
  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  (function testKeyDeleter() {
    var obj = keyDeleter({
      foo: 'foo',
      bar: 'bar',
      bizz: 'bizz',
      bang: 'bang',
    });
  
    if (typeof obj !== 'object') {
      console.error('ERROR: `keyDeleter` must be return an object');
      return false;
    }
    ['foo', 'bar'].forEach(function(key) {
      if (key in obj) {
        console.error('`keyDeleter` did not delete the key for ' + key);
        return false;
      }
    });
    ['bizz', 'bang'].forEach(function(key) {
      if (!(key in obj && obj[key] === key)) {
        console.error('`keyDeleter` is deleting keys other than `foo` and `bar`');
        return false;
      }
    });
    console.log('SUCCESS: `keyDeleter` works correctly!');
  })();
  