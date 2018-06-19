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

    //This is where I'll store the information on the users responses
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
    filteredSeries:['testSeries'],

    //This is a flag to let the app know it's reached a conclusion
    bestGuessFound:false
} 

///////CONSTANTS - This is all the data that populates the app

const questionList = [
    {
        key:'genres',
        question:'Check all of the genres you are intersted in:',
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
        question:'Do you want the episodes to build on each other? (ie. All the stories of the episodes string together)',
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
        question:'Do you want it to be based on some an earlier artistic work? (ie. book, movie, tv show)',
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
        question:'How do you respond to this statement: "I tend to like what other people like" ',
        answers:['Strongly-Agree', 'Agree', 'Disagree', 'Strongly-`Disagree'],
        clayton:"Disagree"
    },

]

seriesList = [
    {title:'House of Cards',genres:['political', 'crime', 'drama'], criticScore:76, bigNames:true, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {title:'Orange is the new Black',genres:['crime', 'drama', 'lgbtq', 'comedy'], criticScore:79, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {title:'Marco Polo',genres:['political', 'drama', 'action'], criticScore:48, bigNames:false, animated:false, foreign:true, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Past'},
    {title:'Sense8',genres:['drama', 'scifi', 'lgbtq'], criticScore:64, bigNames:true, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Contemporary'},
    {title:'Narcos',genres:['drama', 'political', 'crime'], criticScore:77, bigNames:false, animated:false, foreign:true, continuous:true, seasons:true, trueStory:true, derivative:false, time:'Past'},
    {title:'Stranger Things',genres:['action', 'drama', 'horror'], criticScore:76, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Past'},
    {title:'The Crown',genres:['political', 'drama'], criticScore:81, bigNames:true, animated:false, foreign:true, continuous:true, seasons:true, trueStory:true, derivative:false, time:'Past'},
    {title:'The OA',genres:['magical', 'drama'], criticScore:61, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Contemporary'},
    {title:'A Series of Unfortunate Events',genres:['comedy', 'magical','family'], criticScore:81, bigNames:true, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Timeless'},
    {title:'Mindhunter',genres:['crime', 'drama'], criticScore:79, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:true, derivative:false, time:'Past'},
    {title:'Altered Carbon',genres:['crime', 'action', 'scifi'], criticScore:64, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Future'},
    {title:'Lost in Space',genres:['family', 'action', 'scifi'], criticScore:58, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:true, time:'Future'},
    {title:'DareDevil',genres:['action', 'drama', 'super'], criticScore:75, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {title:'Jessica Jones',genres:['action', 'drama', 'crime', 'super'], criticScore:81, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Contemporary'},
    {title:'Luke Cage',genres:['action', 'drama', 'super'], criticScore:79, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:true, time:'Contemporary'},
    {title:'Unbreakable Kimmy Schmidt',genres:['magical', 'comedy'], criticScore:78, bigNames:false, animated:false, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Contemporary'},
    {title:'Master of None',genres:['drama', 'comedy'], criticScore:91, bigNames:true, animated:false, foreign:false, continuous:false, seasons:true, trueStory:false, derivative:false, time:'Contemporary'},
    {title:'W/ Bob & David',genres:['comedy'], criticScore:76, bigNames:true, animated:false, foreign:false, continuous:false, seasons:false, trueStory:false, derivative:false, time:'Timeless'},
    {title:'Mystery Science Theater 3000',genres:['scifi', 'family', 'comedy'], criticScore:70, bigNames:true, animated:false, foreign:false, continuous:false, seasons:false, trueStory:false, derivative:true, time:'Timeless'},
    {title:'Glow',genres:['drama', 'comedy'], criticScore:81, bigNames:true, animated:false, foreign:false, continuous:true, seasons:false, trueStory:true, derivative:true, time:'Past'},
    {title:'Bojack Horseman',genres:['drama', 'comedy'], criticScore:59, bigNames:true, animated:true, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Timeless'},
    {title:'Big Mouth',genres:['magical', 'comedy'], criticScore:80, bigNames:true, animated:true, foreign:false, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Timeless'},
    {title:'Voltron: Legendary Defender',genres:['scifi', 'family', 'magical', 'action'], criticScore:75, bigNames:false, animated:true, foreign:false, continuous:true, seasons:true, trueStory:false, derivative:true, time:'Future'},
    {title:'3%',genres:['drama', 'action', 'scifi'], criticScore:60, bigNames:false, animated:false, foreign:true, continuous:true, seasons:true, trueStory:false, derivative:false, time:'Future'},
    {title:"The Rain",genres:['drama', 'action', 'scifi'], criticScore:65, bigNames:false, animated:false, foreign:true, continuous:true, seasons:false, trueStory:false, derivative:false, time:'Future'},
    {title:"Chef's Table",genres:['documentary', 'art'], criticScore:85, bigNames:false, animated:false, foreign:true, continuous:false, seasons:true, trueStory:true, derivative:false, time:'Contemporary'},
    {title:'Evil Genius',genres:['horror', 'crime', 'documentary'], criticScore:71, bigNames:false, animated:false, foreign:false, continuous:true, seasons:false, trueStory:true, derivative:false, time:'Contemporary'},
    {title:'Queer Eye',genres:['documentary', 'art', 'lgbtq'], criticScore:73, bigNames:false, animated:false, foreign:false, continuous:false, seasons:true, trueStory:true, derivative:false, time:'Contemporary'},
    {title:'Black Mirror',genres:['scifi', 'political', 'action', 'horror'], criticScore:97, bigNames:false, animated:false, foreign:true, continuous:false, seasons:true, trueStory:false, derivative:false, time:'Timeless'},
]

const createRadioAnswerElements = (answerArray)=>{
    let htmlString = ''
    answerArray.forEach(answer => {
        htmlString = htmlString+`<li class="answer-container">
                                    <label><input type="radio" class="js-possible-answer" name="possible-answer" value=${answer} id=${answer}/>${answer}</label>
                                </li>`
    });
    return htmlString
}

const createCheckBoxAnswerElements = (genreArray)=>{
    let htmlString = ''
    genreArray.forEach(genre=>{
        htmlString = htmlString+`<li class="genre-container">
                                    <label><input class="js-genre-option" type="checkbox" name="possible-answer" value=${genre} id=${genre}/>
                                    ${genre}</label>
                                </li>`
    })
    return htmlString
}

const compareYourselfToClayton = (yourChoice, myChoice)=>{

    let responseText = ''
    if(yourChoice === myChoice){
        responseText = `We picked the same thing. COOL!`
        STORE.claytonMatches++
    } else {
        responseText = `We picked different things... And that's totally fine!`
    }
    return `${responseText} <br>We are currently ${100*STORE.claytonMatches/(STORE.currentQuestion+1)}% synced up.`
}

const interpretYourChoice = (input)=>{
    switch(input){
        case 'No': return 'No Thanks'
        case "Don't": return "Don't Care"
        default: return input
    }
}

const displayTemplates = {
    start: function(){
        return `
            <div class="tv">
                EVENTUALLY SOME IMAGE/CSS WILL LIVE HERE
            </div> 
            <div class="interface">
                <button type="submit" class="js-continue-button continue">Lets Find a Series!</button>
            </div>
            <div class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa deserunt, tenetur eum velit aliquid sit consectetur commodi debitis atque at nulla quam aut dolor architecto molestiae ut adipisci assumenda?
            </div>
        `
    },
    question: function(questionObj){
        return `        
                <div class="tv">
                    ${questionObj.question}<br> You're on question ${STORE.currentQuestion+1} of 10 <br> ${100*STORE.claytonMatches/(STORE.currentQuestion)}% match with me!               
                </div> 
                <div class="interface radio">
                    <ul class="all-answers">
                        ${createRadioAnswerElements(questionObj.answers)}                                               
                    </ul>
                    <div class="continue-container">
                        <button type="button" class="js-submit-button submit">Submit</button>
                    </div>
                </div>
            <div class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa deserunt, tenetur eum velit aliquid sit consectetur commodi debitis atque at nulla quam aut dolor architecto molestiae ut adipisci assumenda?
            </div>
        `
    },
    genreSelection: function(questionObj){
        return `        
                <div class="tv">
                    ${questionObj.question}<br> You're on question ${STORE.currentQuestion+1} of 10              
                </div> 
                <div class="interface radio">
                    <ul class="all-answers">
                        ${createCheckBoxAnswerElements(questionObj.genres)}                                               
                    </ul>
                    <div class="continue-container">
                        <button type="submit" class="js-submit-button submit">Submit</button>
                    </div>
                </div>
            <div class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa deserunt, tenetur eum velit aliquid sit consectetur commodi debitis atque at nulla quam aut dolor architecto molestiae ut adipisci assumenda?
            </div>
        `
    },
    feedback: function(questionObj){
        let yourChoice = interpretYourChoice(STORE.responses[questionObj.key])
        let myChoice = questionObj.clayton
        return `
            <div class="tv">
                '${questionObj.question}'
                <br>You chose '${yourChoice}'
                <br> I chose '${myChoice}'
                <br>${compareYourselfToClayton(yourChoice, myChoice)}
            </div> 
            <div class="interface">
                <button type="submit" class="js-continue-button  continue">Continue</button>
            </div>
            <div class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa deserunt, tenetur eum velit aliquid sit consectetur commodi debitis atque at nulla quam aut dolor architecto molestiae ut adipisci assumenda?
            </div>
        `
    },
    results: function (){
        return `
        <div class="tv">
           We found ${STORE.filteredSeries.length} series that you might like.
           <br> Here's my top recommendation for you: ${STORE.filteredSeries[0].title}
        </div> 
        <div class="interface">
            <button type="submit" class="js-more-button more">Other Matches</button> <button type="submit" class="js-more-button more">Try the whole thing again!</button>
        </div>
        <div class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus culpa deserunt, tenetur eum velit aliquid sit consectetur commodi debitis atque at nulla quam aut dolor architecto molestiae ut adipisci assumenda?
        </div>
    `
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
    if(STORE.bestGuessFound === false){
        sortedResponses.definitely.forEach(question => filterBasedUponAResponse(question, true))
    }
}

const noFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false){
        sortedResponses.no.forEach(question => filterBasedUponAResponse(question, false))
    }
}

const sureFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false){
        sortedResponses.sure.forEach(question => filterBasedUponAResponse(question, true))
    }
}

const timeFilter = (sortedResponses) =>{
    if(STORE.bestGuessFound === false && sortedResponses.time != "Don't"){
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

const continueClick = () =>{
    //this will move from a transition page ('start' or 'feedback') to the next question page, or if we're at the final question it'll go to the 'results page'
    console.log('continue click')
    
    if(STORE.currentDisplay === 'start'){
        STORE.currentDisplay = 'genreSelection'
    } else if (STORE.currentQuestion === questionList.length-1){
        findBestGuessSeries()
        STORE.currentDisplay = 'results'
    } else {
        STORE.currentDisplay = 'question' 
        STORE.currentQuestion++
    }
    
    renderQuizApp()
}

const listenForContinueClick = ()=>{
    console.log('listenForContinueClick')
    //listens for clicks on any of the continue buttons
    $('#js-netflix-form').on('click', '.js-continue-button', function(event){
        event.preventDefault()
        continueClick();
    })
    
}

const checkClick = (input) =>{
    // will toggle a checkbox on or off and update the state of 'responses.genres'
    let userGenres = STORE.responses.genres
    
    if(!userGenres.includes(input.value)){
        userGenres.push(input.value)
    }else {
        let index = userGenres.indexOf(input.value)
        userGenres.splice(index,1)
    }
}

const listenForCheckClick = ()=>{
    $('#js-netflix-form').on('click', '.js-genre-option', function(event){
        // event.preventDefault()
        checkClick(this)
    })
    console.log('listenForCheckClick')
    
}

const radioClick = (input) =>{
    // will toggle selected radio on and all the others off, and update the
    
    STORE.responses[questionList[STORE.currentQuestion].key] = input.value
    console.log(STORE.responses[questionList[STORE.currentQuestion].key])
}

const listenForRadioClick = ()=>{
    console.log('listenForRadioClick')
    $('#js-netflix-form').on('click', '.js-possible-answer', function(event){
        // event.preventDefault()
        radioClick(this)
    })

}

const submitClick = ()=>{
    //will go from a question page to a transition page, increment the 'currentQuestion' then renders
    console.log('submitClick')
    STORE.currentDisplay = 'feedback'
    renderQuizApp()
}

const listenForSubmitClick = ()=>{
    console.log('listenForSubmitClick')
    $('#js-netflix-form').on('click', '.js-submit-button', function(event){
        event.preventDefault()
        submitClick()
    })
}

const moreClick = () =>{
    //on the 'results' page only. It will only exist if there are more than one match in the series list after filtering.
}

const listenForMoreClick = () =>{
    console.log('listenForMoreClick')
    moreClick()
}

const resetClick = () =>{
    //resets the state and returns the user to 'start' display
    //resetSTORE()
    console.log('reset click')
}

const listenForResetClick = () =>{
    $('#js-netflix-form').on('click', '.js-reset-button', function(event){
        resetClick()
    })
    console.log('listenForsResetClick')
}


///////////ACTIVATION - rendering to the DOM and listening for actions

const renderQuizApp = ()=>{
    console.log('render')
    //takes the store and renders the app based upon the information there
    $('#js-netflix-form').html(displayTemplates[STORE.currentDisplay](questionList[STORE.currentQuestion]))
}


function handleQuizApp() {
    renderQuizApp()
    listenForContinueClick()
    listenForCheckClick()
    listenForRadioClick()
    listenForSubmitClick()
    listenForMoreClick()
    listenForResetClick()
}

  
$(handleQuizApp);