const STORE = {
    currentQuestion:0,
    totalCorrect:0,
    currentDisplay:'starting',
    previousResponse:'PREVIOUS RESPONSE',
    readyToProgress:true,
}

const questionList = [
    {
        question: 'How are you feeling?',
        answers:['Good', 'Great', 'Super Good', 'Really Great'],
        correct:'Super Good',
    },
    {
        question: 'How were you feeling yesterday?',
        answers:['Bad', 'Terrible', 'Crummy', 'Awful'],
        correct:'Bad',
    },
    {
        question: 'Does this seem arbitrary?',
        answers:['Yes', 'Definitely', 'Sure Does', 'Pineapple'],
        correct:'Pineapple',
    },
    {
        question: 'Who is the best character in starwars?',
        answers:['Luke', 'The grandpa guy', 'The green grandpa guy', 'Black Bucket Hat Man'],
        correct:'OBVIOUSLY HAN SOLO!',
    },
    {
        question: 'Can you get this question right?',
        answers:['No', 'No', 'No', 'No'],
        correct:'No',
    }
]

const startClick = ()=>{
    $('.starting').attr('hidden', true)
    renderAsking()
    $('.asking').attr('hidden', false)
    STORE.currentDisplay = 'asking'
    STORE.readyToProgress = false
}

const askClick = ()=>{
    $('.asking').attr('hidden', true)
    renderFeedbacking()
    $('.feedbacking').attr('hidden', false)
    STORE.currentDisplay = 'feedbacking'
    STORE.currentQuestion++
}

const feedbackClick = ()=>{
    if(STORE.currentQuestion > questionList.length-1){
        console.log('judging')
        $('.feedbacking').attr('hidden', true)
        renderJudging()
        $('.judging').attr('hidden', false)
        STORE.currentDisplay = 'judging'
    } else {
        $('.feedbacking').attr('hidden', true)
        renderAsking()
        $('.asking').attr('hidden', false)
        STORE.currentDisplay = 'asking'
        STORE.readyToProgress = false
    }
} 

const restartClick = () =>{
    $('.judging').attr('hidden', true)
    $('.starting').attr('hidden', false)
    STORE.currentDisplay = 'starting'
    STORE.currentQuestion = 0
    STORE.totalCorrect = 0
}

const continueClick = ()=>{
    console.log('continueClick', STORE.currentDisplay)
    if(STORE.readyToProgress){
        if(STORE.currentDisplay === 'starting'){
            startClick()
        } else if (STORE.currentDisplay === 'asking') {
            askClick()
        } else if (STORE.currentDisplay === 'feedbacking'){
            feedbackClick()
        } else if (STORE.currentDisplay === 'judging'){
            restartClick()
        }    
    }
}

const listenForContinueClick = ()=>{
    console.log('listening for continue click')
    $('.container').on('click', 'button', function(event){
        event.preventDefault()
        continueClick()
    })
}

const radioClick = (answer)=>{
    STORE.previousResponse = answer
    STORE.readyToProgress = true
}

const listenForRadioClick = ()=>{
    console.log('listening for Radio clicks')
    $('.js-answers').on('click', 'li', function(event){
        let answer = $(this).text()
        radioClick(answer)
    })
}

////renders the judging section

const renderJudging = ()=>{
    $('.judging').find('h1').html(`You got ${STORE.totalCorrect} correct out of ${questionList.length}`)
}

////renders the FEEDBACKING section

const renderButtonText = ()=>{
    if(STORE.currentQuestion === questionList.length-1){
        $('.feedbacking').find('button').html(
            'Is it over yet!?!'
        )
    }else{
        $('.feedbacking').find('button').html(
            'Lets move on...'
        )
    }

}

const renderSelection = () =>{
    $('.feedbacking').find('h1').html(
        `You picked - ${STORE.previousResponse}`
    )
}

const theyWereRight = (guess) =>{
    guess = guess.trim()
    console.log(questionList[STORE.currentQuestion].correct)
    if(guess === questionList[STORE.currentQuestion].correct){
        STORE.totalCorrect++
        return true
    } else {
        return false
    }
}

const renderValidation = () =>{
    if(theyWereRight(STORE.previousResponse)){
        $('.feedbacking').find('h2').html(
            `You're right! NICE!`
        )
    } else {
        $('.feedbacking').find('h2').html(
            'Sorry the correct answer was '+questionList[STORE.currentQuestion].correct 
        )
    }
    

}

const renderStatus = () =>{
    $('.feedbacking').find('h3').html(
        `You have gotten ${STORE.totalCorrect} correct out of ${STORE.currentQuestion+1}`
    )
}

const renderFeedbacking = ()=>{
    renderSelection()
    renderValidation()
    renderStatus()
    renderButtonText()
}

///renders the ASKING section

const renderQuestion = () => {
    $('.asking').find('h1').html(questionList[STORE.currentQuestion].question)
}
const renderSingleAnswer = (answer) => {
    return `<li class="answer-container">
                <label><input type="radio" class="js-possible-answer" name="possible-answer" value=${answer} id=${answer}/>${answer}</label>
             </li>`
}
const renderProgress = () =>{
    $('.asking').find('p').html(
        `You are on question ${STORE.currentQuestion+1} of ${questionList.length}`
    )
}
const renderAllAnswers = () =>{
    $('.asking').find('ul').html(
        questionList[STORE.currentQuestion].answers.map(answer => renderSingleAnswer(answer))
    )
}

const renderAsking = ()=>{
    renderQuestion()
    renderAllAnswers()
    renderProgress()
}

///activates all the listeners in the entire app

function handleQuizApp() {
    listenForContinueClick()
    listenForRadioClick()
}

$(handleQuizApp);