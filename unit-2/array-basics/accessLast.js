function findLength(array) {
    return array.length
  }
  
  function accessLastItem(array) {
    let lastIndex = findLength(array) - 1
    return array[lastIndex]
  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  // tests
  
  function testFunctionWorks(fn, input, expected) {
    if (fn(input) === expected) {
      console.log('SUCCESS: `' + fn.name + '` works on `[' + input + ']`');
      return true;
    } else {
      console.error(
        'FAILURE: `' +
          fn.name +
          '([' +
          input +
          '])` should be ' +
          expected +
          ' but was ' +
          fn(input)
      );
      return false;
    }
  }
  
  function runTests() {
    const list = [1, 4, 9, 16, 25];
    const originalList = [1, 4, 9, 16, 25];
    const length = 5;
    const lastItem = 25;
  
    const testResults = [
      testFunctionWorks(findLength, list, length),
      testFunctionWorks(accessLastItem, list, lastItem),
    ];
  
    const numPassing = testResults.filter(function(result) {
      return result;
    }).length;
    console.log(numPassing + ' out of ' + testResults.length + ' tests passing.');
  }
  
  runTests();
  