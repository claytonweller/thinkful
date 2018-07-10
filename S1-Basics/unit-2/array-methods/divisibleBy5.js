function divisibleBy5(array) {
    return array.find(item => item % 5 === 0)
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
    const input1 = [13, 22, 4, 47, 15, 35, 82];
    const result1 = 15;
    const input2 = [25, 20, 15, 10, 5];
    const result2 = 25;
  
    const testResults = [
      testFunctionWorks(divisibleBy5, input1, result1),
      testFunctionWorks(divisibleBy5, input2, result2),
    ];
  
    const numPassing = testResults.filter(function(result) {
      return result;
    }).length;
    console.log(numPassing + ' out of ' + testResults.length + ' tests passing.');
  }
  
  runTests();
  