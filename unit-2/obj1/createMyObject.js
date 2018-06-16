function createMyObject() {
    return {
        foo: 'bar',
        answerToUniverse: 42,
        'olly olly': 'oxen free',
        sayHello: () => 'hello'
    }
  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  (function testCreateMyObject() {
    var obj = createMyObject();
    if (typeof obj !== 'object') {
      console.error('ERROR: `createMyObject` must return an object');
      return false;
    }
    var expectedKeys = ['foo', 'answerToUniverse', 'olly olly', 'sayHello'];
    expectedKeys.forEach(function(key) {
      if (!(key in obj)) {
        console.error('ERROR: Missing a key for ' + key);
        return false;
      }
    });
    if (obj.foo !== 'bar') {
      console.error("ERROR: Value for `foo` should be 'bar' but was " + obj.foo);
      return false;
    }
    if (obj.answerToUniverse !== 42) {
      console.error(
        'ERROR: Value for `answerToUniverse` should be 42 but was ' +
          obj.answerToUniverse
      );
      return false;
    }
    if (obj['olly olly'] !== 'oxen free') {
      console.error(
        "ERROR: Value for `'olly olly'` should be 'oxen free' but was " +
          obj['olly olly']
      );
      return false;
    }
    if (!(typeof obj.sayHello === 'function' && obj.sayHello() === 'hello')) {
      console.error(
        "ERROR: Value for `sayHello` must be a function that returns the string 'hello'"
      );
      return false;
    }
    console.log('SUCCESS: Your function works!');
  })();
  