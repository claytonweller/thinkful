const EVERYTHING_SEARCH_URL = "https://newsapi.org/v2/everything";
const GOOD_SEARCH_URL = "https://newsapi.org/v2/top-headlines";
const NEWS_API_KEY = "d57b057c68454414bd4d1d8aa9986a98";

const getNewsFromSearch = search => {
  const query = {
    q: truncateLongSearchString(search),
    apiKey: NEWS_API_KEY,
    pageSize: 3,
    sortBy: "popularity"
  };
  getEverythingFromSearch(query);
  getGoodNewsFromSearch(query);
};

const getGoodNewsFromSearch = (query) => {
  query.country = "us";
  $.getJSON(GOOD_SEARCH_URL, query, results => {
    STATE.news.good = results.articles;
    populateNews();
  });
}

const getEverythingFromSearch = (query) => {
  query.language = "en";
  $.getJSON(EVERYTHING_SEARCH_URL, query, results => {
    STATE.news.everything = results.articles;
    populateNews();
    allCallsDone('News');
  });
}

const populateNews = () => {
  var allNews = [...STATE.news.good, ...STATE.news.everything];
  var renderedNews = allNews.map(item => createSingleNewsArticle(item));
  $(".all-articles").html(renderedNews);
  $(".js-topic").html(STATE.topic);
};

const createSingleNewsArticle = result => {
  return `
    <article class="news-article">
      <header class="news-headline">
        <a href="${result.url}"><h2>${result.title}</h2></a>
        <h3>${result.source.name} - by ${result.author}</h3>
      </header>
      <div class="news-text">
        <p>${result.description}</p>
      </div>
    </article>
    `;
};