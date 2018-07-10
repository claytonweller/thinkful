STATE = {
  topic: "",
  info: {
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

  getWikiFromSearch(topic);

  getNewsFromSearch(topic);
  getTwitterFromSearch(topic);
};

/////////////////

const populateWiki = () => {
  $(".wiki-title")
    .find("h1")
    .html(STATE.info.wiki.title);
  $(".wiki-text")
    .find("p")
    .html(STATE.info.wiki.extract);
};

const createSingleNewsArticle = obj => {
  return `
    <article class="news-article">
      <header class="news-headline">
        <a href="${obj.url}"><h2>${obj.headline}</h2></a>
        <h3>${obj.source} - by ${obj.author}</h3>
      </header>
      <div class="news-text">
        <p>${obj.excerpt}</p>
      </div>
    </article>
    `;
};

const createAllNewsArticles = () => {
  let articleHtml = "";
  STATE.info.news.good.forEach(item => {
    articleHtml = articleHtml + createSingleNewsArticle(item);
  });
  STATE.info.news.everything.forEach(item => {
    articleHtml = articleHtml + createSingleNewsArticle(item);
  });
  return articleHtml;
};

const populateNews = () => {
  $(".all-articles").html(createAllNewsArticles());
  $(".js-topic").html(STATE.topic);
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

const populateInfo = () => {
  populateWiki();
  populateGiphy();
  populateNews();
  populateTwitter();
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
