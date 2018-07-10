function makeStudentsReport(data) {
    let studentReports = [];
    data.forEach(student => {
        studentReports.push(`${student.name}: ${student.grade}`)
    })
    return studentReports
  }
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     Nothing to see here!
     
  */
  
  // tests
  
  function testIt() {
    const testData = [
      { name: 'Jane Doe', grade: 'A' },
      { name: 'John Dough', grade: 'B' },
      { name: 'Jill Do', grade: 'A' },
    ];
  
    const expectations = ['Jane Doe: A', 'John Dough: B', 'Jill Do: A'];
  
    const results = makeStudentsReport(testData);
  
    if (!(results && results instanceof Array)) {
      console.error('FAILURE: `makeStudentsReport` must return an array');
      return;
    }
    if (results.length !== testData.length) {
      console.error(
        'FAILURE: test data had length of ' +
          testData.length +
          ' but `makeStudentsReport` returned array of length ' +
          results.length
      );
      return;
    }
    for (let i = 0; i < expectations.length; i++) {
      let expect = expectations[i];
      if (
        !results.find(function(item) {
          return item === expect;
        })
      ) {
        console.error(
          'FAILURE: `makeStudentsReport` is not ' + 'producing expected strings'
        );
        return;
      }
    }
    console.log('SUCCESS: `makeStudentsReport` is working');
  }
  
  testIt();
  