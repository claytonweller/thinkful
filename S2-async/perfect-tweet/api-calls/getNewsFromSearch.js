const EVERYTHING_SEARCH_URL = 'https://newsapi.org/v2/everything'
const GOOD_SEARCH_URL = 'https://newsapi.org/v2/top-headlines'
const NEWS_API_KEY = 'd57b057c68454414bd4d1d8aa9986a98'

const createNewsArray = (results) => {
  return results.articles.map(result => {
    return {
      url: result.url,
      headline: result.title,
      author: result.author,
      excerpt: result.description,
      source: result.source.name,
    }
  })
}

const createGoodNewsArray = (results) => {
  let newsArray = createNewsArray(results)
  STATE.info.news.good = newsArray
  populateNews()
}

const createEverythingNewsArray = (results) => {
  let newsArray = createNewsArray(results)
  STATE.info.news.everything = newsArray
  populateNews()
}

function getGoodNewsFromSearch(search) {
  const query = {
    q: search,
    apiKey: NEWS_API_KEY,
    pageSize: 3,
    country: 'us',
    sortBy: 'popularity'

  }
  $.getJSON(GOOD_SEARCH_URL, query, createGoodNewsArray);
}

function getEverythingFromSearch(search) {
  const query = {
    q: search,
    apiKey: NEWS_API_KEY,
    pageSize: 3,
    language: 'en',
    sortBy: 'popularity'
  }
  $.getJSON(EVERYTHING_SEARCH_URL, query, createEverythingNewsArray);
}

const getNewsFromSearch = search => {
  getEverythingFromSearch(search)
  getGoodNewsFromSearch(search)
}