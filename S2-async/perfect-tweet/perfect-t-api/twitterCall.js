var request = require("request");
var twitter_api = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
var bearer_token = 'AAAAAAAAAAAAAAAAAAAAAEUl6wAAAAAAYctnbkuR1XL5CNjrPTBRON%2FmFfM%3D3kOOQjOZg0KpGNZyajj3dh7gPQFjj0gmYKdveohBz7TdTRlysZ'; 

var options = {
    method: 'GET',
    url: twitter_api,
    qs: {
        "screen_name": "claytonweller"
    },
    json: true,
    headers: {
        "Authorization": "Bearer " + bearer_token
    }
};

request(options, function(error, response, body) {
  console.dir(body);
});