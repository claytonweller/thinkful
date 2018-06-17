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
    return fizzBuzzArray
}

const getElementArray = (fizzBuzzArray) =>{
    let elementArray = fizzBuzzArray.map(entry =>{
        if(entry === 'fizz'){
            return '<div class="fizz-buzz-item fizz"><span>fizz</span></div>'
        } else if ( entry === 'buzz' ) {
            return '<div class="fizz-buzz-item buzz"><span>buzz</span></div>'
        } else if ( entry === 'fizzbuzz' ) {
            return '<div class="fizz-buzz-item fizzbuzz"><span>fizzbuzz</span></div>'
        } else {
            return `<div class="fizz-buzz-item"><span>${entry}</span></div>`
        }
    })
    return elementArray
}

const reduceList = (list)=>{
    let output = ''
    list.forEach(element => {
        output = output+element
    });
    return output
}

const getList = (listLength) =>{
    let fizzBuzzArray = fizzBuzz(listLength)
    let elementArray = getElementArray(fizzBuzzArray)
    return reduceList(elementArray)
}

$(function() {
    $('button').click(function(event) {
        event.preventDefault()
        let listLength = $('input').val()
        let list = getList(listLength)
        $('.js-results').append(list);
    });
});