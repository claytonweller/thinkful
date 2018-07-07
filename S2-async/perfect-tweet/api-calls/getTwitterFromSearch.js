const TWITTER_SEARCH_URL = 'https://mysterious-ravine-96868.herokuapp.com/';

const createTwitterObject = (results) =>{

  let output = results.statuses.map(item => {
    return {
      text:item.full_text,
      user:item.user.screen_name,
      followers: item.user.followers_count,
      imageURL: item.user.profile_image_url,
    }
  })
  // console.log('results', output)
  STATE.info.twitter = output 
}

function getTwitterFromSearch(search) {
  fetch(TWITTER_SEARCH_URL, {
    method:'post',
    mode:'cors',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify({'search':search})
  })
    .then(res => res.json())
    .then(obj => createTwitterObject(obj))
}