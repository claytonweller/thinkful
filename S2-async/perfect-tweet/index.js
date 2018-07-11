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
  twitter: []
  
};

const allCallsDone = (source) => {
  if (source, STATE.wiki.extract !== '' && typeof STATE.twitter[0] === 'object' && typeof STATE.news.everything[0] === 'object') {
    console.log(STATE)
    $('.perfect-tweet-text-box').find('p').html(createATweet(STATE))
    $('.perfect-tweet-container').find('img').attr('src', STATE.giphy[0].images.original.url)
    $('.perfect-tweet-container').find('img').attr('alt', STATE.giphy[0].title)
  }
};

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
  twitter: []
  
  };
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

const handlePerfectTweetApp = () => {
  listenForSearchButtonClick();
  listenForRestartButtonClick();
  // listenForTweetButtonClick()
  //Need to make this!!
  wakeUpHerokuServer();
};

$(handlePerfectTweetApp);
