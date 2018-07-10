const TWITTER_SEARCH_URL = 'https://mysterious-ravine-96868.herokuapp.com/';

const createTwitterObject = (results) => {

  let output = results.statuses.map(item => {
    return {
      text: item.full_text,
      user: item.user.screen_name,
      followers: item.user.followers_count,
      imageURL: item.user.profile_image_url,
    }
  })
  STATE.info.twitter = output
  populateInfo()
}

function getTwitterFromSearch(search) {
  let smallTopicArray = search.split(' ')
  let smallTopic = function(array){
    return array.sort((a, b) => b.length - a.length )[0]
  }(smallTopicArray)
  
  fetch(TWITTER_SEARCH_URL, {
    method: 'post',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ 'search': smallTopic })
  })
    .then(res => res.json())
    .then(obj => {
      createTwitterObject(obj)
      populateTwitter()
    })
}