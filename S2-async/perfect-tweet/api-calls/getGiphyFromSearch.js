const GIF_SEARCH_URL = "http://api.giphy.com/v1/gifs/search";
const GIPHY_API_KEY = "lkdzgGGUC5PbHv3W33MJbdvhSMA1u4Qc";

getGiphyFromSearch = (search) => {
  const query = {
    q: search,
    api_key: GIPHY_API_KEY,
    limit: 4
  };
  $.getJSON(GIF_SEARCH_URL, query, populateGiphy);
}

const populateGiphy = results => {
  STATE.giphy = results.data;
  console.log(STATE.giphy)
  let output = results.data.map(renderGiphyObject);
  
  $(".giphy-gifs").html(output);
}

const renderGiphyObject = item => `
    <button class="gif-block">
        <img src="${item.images.original.url}" alt="${item.title}" />
    </button>`;
