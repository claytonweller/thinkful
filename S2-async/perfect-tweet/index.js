STORE = {
    topic:'',
    currentScreen:'start',
    infoHidden:true,
    infoDisplay:'wiki'
}

const switchToPerfectTweetScreen = ()=>{
    STORE.currentScreen = 'perfect-tweet'
    $('.start-screen').attr('hidden', true)
    $('.perfect-tweet-screen').attr('hidden', false)
    $('.tabs-container').attr('hidden', false)
}

const searchButtonClick = (element) =>{
    console.log('search button click')
    let topicField = $('.start-screen').find('input')
    STORE.topic = $(topicField).val()
    $(topicField).val('')
    switchToPerfectTweetScreen()
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
}

const listenForRestartButtonClick = ()=>{
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
    console.log($(infoButton).attr('id'))
    let display = $(infoButton).attr('id')
    display = display.split('-')
    return display[0]

}

const showInfoDisplay = () => {
    $('.info-container').attr('hidden', false)
}

const infoButtonClick = (infoButton) => {
    console.log(infoButton, 'clicked')
    if(STORE.infoHidden){
        STORE.infoHidden = false
        showInfoDisplay()   
    }
    STORE.infoDisplay = chooseInfoDisplay(infoButton)
    
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