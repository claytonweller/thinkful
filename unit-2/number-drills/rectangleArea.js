const computeArea = (width, height) =>{
    return width * height
}

const testComputeArea =() => {
    let width = 3;
    let height = 4;
    let expected = 12;
    if (computeArea(width, height) === expected) {
      console.log('SUCCESS: `computeArea` is working');
    } else {
      console.log('FAILURE: `computeArea` is not working');
    }
}

testComputeArea()