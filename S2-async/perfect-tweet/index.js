const populateWiki = () => {
    console.log('populating wiki')
    $('.wiki-title').find('h1').html(STATE.info.wiki.title)
    $('.wiki-text').find('p').html(STATE.info.wiki.extract)
}

const createGifBlocks = () =>{
    let html = ''
    STATE.info.giphy.forEach(obj =>{
        html = html+
            `<div class="gif-block">
                <img src="${obj.url}" alt="${obj.alt}" />
            </div>`
    })
    return html
}

const populateGiphy = () => {
    console.log('populating giphy')
    $('.giphy-header').find('h1').html('Gifs related to: '+STATE.topic)
    $('.giphy-gifs').html(createGifBlocks())
}

const switchToPerfectTweetScreen = ()=>{
    STATE.currentScreen = 'perfect-tweet'
    $('.start-screen').attr('hidden', true)
    $('.perfect-tweet-screen').attr('hidden', false)
    $('.tabs-container').attr('hidden', false)
}

const makeAPIcalls = () =>{
    getWikiFromSearch(STATE.topic)
    getGiphyFromSearch(STATE.topic)
}

const searchButtonClick = (element) =>{
    console.log('search button click')
    let topicField = $('.start-screen').find('input')
    STATE.topic = $(topicField).val()
    $(topicField).val('')
    switchToPerfectTweetScreen()
    makeAPIcalls()
    console.log(STATE)
}

const listenForSearchButtonClick = ()=>{
    console.log('listenForSearchButtonClick')
    $('.start-screen').on('click', 'button', function(event){
        event.preventDefault()
        searchButtonClick(this)
    })  
}

const switchToStartScreen = ()=>{
    STATE.currentScreen = 'start'
    $('.start-screen').attr('hidden', false)
    $('.perfect-tweet-screen').attr('hidden', true)
    $('.tabs-container').attr('hidden', true)
}

const restartButtonClick = ()=>{
    console.log('restart click')
    STATE.topic = ''
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

    STATE.infoHidden = false

}

const hideInfoDisplay = () => {
    STATE.infoHidden = true
    STATE.infoDisplay = ''
    $('.info-container').attr('hidden', true)
}

const infoButtonClick = (infoButton) => {   
    console.log($(infoButton).attr('id'), 'clicked')
    if(STATE.infoHidden){
        showInfoDisplay()   
    } else if (!STATE.infoHidden && STATE.infoDisplay === chooseInfoDisplay(infoButton) ){
        hideInfoDisplay() 
    }
    STATE.infoDisplay = chooseInfoDisplay(infoButton)
    $('.js-info').attr('hidden', true)
    $(`.info-${STATE.infoDisplay}`).attr('hidden', false)
    
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