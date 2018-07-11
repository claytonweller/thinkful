const TWITTER_SEARCH_URL = "https://mysterious-ravine-96868.herokuapp.com/";

const getTwitterFromSearch = (search) => {

  fetch(TWITTER_SEARCH_URL, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ search: truncateLongSearchString(search) })
  })
    .then(res => res.json())
    .then(obj => {
      storeTwitterObject(obj);
      populateTwitter();
      allCallsDone('twitter');
    });
}

const populateTwitter = () => {
  $(".twitter-users").html(createAllTwitterUsers());
};

const storeTwitterObject = results => {
  STATE.twitter = results.statuses.map(item => {
    return {
      text: item.full_text,
      user: item.user.screen_name,
      followers: item.user.followers_count,
      imageURL: item.user.profile_image_url
    };
  });
};

const createAllTwitterUsers = () => {
  let twitterHtml = "";
  let userCount = 3;
  if (STATE.twitter.length < 3) {
    userCount = STATE.twitter.length;
  }
  for (let index = 0; index < userCount; index++) {
    twitterHtml += createTwitterUser(STATE.twitter[index]);
  }
  return twitterHtml;
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

