const populateWiki = () => {
    console.log('populating wiki')
    $('.wiki-title').find('h1').html(STORE.info.wiki.title)
    $('.wiki-text').find('p').html(STORE.info.wiki.extract)
}

const createGifBlocks = () =>{
    let html = ''
    STORE.info.giphy.forEach(obj =>{
        html = html+
            `<div class="gif-block">
                <img src="${obj.url}" alt="${obj.alt}" />
            </div>`
    })
    return html
}

const populateGiphy = () => {
    console.log('populating giphy')
    $('.giphy-header').find('h1').html('Gifs related to: '+STORE.topic)
    $('.giphy-gifs').html(createGifBlocks())
}

const switchToPerfectTweetScreen = ()=>{
    STORE.currentScreen = 'perfect-tweet'
    $('.start-screen').attr('hidden', true)
    $('.perfect-tweet-screen').attr('hidden', false)
    $('.tabs-container').attr('hidden', false)
}

const makeAPIcalls = () =>{
    getWikiFromSearch(STORE.topic)
    getGiphyFromSearch(STORE.topic)
}

const searchButtonClick = (element) =>{
    console.log('search button click')
    let topicField = $('.start-screen').find('input')
    STORE.topic = $(topicField).val()
    $(topicField).val('')
    switchToPerfectTweetScreen()
    makeAPIcalls()
    console.log(STORE)
}

const listenForSearchButtonClick = ()=>{
    console.log('listenForSearchButtonClick')
    $('.start-screen').on('click', 'button', function(event){
        event.preventDefault()
        searchButtonClick(this)
    })  
}

const switchToStartScreen = ()=>{
    STORE.currentScreen = 'start'
    $('.start-screen').attr('hidden', false)
    $('.perfect-tweet-screen').attr('hidden', true)
    $('.tabs-container').attr('hidden', true)
}

const restartButtonClick = ()=>{
    console.log('restart click')
    STORE.topic = ''
    switchToStartScreen()
    hideInfoDisplay()
}

const listenForRestartButtonClick = () => {
    console.log('listening for restart')
    $('.js-restart-button').click(function(event) {
        restartButtonClick()
    })
}

const perfectButtonClick = () => {
    console.log ('re-perfect click')
}

const listenForPerfectButtonClick = () => {
    console.log('listening for re-perfect')
    $('.js-perfect-button').click(function (event) {
        perfectButtonClick()
    })
}

const chooseInfoDisplay = (infoButton) =>{
    let display = $(infoButton).attr('id')
    display = display.split('-')
    return display[0]
}

const showInfoDisplay = () => {
    $('.info-container').attr('hidden', false)
    populateWiki()
    populateGiphy()

    STORE.infoHidden = false

}

const hideInfoDisplay = () => {
    STORE.infoHidden = true
    STORE.infoDisplay = ''
    $('.info-container').attr('hidden', true)
}

const infoButtonClick = (infoButton) => {   
    console.log($(infoButton).attr('id'), 'clicked')
    if(STORE.infoHidden){
        showInfoDisplay()   
    } else if (!STORE.infoHidden && STORE.infoDisplay === chooseInfoDisplay(infoButton) ){
        hideInfoDisplay() 
    }
    STORE.infoDisplay = chooseInfoDisplay(infoButton)
    $('.js-info').attr('hidden', true)
    $(`.info-${STORE.infoDisplay}`).attr('hidden', false)
    
}

const listenForInfoButtonClick = () => {
    console.log('listening for info button click')
    $('.info-tab').on('click', 'button', function () {
        infoButtonClick(this)
    })
}

const handlePerfectTweetApp = () =>{
    listenForPerfectButtonClick()
    listenForSearchButtonClick()
    listenForRestartButtonClick()
    listenForInfoButtonClick()
}

$(handlePerfectTweetApp)