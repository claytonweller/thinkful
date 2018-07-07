const TWITTER_SEARCH_URL = 'http://localhost:3005/';

const createTwitterObject = (results) =>{
  console.log(results)

  // let output = results.data.map(item => {
  //   return {
  //     url:item.images.original.url,
  //     alt:item.title,
  //   }
  // })
  //   STATE.info.giphy = output 
}

function getTwitterFromSearch(search) {
  const query = search
  $.getJSON(TWITTER_SEARCH_URL, query, createTwitterObject);
}