let STORE = {
    
    /*
        There will be 5 different display states.
        -The First is 'start' it's the state as the page opens
        -Next it will transition to 'genreSelection' while will be a check box interface where the user can select a bunch of boxes.
        -Then it will shift to 'question' which will be a radio dial set up.
        -After each question there will be 'feedback', where they'll compare to my answers.
        -Then after all the questions it will shift to 'results' where the results of the quiz will be. Including an image of the best guess series, as well as how similar they are to my answers.
    */
    currentDisplay:'start',

    // This is where I'll store the information on the users responses
    responses:{
        genres:[],
        critics:'',
        bigNames:'',
        animated:"",
        foreign:'',
        continuous:"",
        seasons:'',
        trueStory:'',
        derivative:'',
        time:"",
    },


    //This tracks where we are in the app
    currentQuestion:0,

    //This counts how many of their responses match up with my own
    claytonMatches:0,

    //This is used to store the final suggestion(s) for the user.
    filteredSeries:[],

    //This is stores what series is showing on the results page
    guessIndex:0,

    //This is a flag to let the app know it's reached a conclusion
    bestGuessFound:false,
} 

///////FORMAT, TEXT, AND HTML - This is all the data that populates the app

const questionList = [
    {
        key:'genres',
        question:'Check all of the genres you are interested in:',
        genres:['political', 'crime', 'drama', 'lgbtq', 'comedy', 'action', 'scifi', 'horror', 'magical', 'family', 'documentary', 'super hero', 'art'],
        clayton:['drama', 'comedy', 'action', 'scifi', 'magical']
    }, 
    {
        key:'bigNames',
        question:'Do you want to see big name actors?',
        answers:['Definitely','Sure',"Don't care" ,'No thanks'],
        clayton:"Don't Care",
    },
    {
        key:'animated',
        question:'Do you want it to be animated?',
        answers:['Definitely','Sure','Don\'t care' ,'No thanks'],
        clayton:"Sure"
    },
    {
        key:'foreign',
        question:'Do you want this show to be produced somewhere other than the US?',
        answers:['Definitely','Sure','Don\'t care' ,'No thanks'],
        clayton:"Don't Care"
    },
    {
        key:'continuous',
        question:'Do you want the episodes to build on each other?',
        answers:['Definitely','Sure','Don\'t care' ,'No thanks'],
        clayton:"Sure"
    },
    {
        key:'seasons',        
        question:'Do you want to have a BUNCH of episodes to watch?',
        answers:['Definitely','Sure','Don\'t care' ,'No thanks'],
        clayton:"Definitely"
    },
    {
        key:'trueStory',        
        question:'Do you want it to be based on a true story?',
        answers:['Definitely','Sure','Don\'t care' ,'No thanks'],
        clayton:"Don't Care"
    },
    {
        key:'derivative',        
        question:'Do you want it to be based on an earlier artistic work?',
        answers:['Definitely','Sure','Don\'t care' ,'No thanks'],
        clayton:"Don't Care"
    },
    {
        key:'time',        
        question:'Which of these time periods are you most excited about?',
        answers:['Past','Present','Future' ,'Timeless (ie. it could be a variety of times)', 'Don\'t care'],
        clayton:"Future"
    },
    {
        key:'critics',        
        question:'How do you respond to this: "I tend to like what other people like" ',
        answers:['Strongly-Agree', 'Agree', 'Disagree', 'Strongly-Disagree'],
        clayton:"Disagree"
    },

]

