const celsToFahr = (celsTemp) =>{
 return celsTemp * 9/5 + 32
}

const fahrToCels = (fahrTemp) =>{
    return (fahrTemp - 32) * 5/9
}

console.log( fahrToCels(39), celsToFahr(39))