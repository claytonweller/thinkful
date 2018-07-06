const data = require("./testData.js");

const boringWords = [
  "The",
  "from",
  "a",
  "an",
  "s",
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
  "when",
  "which",
  "with",
  "there",
  "they",
  "by",
  "them"
];
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

const getWordsArray = string =>
  string.split(/\W+/).map(word => word.toLowerCase());

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

const removeBoringWords = wordArray => {
  let interestingWords = wordArray;
  boringWords.forEach(boringWord => {
    interestingWords = interestingWords.filter(word => word != boringWord);
  });
  return interestingWords;
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
  return getWordsUsedMoreThanOnce(allWordCounts);
};

const getInterestingWords = wordsArray => {
  return wordsArray.filter(word => word.length > 7);
};

let randomBetween = (from, to) =>
  Math.floor(Math.random() * (to - from + 1)) + from;

let getRandomFromArray = array => array[randomBetween(0, array.length - 1)];

const createATweet = (topic, text) => {
  let wordsArray = getWordsArray(removeBoringWords(text));
  let commonSpecificWords = getCommonSpecificWords(wordsArray);
  let interestingWords = getInterestingWords(wordsArray);
  let numberOfSentences = randomBetween(1, 3);

  let tweet = getRandomFromArray(goodStarts);

  for (let index = 0; index < numberOfSentences; index++) {
    tweet += " " + createSentence(commonSpecificWords);
  }
  tweet += ` #${topic.replace(/\s+/g, "")}`;
  tweet += ` #${createRandomString(1, interestingWords)}`;
  tweet += ` #${createRandomString(1, interestingWords)}`;

  return tweet;
};

console.log(createATweet(data.topic, data.body));