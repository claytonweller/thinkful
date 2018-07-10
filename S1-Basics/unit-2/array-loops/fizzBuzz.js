function fizzBuzz(countTo) {
    let i = 1
    let fizzBuzzArray = [];
    while (i<=countTo){
        let value;
        if (i % 3 === 0 && i % 5 === 0){
            value = 'fizzbuzz'
        } else if ( i % 3 === 0) {
            value = 'fizz'
        } else if ( i % 5 === 0) {
            value = 'buzz'
        } else {
            value = i
        }
        fizzBuzzArray.push(value)
        i++
    }
    console.log(fizzBuzzArray)
    return fizzBuzzArray

  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  // tests
  (function testFizzBuzz() {
    // we'll use the variables in our test cases
    const countTo = 16;
    const expected = [
      1,
      2,
      'fizz',
      4,
      'buzz',
      'fizz',
      7,
      8,
      'fizz',
      'buzz',
      11,
      'fizz',
      13,
      14,
      'fizzbuzz',
      16,
    ];
  
    const actual = fizzBuzz(countTo) || [];
  
    if (
      expected.length === actual.length &&
      expected.every(function(item, index) {
        return actual[index] === item;
      })
    ) {
      console.log('SUCCESS: fizzBuzz is working');
    } else {
      console.log('FAILURE: fizzBuzz is not working');
    }
  })();
  