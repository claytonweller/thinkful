//CW : The get Tokens function takes a raw string input, makes it completely lowercase. Then the split method takes a string and based on an condition (in this case all a space, or any punctuation) returns an array made up of the strings between those conditions. Finaly it sorts all of the resulting words in alphanumerical order.

function getTokens(rawString) {
    // NB: `.filter(Boolean)` removes any falsy items from an array
    return rawString.toLowerCase().split(/[ ,!.";:-]+/).filter(Boolean).sort();
}

function mostFrequentWord(text) {
//CW: Here we call the getTokens function with the text we're interested in, and it will return a sorted array of words.
    let words = getTokens(text);
//CW: delcaring an object where our words and their frequencies will be stored
    let wordFrequencies = {}; 

//CW: This for loop goes through each word in 'words' and if it has never seen that word before it creates a key with a value of 1 in the wordFrequencies object, if it has already seen a word it increments the value of its key in the object by one.
    for (let i = 0; i <= words.length; i++) {
        if (words[i] in wordFrequencies) {
        wordFrequencies[words[i]]++;
        } else {
        wordFrequencies[words[i]] = 1;
        }
    }

//CW: These two variables are to hold the most frequent word and how many times it has appeard. By default they are set at the first word in the original array.
    let currentMaxKey = Object.keys(wordFrequencies)[0];
    let currentMaxCount = wordFrequencies[currentMaxKey];

// CW: This loops through each word(key) in the wordFrequencies object, and then check is the number of times it appears (value) is greater than any of the other words already tested. If its value is higher it saves it as the new currentMaxKey, and saves its value.
    for (let word in wordFrequencies) {
        if (wordFrequencies[word] > currentMaxCount) {
        currentMaxKey = word;
        currentMaxCount = wordFrequencies[word];
        }
    }

//CE: It then retruns the word... but not the count.
    return currentMaxKey;
}
