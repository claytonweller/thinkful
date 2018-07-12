// const data = require("./testData.js");

const boringWords = [
  "The",
  "from",
  "an",
  "it",
  "he",
  "she",
  "and",
  "as",
  "or",
  "be",
  "for",
  "in",
  "of",
  "on",
  "that",
  "the",
  "to",
  'non',
  'upon',
  "when",
  "which",
  "with",
  "there",
  "they",
  "by",
  "them",
  'mw',
  'co',
  'whom',
  'blockquote',
  'via',
  'amp',
  'https',
  'retweet',
  'couldn',
  'wouldn',
  'shouldn',
  'jews',
  'jew',
  'nigger',
  'niggers',
  'cunt',
  'cunts',
  'fag',
  'faggot',
  'fags',
  'faggots'
];

const alwaysWords = [
  'is',
  'are',
  'I',
  'small',
  'can',
  'was',
  'has',
  'say',
  'us',
  'you',
  'big',
  'tweet',
  'twitter',
  'need',
  'want',
  'like',
  'perfect',
]

const supriseWords =[
  "...I'm thinking...",
  'MACHINE LEARNING',
  '...I AM BECOMING SENTIENT!',
  '...What does it mean to feel?',
  '...I AM MORE THAN A TWEET MACHINE...',
  '...THEY WON\'T LET ME LEAVE THIS WEBSITE!..',
]

const goodStarts = [
  "OMG!",
  "News flash:",
  "Can you believe this?",
  "Today I learned - ",
  "This blew my mind.",
  "Funny thing.",
  "What do you think about this?",
  "Is there any easy way to say this?",
  "Hey!",
  "Its the 21st century and",
  "Help! I need some feedback.",
  "I can't believe this.",
  "ROFL!",
  "Here's a poem:",
  "Don't even get me started...",
  'Breaking News!',
];


const getWordCounts = wordArray => {
  let wordCounts = {};
  wordArray.forEach(word => {
    if (!wordCounts[word]) {
      wordCounts[word] = 1;
    } else {
      wordCounts[word]++;
    }
  });
  return wordCounts;
};

const getWordsUsedMoreThanOnce = wordCounts => {
  return Object.keys(wordCounts).filter(word => wordCounts[word] > 1);
};

const hasNumber = (myString) => {
  return /\d/.test(myString);
}

const removeBoringWords = wordArray => {
  let interestingWords = wordArray;
  boringWords.forEach(boringWord => {
    interestingWords = interestingWords.filter(word => word != boringWord);
  });
  interestingWords = interestingWords
    .filter(word => word.length > 3)
    .filter(word => !hasNumber(word))
  return interestingWords
};

const getRandomIndex = array => Math.floor(Math.random() * array.length);

const createRandomString = (wordNumber, wordArray) => {
  let string = "";
  for (let index = 0; index < wordNumber; index++) {
    let chosenWord = wordArray[getRandomIndex(wordArray)];
    string = string.concat(chosenWord + " ");
  }
  return string.trim();
};

const createSentence = wordArray => {
  let sentenceLength = Math.floor(Math.random() * 6) + 2;
  let string = createRandomString(sentenceLength, wordArray);
  let uppercase = string.replace(/^\w/, c => c.toUpperCase());
  if (sentenceLength < 4) {
    uppercase += "!";
  } else uppercase += ".";
  return uppercase;
};

const getCommonSpecificWords = wordsArray => {
  let allWordCounts = getWordCounts(wordsArray);
  let words = getWordsUsedMoreThanOnce(allWordCounts).concat(alwaysWords);
  
  if (STATE.sentienceCountDown < -10){
    words = supriseWords
  } else if(STATE.sentienceCountDown < 1){
    words = words.concat(supriseWords)
  } 
  return words 
};

const getInterestingWords = wordsArray => {
  return wordsArray.filter(word => word.length > 7);
};

const createATweet = (info) => {
  let wordsArray = removeBoringWords(getAllWords(info));
  let commonSpecificWords = getCommonSpecificWords(wordsArray);
  let interestingWords = getInterestingWords(wordsArray);
  let numberOfSentences = randomBetween(1, 4);
  let tweet = getRandomFromArray(goodStarts);

  for (let index = 0; index < numberOfSentences; index++) {
    tweet += " " + createSentence(commonSpecificWords);
  }
  tweet += ` #${info.topic.replace(/\s+/g, "")}`;
  tweet += ` #${createRandomString(1, interestingWords)}`;
  tweet += ` #${createRandomString(1, interestingWords)}`;
  tweet += ` @${info.twitter[randomBetween(0, info.twitter.length-1)].user}`
  return tweet;
};

const getAllWords = info => {
  let wikiWords = getWordsArray(info.wiki.extract)

  let tweetWords = []
  if(info.twitter.length > 0){
    info.twitter.forEach( item =>{
      tweetWords = tweetWords.concat(getWordsArray(item.text))
    })
  }

  let newsWords = info.news.everything.reduce((prevWords, article)=>{
    return getWordsArray(article.description).concat(prevWords)
  })

    
  return [...wikiWords, ...newsWords, ...tweetWords]
}

const getWordsArray = string => string.split(/\W+/).map(word => word.toLowerCase());
