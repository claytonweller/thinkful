//I may have to set up a server to make this work


const TWITTER_SEARCH_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
var bearer_token = 'AAAAAAAAAAAAAAAAAAAAAEUl6wAAAAAAYctnbkuR1XL5CNjrPTBRON%2FmFfM%3D3kOOQjOZg0KpGNZyajj3dh7gPQFjj0gmYKdveohBz7TdTRlysZ'


const createTwitterObject = (results) =>{
    console.log(results)
}

function getTwitterFromSearch(query) {
    // const query = {
    //     action:'query',
    //     prop:'extracts',
    //     exintro:true,
    //     titles:query,
    //     format:'json',
    // }
    // $.getJSON(TWITTER_SEARCH_URL, query, createTwitterObject);
    $.ajax({
        headers:{
            "Authorization": "Bearer " + bearer_token
        },
        url:TWITTER_SEARCH_URL,
        dataType:'json',
        data:{"screen_name":query, 'origin':'*', json:true},
        success:createTwitterObject,
    })

}

// getTwitterFromSearch('clayton')



// var options = {
//     method: 'GET',
//     url: twitter_api,
//     qs: {
//         "screen_name": "twitterapi"
//     },
//     json: true,
//     headers: {
//         "Authorization": "Bearer " + bearer_token
//     }
// };

// request(options, function(error, response, body) {
//   console.dir(body);
// });