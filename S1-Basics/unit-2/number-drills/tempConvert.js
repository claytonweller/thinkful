const celsToFahr = (celsTemp) =>{
 return celsTemp * 9/5 + 32
}

const fahrToCels = (fahrTemp) =>{
    return (fahrTemp - 32) * 5/9
}

const testFahrToCels =() => {
    let fahrTemp = 32;
    let expected = 0;
    if (fahrToCels(fahrTemp) === expected) {
      console.log('SUCCESS: `fahrToCels` is working');
    } else {
      console.log('FAILURE: `fahrToCels` is not working');
    }
}

const testCelsToFahr = () =>{
    let celsTemp = 5
    let expected = 41
    if (celsToFahr(celsTemp) === expected){
      console.log('SUCCESS: `celsToFahr` is working');
    } else {
      console.log('FAILURE: `celsToFahr` is not working');
    }
}

const testBothFunctions = () =>{
    testCelsToFahr()
    testFahrToCels()
}

testBothFunctions()