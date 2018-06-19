const seriesList = require('./seriesList.js')
const STORE = require('./STORE.js')

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

const sortResponses = (input) =>{
    let arrayFromResponses = Object.entries(input.responses)
    let definitelyArray = arrayFromResponses.filter(response => response[1] === 'Definitely').map(response => response[0])
    let noArray = arrayFromResponses.filter(response => response[1] === 'No').map(response => response[0])
    let dontArray = arrayFromResponses.filter(response => response[1] === 'Don\'t').map(response => response[0])
    let sureArray = arrayFromResponses.filter(response => response[1] === 'Sure').map(response => response[0])

    return {
        definitely:definitelyArray,
        no:noArray,
        dont:dontArray,
        sure:sureArray,
        time:input.responses.time,
        critics: input.responses.critics,
        genres: input.responses.genres
    }

}

const filterBasedUponAResponse = (question, response)=>{
    if(STORE.filteredSeries.filter(series=> series[question] === response).length > 0){
        STORE.filteredSeries = STORE.filteredSeries.filter(series=> series[question] === response)
    }   
}

const sortBasedUponCriticsResponses = (response)=>{
    if(response === 'Agree' || response === 'Strongly-Agree'){
        STORE.filteredSeries = STORE.filteredSeries.sort((a,b) => b.criticScore-a.criticScore)
    } else {
        STORE.filteredSeries = STORE.filteredSeries.sort((a,b) => a.criticScore-b.criticScore)
    }
}

const definitleyFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false){
        sortedResponses.definitely.forEach(question => filterBasedUponAResponse(question, true))
    }
}

const noFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false){
        sortedResponses.no.forEach(question => filterBasedUponAResponse(question, false))
    }
}

const sureFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false){
        sortedResponses.sure.forEach(question => filterBasedUponAResponse(question, true))
    }
}

const timeFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false && sortedResponses.time != "Don't"){
        filterBasedUponAResponse('time', sortedResponses.time)
    }
}

const filterAll = ()=>{
    let sortedResponses = sortResponses(STORE)
    STORE.filteredSeries = genreFilter(sortedResponses.genres)

    definitleyFilter(sortedResponses)
    noFilter(sortedResponses)
    sureFilter(sortedResponses)
    timeFilter(sortedResponses)
    sortBasedUponCriticsResponses(sortedResponses.critics)

}

filterAll()
