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
  if (source, STATE.wiki.extract !== '' && typeof STATE.twitter[0] === 'object' && typeof 
  STATE.news.everything[0] === 'object') {
    toggleGifSelection()
    populatePerfectTweet()
    console.log(STATE)
  }
};

const listenForReperfectClick = ()=>{
  $('#reperfect-button').click(function(event){
    populatePerfectTweet()
  })
}

const populatePerfectTweet = () =>{ 
  selectGif('random')
  STATE.sentienceCountDown -= 1
  $('.perfect-tweet-text-box').find('p').html(createATweet(STATE))
}

///GIF Controll ===> START
// All of these functions are about making the different gifs selectable. Either randomly or directly

const selectGif = (index) =>{
  toggleGifSelection()
  if(index === 'random'){
    switchToRandomGifIndex(STATE.currentGifIndex)
  } else {
    STATE.currentGifIndex = index % 4
  }
  toggleGifSelection()
  $('.perfect-tweet-container').find('img').attr('src', STATE.giphy[STATE.currentGifIndex].images.original.url)
  $('.perfect-tweet-container').find('img').attr('alt', STATE.giphy[STATE.currentGifIndex].title)
}

const switchToRandomGifIndex = (currentIndex) =>{
  let newIndex = currentIndex
  while (newIndex === currentIndex){
    newIndex = randomBetween(0, STATE.giphy.length-1)
  }
  STATE.currentGifIndex = newIndex
}

const toggleGifSelection = () =>{
  $($('.giphy-gifs').find('.gif-block')[STATE.currentGifIndex]).toggleClass('selected-gif')
}

const listenForGifClick = () =>{
  $('.giphy-gifs').on('click', '.gif-block', function(){
    selectGif($(this).index())
  })
}

const listenForChosenGifClick = () =>{
  $('.perfect-tweet-container').on('click', 'img', function(){
    selectGif(STATE.currentGifIndex + 1)
  })
}

  ///GIF Control ===> END


///SEARCH ===> START
//This happens when someone clicks the go button on the start page. It sends out API calls, and then pulls all the data into the app.
const listenForSearchButtonClick = () => {
  $(".start-screen").on("click", "button", function(event) {
    event.preventDefault();
    searchButtonClick(this);
  });
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
const switchToPerfectTweetScreen = () => {
  $(".start-screen").attr("hidden", true);
  $(".perfect-tweet-screen").attr("hidden", false);
};

const makeAPIcalls = topic => {
  getGiphyFromSearch(topic);
  getNewsFromSearch(topic);
  getWikiFromSearch(topic);
  getTwitterFromSearch(topic); 
};

  //SEARCH ===> END


// RESET ====> START
//This is when a user wants to return to the start page and change topics.
const listenForRestartButtonClick = () => {
  $("#start-over-button").click(function(event) {
    restartButtonClick();
  });
};

const restartButtonClick = () => {
  resetInfo();
  switchToStartScreen();
  $('.form-container').find('input').focus()
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
  $('.perfect-tweet-text-box').find('p').html('<span class="pulsing">Creating Tweet...</span>')
  populateTwitter()
  populateWiki()
  // populateGiphy()
  populateNews()
};

  // RESET ===> END

// The twitter call has to come from a server. I set it up on Heroku, which sleeps after an hour of inactivity. So this is call right when the page loads so it has as long as possible to spin up before the first call
const wakeUpHerokuServer = () => {
  fetch(TWITTER_SEARCH_URL + "wakeUp/", {
    method: "get",
    mode: "cors"
  })
    // .then(res => res.json())
    .then(text => console.log("Poking the bear -> ", text));
};

//This function opens a new tab/window with a prepopulated tweet.
const listenForTweetButtonClick = () =>{
  $('#tweet-button').click(function(){
    let tweetText = encodeURIComponent($('.perfect-tweet-text-box').find('p').text())
    let tweetImage = encodeURIComponent(STATE.giphy[STATE.currentGifIndex].bitly_gif_url)
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetImage}&via=ThePerfectTwee1`)
  })
}

//These functions control the truncating ('squishing') of the perfect tweet bar.
const listenForSquishClick = ()=>{
  $('#squish-button').click(squishPerfectTweetBar)
}

const listenForTweetTextClick = () => {
  console.log('Tweet Text Listen')
  $('.perfect-tweet-screen').on('click', 'p', function(){
    if($('.perfect-tweet-screen').hasClass('squished')){
      squishPerfectTweetBar()
    }
  })
}

const squishPerfectTweetBar = () => {
  console.log('squish') 
  $('.perfect-tweet-screen').toggleClass('squished')
  window.scrollTo(0,0)
}

const listenForScroll = () => {
  let position = $(window).scrollTop()
  $(window).scroll(function(){
    let scroll = $(window).scrollTop()
    console.log(scroll)
    if(scroll > position && scroll > 200 && !$('.perfect-tweet-screen').hasClass('squished')){
      squishPerfectTweetBar()
    } else if (scroll < 220  && $('.perfect-tweet-screen').hasClass('squished')) {
      squishPerfectTweetBar()
    }
    position=scroll
  })

}


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
const randomBetween = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
const getRandomFromArray = array => array[randomBetween(0, array.length - 1)];

const handlePerfectTweetApp = () => {
  $('.form-container').find('input').focus()
  listenForSearchButtonClick()
  listenForRestartButtonClick()
  listenForTweetButtonClick()
  listenForReperfectClick()
  listenForScroll()
  listenForSquishClick()
  listenForGifClick()
  listenForChosenGifClick()
  listenForTweetTextClick()
  wakeUpHerokuServer()

};

$(handlePerfectTweetApp);
