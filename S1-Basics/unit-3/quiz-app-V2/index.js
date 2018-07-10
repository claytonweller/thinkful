const STATE = {
  currentQuestion:0,
  totalCorrect:0
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
];


// LISTENERS

const setupListeners = ()=>{
  $('#start').click(startClick);
  $('#asking-form').submit(questionFormSubmit);
  $('#feedbacking-button').click(feedbackClick);
  $('#restart').click(restartClick);
}

// HANDLERS

const startClick = ()=>{
  $('.starting').attr('hidden', true)
  renderQuestion()
  $('.asking').attr('hidden', false)
}

const questionFormSubmit = event =>{
  event.preventDefault()
  $('.asking').attr('hidden', true)
  let answerIndex = $('input[name=possible-answer]:checked').val()
  let answer = questionList[STATE.currentQuestion].answers[answerIndex];
  renderFeedbacking(answer)
  $('.feedbacking').attr('hidden', false)
  STATE.currentQuestion++
}

const feedbackClick = ()=>{
  if(STATE.currentQuestion > questionList.length-1){
    console.log('judging')
    $('.feedbacking').attr('hidden', true)
    renderJudging()
    $('.judging').attr('hidden', false)
  } else {
    $('.feedbacking').attr('hidden', true)
    renderQuestion()
    $('.asking').attr('hidden', false)
  }
}

const restartClick = () =>{
  $('.judging').attr('hidden', true)
  $('.starting').attr('hidden', false)
  STATE.currentQuestion = 0
  STATE.totalCorrect = 0
}

// QUESTION RENDERERS

const renderJudging = ()=>{
  $('.judging').find('h1').html(`You got ${STATE.totalCorrect} correct out of ${questionList.length}`)
}

const renderButtonText = ()=>{
  if(STATE.currentQuestion === questionList.length-1){
    $('.feedbacking').find('button').html(
      'Is it over yet!?!'
    )
  }else{
    $('.feedbacking').find('button').html(
      'Lets move on...'
    )
  }
}

const renderSelection = (answer) =>{
  $('.feedbacking').find('h1').html( `You picked - ${answer}` )
}

const renderValidation = answer =>{
  let correct = questionList[STATE.currentQuestion].correct
  let feedback = ""
  if(answer === correct){
    STATE.totalCorrect++
    feedback = "You're right! NICE!"
  } else {
    feedback = `Sorry the correct answer was ${correct}`
  }
  $('.feedbacking').find('h2').html(feedback)
}

const renderStatus = () =>{
  $('.feedbacking').find('h3').html(
    `You have gotten ${STATE.totalCorrect} correct out of ${STATE.currentQuestion+1}`
  )
}

const renderFeedbacking = answer =>{
  renderSelection(answer)
  renderValidation(answer)
  renderStatus()
  renderButtonText()
}

// ASKING RENDERERS

const renderSingleAnswer = (answer, i) => {
  return `
    <label class="answer-container">
    <input type="radio" class="js-possible-answer" name="possible-answer" value=${i} id=${answer} required/>
    ${answer}
    </label>
          `
}

const renderQuestion = ()=>{
  $('.asking').find('h1').html(questionList[STATE.currentQuestion].question);
  $('.asking').find('p').html(
    `You are on question ${STATE.currentQuestion+1} of ${questionList.length}`
  )
  $('.asking').find('ul').html(
    questionList[STATE.currentQuestion].answers.map((answer, i) => renderSingleAnswer(answer, i))
  )
}

$(setupListeners);