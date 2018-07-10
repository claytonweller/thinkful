STATE = {
  topic: "",
  info: {
    // remove info -> so it is one level;
    wiki: {
      title: "",
      extract: ""
    },
    // giphy: [],
    news: {
      good: [],
      everything: []
    },
    twitter: []
  }
};

<<<<<<< Updated upstream
const done = () => {
  if (STATE.wiki.title && STATE.news && STATE.twitter) {
    perfectTweet();
  }
};
=======
const populateGiphy = () => {
  // $('.giphy-header').find('h1').html('Gifs related to: ' + STATE.topic)
  $('.giphy-gifs').html(createGifBlocks())
}
>>>>>>> Stashed changes

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

  getWikiFromSearch(topic); // TODO: refactor
  getTwitterFromSearch(topic); // TODO: refactor
};

/*
wait for perfect tweet
scoll and compress nav?
*/

const populateWiki = () => {
  $(".wiki-title")
    .find("h1")
    .html(STATE.info.wiki.title);
  $(".wiki-text")
    .find("p")
    .html(STATE.info.wiki.extract);
};

const createTwitterUser = obj => {
  let scaledUrl = obj.imageURL.replace("_normal", "_200x200");
  return `
    <div class="twitter-user">
      <div class="twitter-user-splash">
        <div class="twitter-user-grid">
          <div class="grid-upper-left"></div>
          <div class="grid-upper-right"></div>
          <div class="grid-lower-left"></div>
          <div class="grid-lower-right">
            <img src="${scaledUrl}" alt="profile picture of ${obj.user}">
          </div>
        </div>
        <div class="twitter-user-info">
          <div class="twitter-user-name">@${obj.user}</div>
          <div class="twitter-user-followers">${obj.followers} followers</div>
        </div>
      </div>
      <div class="twitter-user-tweet">
        <p>${obj.text}</p>
      </div>
    </div>
  `;
};

const createAllTwitterUsers = () => {
  let twitterHtml = "";
  let userCount = 3;
  if (STATE.info.twitter.length < 3) {
    userCount = STATE.info.twitter.length;
  }
  for (let index = 0; index < userCount; index++) {
    twitterHtml += createTwitterUser(STATE.info.twitter[index]);
  }

  return twitterHtml;
};

const populateTwitter = () => {
  console.log("populateTwitter");
  $(".twitter-users").html(createAllTwitterUsers());
};

const truncateLongSearchString = string => {
  let smallTopicArray = string.split(" ");
  if (smallTopicArray.length > 2) {
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
  STATE.info = {
    wiki: { title: "", extract: "" },
    giphy: [],
    news: {
      good: [],
      everything: []
    }
  };
};

const restartButtonClick = () => {
  console.log("restart click");
  STATE.topic = "";
  resetInfo();
  switchToStartScreen();
};

const listenForRestartButtonClick = () => {
  console.log("listening for restart");
  $("#start-over-button").click(function(event) {
    restartButtonClick();
  });
};

const wakeUpServer = () => {
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
  wakeUpServer();
};

$(handlePerfectTweetApp);
