const { expect } = require('chai')
const fizzBuzzer = require('../fizzBuzzer')

describe('fizzBuzzer', function(){
  it('Should return numbers, fizz, buzz, or fizz-buzz', function(){
    const goodValues = [
      [1,1],
      [3,'fizz'],
      [20,'buzz'],
      [30,'fizz-buzz']
    ]
    goodValues.forEach(pair => {
      let returnValue = fizzBuzzer(pair[0])
      expect(returnValue).to.equal(pair[1])
    })
  })

  it('Should throw an error if the entry is not a number', function(){
    const badValues = [
      'Hot Dogs',
      '2',
      true,
      [2],
      {number:2},
      null,
      undefined
    ]
    badValues.forEach(value => {
      expect(()=>fizzBuzzer(value)).to.throw(Error)
    })
  })
})