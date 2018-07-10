const textNormalizer = (text) =>{
    let trimmedText = text.trim()
    let lowerCase = trimmedText.toLowerCase()
    return lowerCase

}

console.log(textNormalizer('   This should WORK or maybe it won\'t...    '))