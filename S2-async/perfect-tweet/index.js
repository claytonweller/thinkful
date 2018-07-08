const populateWiki = () => {
  $('.wiki-title').find('h1').html(STATE.info.wiki.title)
  $('.wiki-text').find('p').html(STATE.info.wiki.extract)
}

const createGifBlocks = () => {
  let html = ''
  STATE.info.giphy.forEach(obj => {
    html = html +
      `<div class="gif-block">
          <img src="${obj.url}" alt="${obj.alt}" />
      </div>`
  })
  return html
}

const populateGiphy = () => {
  $('.giphy-header').find('h1').html('Gifs related to: ' + STATE.topic)
  $('.giphy-gifs').html(createGifBlocks())
}

const createSingleNewsArticle = (obj) => {
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
    `
}

const createAllNewsArticles = () => {
  let articleHtml = `<h1>News about: ${STATE.topic}</h1>`
  STATE.info.news.good.forEach(item => {
    articleHtml = articleHtml + createSingleNewsArticle(item)
  })
  STATE.info.news.everything.forEach(item => {
    articleHtml = articleHtml + createSingleNewsArticle(item)
  })
  return articleHtml
}

const populateNews = () => {
  $('.info-news').html(createAllNewsArticles())
}

const populateInfo = () => {
  populateWiki()
  populateGiphy()
  populateNews()
}

const makeAPIcalls = (topic) => {
  getWikiFromSearch(topic)
  getGiphyFromSearch(topic)
  getNewsFromSearch(topic)
  getTwitterFromSearch(topic)
}

const switchToPerfectTweetScreen = () => {
  STATE.currentScreen = 'perfect-tweet'
  $('.start-screen').attr('hidden', true)
  $('.perfect-tweet-screen').attr('hidden', false)
}

const searchButtonClick = () => {
  let topicField = $('.start-screen').find('input')
  let topic = $(topicField).val()
  if (topic === '') {
    topic = 'NOTHING'
  }
  STATE.topic = topic
  $(topicField).val('')
  switchToPerfectTweetScreen()
  makeAPIcalls(topic)
  console.log(STATE)
}

const listenForSearchButtonClick = () => {
  console.log('listenForSearchButtonClick')
  $('.start-screen').on('click', 'button', function (event) {
    event.preventDefault()
    searchButtonClick(this)
  })
}

const switchToStartScreen = () => {
  STATE.currentScreen = 'start'
  $('.start-screen').attr('hidden', false)
  $('.perfect-tweet-screen').attr('hidden', true)
}

const resetInfo = () => {
  STATE.info = {
    wiki: { title: '', extract: '' },
    giphy: [],
    news: {
      good: [],
      everything: []
    },
  }
}

const restartButtonClick = () => {
  console.log('restart click')
  STATE.topic = ''
  resetInfo()
  switchToStartScreen()
}

const listenForRestartButtonClick = () => {
  console.log('listening for restart')
  $('#start-over-button').click(function (event) {
    restartButtonClick()
  })
}

const wakeUpServer = () => {
  fetch(TWITTER_SEARCH_URL + 'wakeUp/', {
    method: 'get',
    mode: 'cors',
  })
    // .then(res => res.json())
    .then(text => console.log('Poking the bear -> ', text))
}

const handlePerfectTweetApp = () => {
  listenForSearchButtonClick()
  listenForRestartButtonClick()
  // listenForTweetButtonClick()
  //Need to make this!!
  wakeUpServer()
}

$(handlePerfectTweetApp)
