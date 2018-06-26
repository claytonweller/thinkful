const GIF_SEARCH_URL = 'http://api.giphy.com/v1/gifs/search';
const GIPHY_API_KEY = 'lkdzgGGUC5PbHv3W33MJbdvhSMA1u4Qc'

const createGiphyObject = (results) =>{
    let output = results.data.map(item => {
        return {
            url:item.images.original.url,
            alt:item.title,
        }
    })
    STATE.info.giphy = output 
}

function getGiphyFromSearch(search) {
    const query = {
        q:search,
        'api_key': GIPHY_API_KEY,
        limit:5,
    }
    $.getJSON(GIF_SEARCH_URL, query, createGiphyObject);
}

getGiphyFromSearch('happy')