const isDivisable = (divisee, divisor) => {
    if (divisee%divisor === 0){
        return true
    } else {
        return false
    }
}

const testIsDivisable = () =>{
    let divisee = 13
    let divisor = 4
    let expected = false
    if (isDivisable(divisee, divisor) === expected){
      console.log('SUCCESS: `isDivisable` is working');
    } else {
      console.log('FAILURE: `isDivisable` is not working');
    }
}

testIsDivisable()