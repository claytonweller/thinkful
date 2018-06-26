const EVERYTHING_SEARCH_URL = 'https://newsapi.org/v2/everything'
const GOOD_SEARCH_URL = 'https://newsapi.org/v2/top-headlines'
const NEWS_API_KEY = 'd57b057c68454414bd4d1d8aa9986a98'

const createGoodNewsObject = (results) =>{
    console.log(results)
    console.log({
        url:results.url, 
        headline:results.title, 
        author:results.author, 
        excerpt:results.description,
        source:results.source,
    })
}

const createEverythingNewsObject = (results) => {
    console.log(results)
}

function getGoodNewsFromSearch(search) {
    const query = {
        q:search,
        apiKey:NEWS_API_KEY,
        pageSize:3,
        country:'us',
        sortBy:'popularity'

    }
    $.getJSON(GOOD_SEARCH_URL, query, createGoodNewsObject);
}

function getEverythingFromSearch(search) {
    const query = {
        q:search,
        apiKey:NEWS_API_KEY,
        pageSize:3,
        language:'en',
        sortBy:'popularity'
    }
    $.getJSON(EVERYTHING_SEARCH_URL, query, createEverythingNewsObject);
}

getGoodNewsFromSearch('trump')
getEverythingFromSearch('trump')