const seriesList = [
    {img:'House.jpg',title:'House of Cards',genres:['political', 'crime', 'drama'], criticScore:76, bigNames:true, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {img:'Orange.jpg',title:'Orange is the new Black',genres:['crime', 'drama', 'lgbtq', 'comedy'], criticScore:79, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {img:'marco.jpg',title:'Marco Polo',genres:['political', 'drama', 'action'], criticScore:48, bigNames:false, animated:false, foreign:true, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Past'},
    {img:'sense8.jpg',title:'Sense8',genres:['drama', 'scifi', 'lgbtq'], criticScore:64, bigNames:true, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Contemporary'},
    {img:'Narcos.jpg',title:'Narcos',genres:['drama', 'political', 'crime'], criticScore:77, bigNames:false, animated:false, foreign:true, continuous:true, seasons:true, trueStory:true, derivative:false, time:'Past'},
    {img:'Stranger.jpg',title:'Stranger Things',genres:['action', 'drama', 'horror'], criticScore:76, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Past'},
    {img:'the_crown_0.jpg',title:'The Crown',genres:['political', 'drama'], criticScore:81, bigNames:true, animated:false, foreign:true, continuous:true, seasons:true, trueStory:true, derivative:false, time:'Past'},
    {img:'OA.jpg',title:'The OA',genres:['magical', 'drama'], criticScore:61, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Contemporary'},
    {img:'unfortunate.jpg',title:'A Series of Unfortunate Events',genres:['comedy', 'magical','family'], criticScore:81, bigNames:true, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Timeless'},
    {img:'mindhunter.png',title:'Mindhunter',genres:['crime', 'drama'], criticScore:79, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:true, derivative:false, time:'Past'},
    {img:'altered.jpg',title:'Altered Carbon',genres:['crime', 'action', 'scifi'], criticScore:64, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Future'},
    {img:'Lost.jpg',title:'Lost in Space',genres:['family', 'action', 'scifi'], criticScore:58, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:true, time:'Future'},
    {img:'Dare.jpg',title:'DareDevil',genres:['action', 'drama', 'super'], criticScore:75, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {img:'jessica.jpg',title:'Jessica Jones',genres:['action', 'drama', 'crime', 'super'], criticScore:81, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {img:'Luke.jpg',title:'Luke Cage',genres:['action', 'drama', 'super'], criticScore:79, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:true, time:'Contemporary'},
    {img:'unbreakable.jpg',title:'Unbreakable Kimmy Schmidt',genres:['magical', 'comedy'], criticScore:78, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Contemporary'},
    {img:'master.jpg',title:'Master of None',genres:['drama', 'comedy'], criticScore:91, bigNames:true, animated:false, foreign:false, continuous:false, seasons:true, trueStory:false, derivative:false, time:'Contemporary'},
    {img:'bobdavid.jpg',title:'W/ Bob & David',genres:['comedy'], criticScore:76, bigNames:true, animated:false, foreign:false, continuous:false, seasons:false, trueStory:false, derivative:false, time:'Timeless'},
    {img:'3000.jpg',title:'Mystery Science Theater 3000',genres:['scifi', 'family', 'comedy'], criticScore:70, bigNames:true, animated:false, foreign:false, continuous:false, seasons:false, trueStory:false, derivative:true, time:'Timeless'},
    {img:'Glow.jpg',title:'Glow',genres:['drama', 'comedy'], criticScore:81, bigNames:true, animated:false, foreign:false, continuous:true, seasons:false, trueStory:true, derivative:true, time:'Past'},
    {img:'bojak.jpg',title:'Bojack Horseman',genres:['drama', 'comedy'], criticScore:59, bigNames:true, animated:true, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Timeless'},
    {img:'bigmouth.jpg',title:'Big Mouth',genres:['magical', 'comedy'], criticScore:80, bigNames:true, animated:true, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Timeless'},
    {img:'voltron.jpg',title:'Voltron: Legendary Defender',genres:['scifi', 'family', 'magical', 'action'], criticScore:75, bigNames:false, animated:true, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Future'},
    {img:'3.jpg',title:'3%',genres:['drama', 'action', 'scifi'], criticScore:60, bigNames:false, animated:false, foreign:true, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Future'},
    {img:'therain.jpg',title:"The Rain",genres:['drama', 'action', 'scifi'], criticScore:65, bigNames:false, animated:false, foreign:true, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Future'},
    {img:'chefstable.jpg',title:"Chef's Table",genres:['documentary', 'art'], criticScore:85, bigNames:false, animated:false, foreign:true, continuous:false, seasons:true, trueStory:true, derivative:false, time:'Contemporary'},
    {img:'evil.jpg',title:'Evil Genius',genres:['horror', 'crime', 'documentary'], criticScore:71, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:true, derivative:false, time:'Contemporary'},
    {img:'queer.jpg',title:'Queer Eye',genres:['documentary', 'art', 'lgbtq'], criticScore:73, bigNames:false, animated:false, foreign:false, continuous:false, seasons:true, trueStory:true, derivative:false, time:'Contemporary'},
    {img:'blackmirror.jpg',title:'Black Mirror',genres:['scifi', 'political', 'action', 'horror'], criticScore:97, bigNames:false, animated:false, foreign:true, continuous:false, seasons:true, trueStory:false, derivative:false, time:'Timeless'},
]

const createRadioAnswerElements = (answerArray)=>{
    let htmlString = ''
    answerArray.forEach(answer => {
        htmlString = htmlString + `<label class="answer-container"><input type="radio" class="js-possible-answer" name="possible-answer" value=${answer} id=${answer}/>${answer}</label>`

    });
    return htmlString
}

const createCheckBoxAnswerElements = (genreArray)=>{
    let htmlString = ''
    genreArray.forEach(genre=>{
        htmlString = htmlString + 
            `<label class="genre-container"><input class="js-genre-option" type="checkbox" name="possible-answer" value=${genre} id=${genre}/>
                ${genre}
            </label>`
    })
    return htmlString
}

function weShareAtLeast1Genre (yourArray, myArray) {
    let thereIsAMatch = false;
    console.log(yourArray, myArray)
    if(Array.isArray(yourArray)){
        yourArray.forEach(genre =>{
            if(myArray.includes(genre)){
                thereIsAMatch = true
            }
        })
    }
    return thereIsAMatch
}

const compareYourselfToClayton = (yourChoice, myChoice)=>{
    let responseText = ''
    if(yourChoice === myChoice){
        responseText = `We picked the same thing. COOL!`
        STORE.claytonMatches++
    } else if(weShareAtLeast1Genre(yourChoice, myChoice)){
        responseText = `We share at least 1 genre pick in common! NICE!`
        STORE.claytonMatches++
    }else {
        responseText = `We picked different things... And that's totally fine!`
    }
    return `${responseText} <br>We are ${100*STORE.claytonMatches/(STORE.currentQuestion+1)}% synced up.`
}

const interpretYourChoice = (input)=>{
    switch(input){
        case 'No': return 'No Thanks'
        case "Don't": return "Don't Care"
        default: return input
    }
}


////LOGIC - This Everything below is focused on taking the input from the user and giving a response.

const removeDuplicates = (array) =>{
    let uniqueArray = []
    array.forEach(entry =>{
        if(uniqueArray.includes(entry) === false){
            uniqueArray = uniqueArray.concat(entry)
        }
    })
    return uniqueArray
}

const genreFilter = (genreArray) =>{
    let filteredArray = []
    genreArray.forEach(genre => {
        let seriesInGenre = seriesList.filter(series => series.genres.includes(genre))
        filteredArray = filteredArray.concat(seriesInGenre)
    })
    
    filteredArray = removeDuplicates(filteredArray)

    return filteredArray
}

const sortResponses = (input) =>{
    let arrayFromResponses = Object.entries(input.responses)
    let definitelyArray = arrayFromResponses.filter(response => response[1] === 'Definitely').map(response => response[0])
    let noArray = arrayFromResponses.filter(response => response[1] === 'No').map(response => response[0])
    let dontArray = arrayFromResponses.filter(response => response[1] === 'Don\'t').map(response => response[0])
    let sureArray = arrayFromResponses.filter(response => response[1] === 'Sure').map(response => response[0])

    return {
        definitely:definitelyArray,
        no:noArray,
        dont:dontArray,
        sure:sureArray,
        time:input.responses.time,
        critics: input.responses.critics,
        genres: input.responses.genres
    }

}

const filterBasedUponAResponse = (question, response)=>{
    if(STORE.filteredSeries.filter(series=> series[question] === response).length > 0){
        STORE.filteredSeries = STORE.filteredSeries.filter(series=> series[question] === response)
    }   
}

const sortBasedUponCriticsResponses = (response)=>{
    if(response === 'Agree' || response === 'Strongly-Agree'){
        STORE.filteredSeries = STORE.filteredSeries.sort((a,b) => b.criticScore-a.criticScore)
    } else {
        STORE.filteredSeries = STORE.filteredSeries.sort((a,b) => a.criticScore-b.criticScore)
    }
}

const definitleyFilter = (sortedResponses) =>{
    if(!STORE.bestGuessFound){
        sortedResponses.definitely.forEach(question => filterBasedUponAResponse(question, true))
    }
}

const noFilter = (sortedResponses) =>{
    if(!STORE.bestGuessFound){
        sortedResponses.no.forEach(question => filterBasedUponAResponse(question, false))
    }
}

const sureFilter = (sortedResponses) =>{
    if(!STORE.bestGuessFound){
        sortedResponses.sure.forEach(question => filterBasedUponAResponse(question, true))
    }
}

const timeFilter = (sortedResponses) =>{
    if(!STORE.bestGuessFound && sortedResponses.time != "Don't"){
        filterBasedUponAResponse('time', sortedResponses.time)
    }
}

const filterAll = ()=>{
    let sortedResponses = sortResponses(STORE)
    STORE.filteredSeries = genreFilter(sortedResponses.genres)

    definitleyFilter(sortedResponses)
    noFilter(sortedResponses)
    sureFilter(sortedResponses)
    timeFilter(sortedResponses)
    sortBasedUponCriticsResponses(sortedResponses.critics)

}

const findBestGuessSeries = () =>{
    filterAll()
    return STORE.filteredSeries[0]
}


/////////////INTERACTION - Everything below here is about clicking on stuff

const populateGenres = (screen)=>{
    let genreChoices = createCheckBoxAnswerElements(questionList[STORE.currentQuestion].genres)
    $(`#${screen}`).find('.all-answers').html(genreChoices)
}

const populateAnswers = (screen) => {
    let answers = createRadioAnswerElements(questionList[STORE.currentQuestion].answers)
    $(`#${screen}`).find('.all-answers').html(answers)
    $(`#${screen}`).find('legend').html(questionList[STORE.currentQuestion].key)
}

const populateTVQuestion = (screen)=>{
    console.log(screen)
    $(`#${screen}`).find('h1').html(questionList[STORE.currentQuestion].question)
    $(`#${screen}`).find('p').html(`You're on question ${STORE.currentQuestion+1} of 10`)
}

const populateResults = () => {
    $('#results').find('.result-image').html(
        `<img src="./images/${STORE.filteredSeries[STORE.guessIndex].img}" alt="The poster for ${STORE.filteredSeries[STORE.guessIndex].title}" />`
    )
    $('.result-text').html(`
        <div><p> Top reccomendation:</p>
            <h3 class="emphasized"> <b>${STORE.filteredSeries[STORE.guessIndex].title}</b></h3> 
        </div>       
        <div><p> We also found ${STORE.filteredSeries.length - 1} others</p></div>
        <hr>
        <p>You and I matched with ${100 * STORE.claytonMatches/10}%
    `)
}

const switchToGenre = () => {
    STORE.currentDisplay = 'genreSelection'
    populateGenres('genreSelection')
    populateTVQuestion('genreSelection')
    $('#start').attr('hidden', true)
    $('#genreSelection').attr('hidden', false)
}

const switchToResults = () => {
    findBestGuessSeries()
    STORE.currentDisplay = 'results'
    populateResults()
    $('#feedback').attr('hidden', true)
    $('#results').attr('hidden', false)
}

const switchToQuestion = () => {
    STORE.currentDisplay = 'question' 
    STORE.currentQuestion++
    populateTVQuestion('question')
    populateAnswers('question')
    $('#feedback').attr('hidden', true)
    $('#question').attr('hidden', false)
    $('#question').find('legend').focus()
}
            
const continueClick = () =>{
    if(STORE.currentDisplay === 'start'){
        switchToGenre()
    } else if (STORE.currentQuestion === questionList.length-1){
        switchToResults()
    } else {
        switchToQuestion()
    }
}

const listenForContinueClick = ()=>{
    console.log('listenForContinueClick')
    //listens for clicks on any of the continue buttons
    $('.js-app').on('click', '.js-continue-button', function(event){
        event.preventDefault()
        continueClick();
    }) 
}

const checkClick = (input) =>{
    // will toggle a checkbox on or off and update the state of 'responses.genres'
    let userGenres = STORE.responses.genres
    
    if(!userGenres.includes(input.value)){
        userGenres.push(input.value)
        $(input).parents('.genre-container').addClass('selected')
    }else {
        let index = userGenres.indexOf(input.value)
        userGenres.splice(index,1)
        $(input).parents('.genre-container').removeClass('selected')
    }
    console.log(input)
}

const listenForCheckClick = ()=>{
    $('.js-app').on('click', '.js-genre-option', function(event){
        // event.preventDefault()
        checkClick(this)
    })
    console.log('listenForCheckClick')
}

const radioClick = (input) =>{
    // will toggle selected radio on and all the others off, and update the
    $(input).parents('.all-answers').children('.answer-container').removeClass('selected')
    $(input).parents('.answer-container').addClass('selected')
    STORE.responses[questionList[STORE.currentQuestion].key] = input.value
}

const listenForRadioClick = ()=>{
    console.log('listenForRadioClick')
    $('.js-app').on('click', '.js-possible-answer', function(event){
        // event.preventDefault()
        radioClick(this)
    })
}

const determineYourChoice = (questionObj) => {
    let yourChoice = interpretYourChoice(STORE.responses[questionObj.key])
    let myChoice = questionObj.clayton
    if (Array.isArray(yourChoice)){
        yourChoice = yourChoice.map(item => ' '+ item)
        myChoice = myChoice.map(item => ' '+item)
    }
    return {yourChoice, myChoice}
}

const populateFeedback = () =>{
    let questionObj = questionList[STORE.currentQuestion]
    console.log(questionObj.question)
    let choices = determineYourChoice(questionObj)
    $('#feedback').find('h1').html(questionObj.question)
    $('#feedback').find('p').html(`
        <p>You chose <b class="emphasized">'${choices.yourChoice}'</b>
        <br>I chose <b>'${choices.myChoice}'</b>
        <br>${compareYourselfToClayton(choices.yourChoice, choices.myChoice)} </p>
    `                                
    )
}

const currentStepIsComplete = ()=>{
    if (STORE.currentDisplay === 'genreSelection' && STORE.responses.genres.length === 0){
        return false
    } else if (STORE.currentDisplay === 'question' && STORE.responses[questionList[STORE.currentQuestion].key] === ''){
        return false
    } else {
        return true
    }
}

const submitClick = ()=>{
    //will go from a question page to a transition page, increment the 'currentQuestion' then renders
    console.log('submitClick')
    if(currentStepIsComplete()){
        STORE.currentDisplay = 'feedback'
        populateFeedback()
        $('#genreSelection, #question').attr('hidden', true)
        $('#feedback').attr('hidden', false)   
    } else {
        console.log('not ready!')
    }   
}

const listenForSubmitClick = ()=>{
    console.log('listenForSubmitClick')
    $('.js-app').on('click', '.js-submit-button', function(event){
        event.preventDefault()
        submitClick()
    })
}

const moreClick = () =>{
    //on the 'results' page only. It will only exist if there are more than one match in the series list after filtering.
    STORE.guessIndex++
    STORE.guessIndex = STORE.guessIndex%STORE.filteredSeries.length
    populateResults()
}

const listenForMoreClick = () =>{
    $('.js-app').on('click', '.js-more-button', function(event){
       event.preventDefault();
       moreClick()
    })
    console.log('listenForMoreClick')
}

const resetResponses = () =>{
    STORE = {
      currentDisplay:'start',
      responses:{
          genres:[],
          critics:'',
          bigNames:'',
          animated:"",
          foreign:'',
          continuous:"",
          seasons:'',
          trueStory:'',
          derivative:'',
          time:"",
      },
      currentQuestion:0,
      claytonMatches:0,
      filteredSeries:[],
      guessIndex:0,
      bestGuessFound:false,}
}

const resetClick = ()=>{
    
    $('.js-app').on('click', '.js-reset-button', function(event){
        $('#results').attr('hidden', true)
        $('#start').attr('hidden', false)
        resetResponses()
    })
}

const listenForResetClick = () =>{
    $('.js-app').on('click', '.js-reset-button', function(event){
        event.preventDefault();
        resetClick()
    })
    console.log('listenForResetClick')
}

///////////ACTIVATION - rendering to the DOM and listening for actions

function handleQuizApp() {
    listenForContinueClick()
    listenForCheckClick()
    listenForRadioClick()
    listenForSubmitClick()
    listenForMoreClick()
    listenForResetClick()
}
  
$(handleQuizApp);