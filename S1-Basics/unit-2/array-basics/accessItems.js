function accessFirstItem(array) {
    return array[0]
  }
  
  function accessThirdItem(array) {
    return array[2]
  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  // tests
  
  function testFunctionWorks(fn, input, expected) {
    if (fn(input) === expected) {
      console.log(`SUCCESS: "${fn.name}" works on [${input}]`);
      return true;
    } else {
      console.log(
        `FAILURE: ${fn.name}([${input}]) should be ${expected} but was ${fn(
          input
        )}`
      );
      return false;
    }
  }
  
  function runTests() {
    var list = [1, 4, 9, 16, 25];
    var item1 = 1;
    var item2 = 9;
  
    var testResults = [
      testFunctionWorks(accessFirstItem, list, item1),
      testFunctionWorks(accessThirdItem, list, item2),
    ];
  
    var numPassing = testResults.filter(function(result) {
      return result;
    }).length;
    console.log(numPassing + ' out of ' + testResults.length + ' tests passing.');
  }
  
  runTests();
  