const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/api.php?origin=*&';

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

const populateWiki = () => {
  $(".wiki-title").find("h1").html(STATE.wiki.title);
  $(".wiki-text").find("p").html(STATE.wiki.extract);
};

const searchForTitles = (result) => {
  result[1].forEach(title => {
    getWikiFromTitle(title)
  })
}

const getWikiFromTitle = (title) => {
  const query = {
    action: 'query',
    prop: 'extracts',
    exintro: true,
    titles: title,
    format: 'json',
  }
  $.getJSON(WIKI_SEARCH_URL, query, storeWikiObject);
}

const storeWikiObject = (results) => {
  let pageId = Object.keys(results.query.pages)[0]
  if (!includesDeadEndText(results.query.pages[pageId].extract) 
    && results.query.pages[pageId].extract.length > STATE.wiki.extract.length) {
      STATE.wiki.title = results.query.pages[pageId].title
      STATE.wiki.extract = results.query.pages[pageId].extract
      populateWiki()
      allCallsDone('wiki');
  } 
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