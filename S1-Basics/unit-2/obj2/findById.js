// you can pass in `scratchData` to test out `findByid`
// your function
const scratchData = [
    { id: 22, foo: 'bar' },
    { id: 28, foo: 'bizz' },
    { id: 19, foo: 'bazz' },
  ];
  
  function findById(items, idNum) {
    let foundItem ={};
    items.forEach(item =>{
        if(item.id === idNum){
            foundItem = item
        }
    })
    return foundItem
  }
  
  //
  
  function testIt() {
    const testData = [
      { id: 1, foo: 'bar' },
      { id: 2, foo: 'bizz' },
      { id: 3, bang: 'boo' },
    ];
    const result = findById(testData, 3);
    if (!(result && result !== null && typeof result === 'object')) {
      console.error('`findById` must return an object');
      return;
    }
    if (result.id !== 3) {
      console.error(
        'Asked for item with id of `3` but got back one with id of ' + result.id
      );
      return;
    }
    if (result.bang !== 'boo') {
      console.error(
        'Expected all key/value pairs from target object to be returned'
      );
      return;
    }
    console.log('SUCCESS: `findByid` is working');
  }
  
  testIt();
  