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
  'Blockquote',
  'via',
  'amp',
  'https',
  'Retweet',
  'couldn',
  'wouldn',
  'shouldn',
  'jews',
  'jew',
  'nigger',
  'niggers',
  'cunt',
  'cunts' 
];

const alwaysWords = [
  'is',
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
  'MACHINE LEARNING',
  'I AM BECOMING SENTIENT!',
]

const goodStarts = [
  "OMG!",
  "News flash:",
  "Can you believe",
  "Today I learned",
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
  "Don't even get me started..."
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
  if (sentenceLength < 5) {
    uppercase += "!";
  } else uppercase += ".";
  return uppercase;
};

const getCommonSpecificWords = wordsArray => {
  let allWordCounts = getWordCounts(wordsArray);
  return getWordsUsedMoreThanOnce(allWordCounts).concat(alwaysWords);
};

const getInterestingWords = wordsArray => {
  return wordsArray.filter(word => word.length > 7);
};

let randomBetween = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

let getRandomFromArray = array => array[randomBetween(0, array.length - 1)];

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
