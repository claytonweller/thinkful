function firstFourItems(array) {
    return array.slice(0,4)
  }
  
  function lastThreeItems(array) {
    return array.slice(array.length-3, array.length)    

  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  // tests
  
  function testFunctionWorks(fn, input, expected) {
    const result = fn(input);
    if (
      result &&
      result.length === expected.length &&
      result.every(function(item) {
        return expected.indexOf(item) > -1;
      })
    ) {
      console.log('SUCCESS: `' + fn.name + '` works!');
      return true;
    } else {
      console.error('FAILURE: `' + fn.name + '` is not working');
      return false;
    }
  }
  
  function runTests() {
    const list = ['red bull', 'monster', 'amp', 'rockstar', 'full throttle'];
    const result1 = ['red bull', 'monster', 'amp', 'rockstar'];
    const result2 = ['amp', 'rockstar', 'full throttle'];
  
    const testResults = [
      testFunctionWorks(firstFourItems, list, result1),
      testFunctionWorks(lastThreeItems, list, result2),
    ];
  
    const numPassing = testResults.filter(function(result) {
      return result;
    }).length;
    console.log(numPassing + ' out of ' + testResults.length + ' tests passing.');
  }
  
  runTests();
  