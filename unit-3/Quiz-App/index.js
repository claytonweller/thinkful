const seriesList = require( "./seriesList.js" )
const questionList = require( './questionList.js')

const removeDuplicates = (array) =>{
    let uniqueArray = []
    array.forEach(entry =>{
        if(uniqueArray.includes(entry) === false){
            uniqueArray = uniqueArray.concat(entry)
        }
    })
    return uniqueArray
}

const genreFilter = (genreArray) =>{
    let filteredArray = []
    genreArray.forEach(genre => {
        let seriesInGenre = seriesList.filter(series => series.genres.includes(genre))
        filteredArray = filteredArray.concat(seriesInGenre)
    })
    
    filteredArray = removeDuplicates(filteredArray)

    return filteredArray
}

let genre = genreFilter(['documentary'])
console.log(genre.length)