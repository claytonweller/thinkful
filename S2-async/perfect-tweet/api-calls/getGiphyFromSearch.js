const GIF_SEARCH_URL = "http://api.giphy.com/v1/gifs/search";
const GIPHY_API_KEY = "lkdzgGGUC5PbHv3W33MJbdvhSMA1u4Qc";

function getGiphyFromSearch(search) {
  const query = {
    q: search,
    api_key: GIPHY_API_KEY,
    limit: 4
  };
  $.getJSON(GIF_SEARCH_URL, query, populateGiphy);
}

const populateGiphy = results => {
  // $(".giphy-header")
  //   .find("h1")
  //   .html("Gifs related to: " + STATE.topic);
  let output = results.data.map(renderGiphyObject);
  $(".giphy-gifs").html(output);
};

const renderGiphyObject = item => `
    <div class="gif-block">
        <img src="${item.images.original.url}" alt="${item.title}" />
    </div>`;

// No state
// Map once
// One array
