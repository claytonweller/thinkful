const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/api.php?origin=*&';

const createWikiObject = (results) =>{
    let page = results.query.pages
    let pageId =Object.keys(page)[0] 
    let extract = page[pageId].extract
    let title = page[pageId].title
    return {title, extract}
}

const storeWikiObject = (results) =>{
    let wikiObj = createWikiObject(results)
    STORE.info.wiki = wikiObj
}

function getWikiFromTitle(title) {
    const query = {
        action:'query',
        prop:'extracts',
        exintro:true,
        titles:title,
        format:'json',
    }
    $.getJSON(WIKI_SEARCH_URL, query, storeWikiObject);
}

const searchForTitles = (result) =>{
    let title =result[1][0]
    getWikiFromTitle(title)
}

function getWikiFromSearch(searchTerm) {
    const query = {
        action:'opensearch',
        search:searchTerm,
        limit:3,
        namespace:0,
        format:'json',
    }
    $.getJSON(WIKI_SEARCH_URL, query, searchForTitles);
}