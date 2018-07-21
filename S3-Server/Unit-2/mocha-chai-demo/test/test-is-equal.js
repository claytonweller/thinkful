// import isEqual.js
const isEqual = require('../isEqual');
const { expect } = require('chai')

// "describe" is used to declare the entity to be tested, and a callback function that sets up the tests
describe('isEqual', function() {
    // indicate the behavior to be tested
    // typically the "it" statement will also include a callback that provides the test
    it('should give right answers for equal and unequal inputs', function(){
      expect(isEqual(1,1)).to.be.true
    });
  }
);