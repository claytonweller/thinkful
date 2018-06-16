function minusLastItem(array) {
    return array.filter(item => array.indexOf(item) !== array.length-1)
  }
  
  function copyFirstHalf(array) {
    return array.filter(item => array.indexOf(item) < (array.length-1)/2)
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
    const list = [
      'red bull',
      'monster',
      'amp',
      'rockstar',
      'full throttle',
      'kickstart',
    ];
    const result1 = ['red bull', 'monster', 'amp', 'rockstar', 'full throttle'];
    const result2 = ['red bull', 'monster', 'amp'];
    const list2 = ['lions', 'tigers', 'bears'];
    const result3 = ['lions'];
    
    const testResults = [
      testFunctionWorks(minusLastItem, list, result1),
      testFunctionWorks(copyFirstHalf, list, result2),
      testFunctionWorks(copyFirstHalf, list2, result3)
    ];
  
    const numPassing = testResults.filter(function(result) {
      return result;
    }).length;
    console.log(numPassing + ' out of ' + testResults.length + ' tests passing.');
  }
  
  runTests();