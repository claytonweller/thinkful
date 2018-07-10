const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/api.php?origin=*&';

const createWikiObject = (results) => {
  let page = results.query.pages
  let pageId = Object.keys(page)[0]
  let extract = page[pageId].extract
  let title = page[pageId].title
  return { title, extract }
}

const deadEndText = [
  'most commonly refers to',
  'may also refer to',
  'may refer to',
]

const includesDeadEndText = (string) => {
  let thereIsADeadEnd = false
  deadEndText.forEach(deadEnd => {
    if (string.includes(deadEnd) || string === '') {
      thereIsADeadEnd = true
    }
  })
  return thereIsADeadEnd
}

const storeWikiObject = (results) => {
  let wikiObj = createWikiObject(results)
  if (!includesDeadEndText(wikiObj.extract) && wikiObj.extract.length > STATE.info.wiki.extract.length) {
    STATE.info.wiki = wikiObj
    populateWiki()
  }
  
}

function getWikiFromTitle(title) {
  const query = {
    action: 'query',
    prop: 'extracts',
    exintro: true,
    titles: title,
    format: 'json',
  }
  $.getJSON(WIKI_SEARCH_URL, query, storeWikiObject);
}

const searchForTitles = (result) => {
  result[1].forEach(title => {
    getWikiFromTitle(title)
  })
}

function getWikiFromSearch(searchTerm) {
  
  const query = {
    action: 'opensearch',
    search: truncateLongSearchString(searchTerm),
    limit: 3,
    namespace: 0,
    format: 'json',
  }
  $.getJSON(WIKI_SEARCH_URL, query, searchForTitles);
}