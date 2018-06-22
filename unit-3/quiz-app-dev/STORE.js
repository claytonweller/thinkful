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

module.exports = STORE  