function shortWords(array) {
    return array.filter(item => item.length < 5)
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
    const input1 = ['cat', 'oblivion', 'dog', 'patriarchy', 'blue', 'house'];
    const result1 = ['cat', 'dog', 'blue'];
    const input2 = ['rainbow', 'the', 'big', 'broom'];
    const result2 = ['the', 'big'];
  
    const testResults = [
      testFunctionWorks(shortWords, input1, result1),
      testFunctionWorks(shortWords, input2, result2),
    ];
  
    const numPassing = testResults.filter(function(result) {
      return result;
    }).length;
    console.log(numPassing + ' out of ' + testResults.length + ' tests passing.');
  }
  
  runTests();
  