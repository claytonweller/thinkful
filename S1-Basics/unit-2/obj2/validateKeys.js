// running the function with `objectA` and `expectedKeys`
// should return `true`
const objectA = {
    id: 2,
    name: 'Jane Doe',
    age: 34,
    city: 'Chicago',
  };
  
  // running the function with `objectB` and `expectedKeys`
  // should return `false`
  const objectB = {
    id: 3,
    age: 33,
    city: 'Peoria',
  };
  
  const expectedKeys = ['id', 'name', 'age', 'city'];
  
function validateKeys(object, expectedKeys) {

    if (Object.keys(object).length != expectedKeys.length) {
        return false
    } else {
        let validated = true;    
        expectedKeys.forEach(expectedKey => {
            // I was having failures... all because I forgot to do '==='... ugh.
            if (object[expectedKey] === undefined){
                
                validated = false
            } 
        })
        return validated
    }  
}
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  function testIt() {
    const objectA = {
      id: 2,
      name: 'Jane Doe',
      age: 34,
      city: 'Chicago',
    };
  
    const objectB = {
      id: 3,
      age: 33,
      city: 'Peoria',
    };
  
    const objectC = {
      id: 9,
      name: 'Billy Bear',
      age: 62,
      city: 'Milwaukee',
      status: 'paused',
    };
  
    const objectD = {
      foo: 2,
      bar: 'Jane Doe',
      bizz: 34,
      bang: 'Chicago',
    };
  
    const expectedKeys = ['id', 'name', 'age', 'city'];
  
    if (typeof validateKeys(objectA, expectedKeys) !== 'boolean') {
      console.error('FAILURE: validateKeys should return a boolean value');
      return;
    }
  
    if (!validateKeys(objectA, expectedKeys)) {
      console.error(
        `FAILURE: running validateKeys with the following object and keys
        should return true but returned false:
        Object: ${JSON.stringify(objectA)}
        Expected keys: ${expectedKeys}`
      );
      return;
    }
  
    if (validateKeys(objectB, expectedKeys)) {
      console.error(
        `FAILURE: running validateKeys with the following object and keys
        should return false but returned true:
        Object: ${JSON.stringify(objectB)}
        Expected keys: ${expectedKeys}`
      );
      return;
    }
  
    if (validateKeys(objectC, expectedKeys)) {
      console.error(
        `FAILURE: running validateKeys with the following object and keys
        should return false but returned true:
        Object: ${JSON.stringify(objectC)}
        Expected keys: ${expectedKeys}`
      );
      return;
    }
  
    if (validateKeys(objectD, expectedKeys)) {
      console.error(
        `FAILURE: running validateKeys with the following object and keys
        should return false but returned true:
        Object: ${JSON.stringify(objectD)}
        Expected keys: ${expectedKeys}`
      );
      return;
    }
  
    console.log('SUCCESS: validateKeys is working');
  }
  
  testIt();
  