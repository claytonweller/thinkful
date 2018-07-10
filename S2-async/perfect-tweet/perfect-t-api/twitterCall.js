const request = require("request");
const twitter_api = 'https://api.twitter.com/1.1/search/tweets.json';
const bearer_token = 'AAAAAAAAAAAAAAAAAAAAAEUl6wAAAAAAYctnbkuR1XL5CNjrPTBRON%2FmFfM%3D3kOOQjOZg0KpGNZyajj3dh7gPQFjj0gmYKdveohBz7TdTRlysZ'; 

const twitterCall = (topic) =>{

  const options = {
    method: 'GET',
    url: twitter_api, 
    qs: {
      q: topic,
      'result_type':'popular',
      'tweet_mode':'extended',
      lang:'en',
      count: 10,
    },
    json: true,
    headers: {
      "Authorization": "Bearer " + bearer_token
    }
  };
  return new Promise(function(resolve, reject) {
    request.get(options, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  })

} 

module.exports = twitterCall;