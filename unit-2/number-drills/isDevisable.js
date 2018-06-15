const isDivisable = (divisee, divisor) => {
    if (divisee%divisor === 0){
        return true
    } else {
        return false
    }
}

console.log (isDivisable(13, 4), isDivisable(15,5))