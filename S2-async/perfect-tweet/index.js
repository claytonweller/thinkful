STATE = {
  topic: "",
  wiki: {
    title: "",
    extract: ""
  },
  giphy: [], //may not need to keep this in the store
  news: {
    good: [],
    everything: []
  },
  twitter: [],
  currentGifIndex:0,
  sentienceCountDown:5,
};

const allCallsDone = (source) => {
  if (source, STATE.wiki.extract !== '' && typeof STATE.twitter[0] === 'object' && typeof STATE.news.everything[0] === 'object') {
    populatePerfectTweet()
    console.log(STATE)
  }
};

const switchToNewGifIndex = (currentIndex) =>{
  let newIndex = currentIndex
  while (newIndex === currentIndex){
    newIndex = randomBetween(0, STATE.giphy.length-1)
  }
  STATE.currentGifIndex = newIndex
}

const populatePerfectTweet = ()=>{

  switchToNewGifIndex(STATE.currentGifIndex)
  STATE.sentienceCountDown -= 1
  $('.perfect-tweet-text-box').find('p').html(createATweet(STATE))
  $('.perfect-tweet-container').find('img').attr('src', STATE.giphy[STATE.currentGifIndex].images.original.url)
  $('.perfect-tweet-container').find('img').attr('alt', STATE.giphy[STATE.currentGifIndex].title)
}

const searchButtonClick = () => {
  let topicField = $(".start-screen").find("input");
  STATE.topic = $(topicField).val();
  if (!STATE.topic) {
    STATE.topic = "NOTHING";
  }
  $(topicField).val("");
  switchToPerfectTweetScreen();
  makeAPIcalls(STATE.topic);
};

const makeAPIcalls = topic => {
  getGiphyFromSearch(topic);
  getNewsFromSearch(topic);
  getWikiFromSearch(topic);
  getTwitterFromSearch(topic); 
};

///This function is used by a couple of the API calls to make sure they work with ridiculously long strings

const truncateLongSearchString = string => {
  let smallTopicArray = string.split(" ");
  if (smallTopicArray.length > 1) {
    return smallTopicArray.sort((a, b) => b.length - a.length)[0];
  } else {
    return string;
  }
};

//these are useful functions that come up in multiple places
let randomBetween = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
let getRandomFromArray = array => array[randomBetween(0, array.length - 1)];

const switchToPerfectTweetScreen = () => {
  $(".start-screen").attr("hidden", true);
  $(".perfect-tweet-screen").attr("hidden", false);
};

const listenForSearchButtonClick = () => {
  console.log("listenForSearchButtonClick");
  $(".start-screen").on("click", "button", function(event) {
    event.preventDefault();
    searchButtonClick(this);
  });
};

const switchToStartScreen = () => {
  $(".start-screen").attr("hidden", false);
  $(".perfect-tweet-screen").attr("hidden", true);
};

const resetInfo = () => {
  STATE = {
  topic: "",
  wiki: {
    title: "",
    extract: ""
  },
  // giphy: [], //may not need to keep this in the store
  news: {
    good: [],
    everything: []
  },
  twitter: [],
  currentGifIndex:0,
  sentienceCountDown:10
  
  };
  $('.perfect-tweet-container').find('img').attr('src', './images/Loading.gif')
  $('.perfect-tweet-container').find('img').attr('alt', 'placeholder')
  populateTwitter()
  populateWiki()
  // populateGiphy()
  populateNews()
};


const restartButtonClick = () => {
  console.log("restart click"); 
  resetInfo();
  switchToStartScreen();
};

const listenForRestartButtonClick = () => {
  console.log("listening for restart");
  $("#start-over-button").click(function(event) {
    restartButtonClick();
  });
};

const wakeUpHerokuServer = () => {
  fetch(TWITTER_SEARCH_URL + "wakeUp/", {
    method: "get",
    mode: "cors"
  })
    // .then(res => res.json())
    .then(text => console.log("Poking the bear -> ", text));
};

const listenForTweetButtonClick = () =>{
  $('#tweet-button').click(function(event){
    
    let tweetText = encodeURIComponent($('.perfect-tweet-text-box').find('p').text())
    let tweetImage = encodeURIComponent(STATE.giphy[STATE.currentGifIndex].bitly_gif_url)
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetImage}&via=ThePerfectTwee1`)
  })
}

const listenForReperfectClick = ()=>{
  $('#reperfect-button').click(function(event){
    populatePerfectTweet()
  })
}

const handlePerfectTweetApp = () => {
  listenForSearchButtonClick();
  listenForRestartButtonClick();
  listenForTweetButtonClick()
  listenForReperfectClick()
  //Need to make this!!
  wakeUpHerokuServer();
};

$(handlePerfectTweetApp);
