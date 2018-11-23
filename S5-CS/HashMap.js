class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error("Key error");
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error("Key error");
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

/*
 Write an algorithm to check whether any permutation of a string is a palindrome.
  A palindrome is a string that reads the same forwards and backwards:
  for example, "madam" or "racecar". Your algorithm needs to check if any
  permutation of the string is a palindrome. Given the string "acecarr",
  the algorithm should return true, because the letters in "acecarr" can 
  be rearranged to "racecar", which is a palindrome. In contrast, given
  the word "north", the algorithm should return false, because there's no
  way to rearrange those letters to be a palindrome.
*/

function countLetters(string) {
  let letters = {};
  for (let i = 0; i < string.length; i++) {
    if (letters[string[i]]) {
      letters[string[i]]++;
    } else {
      letters[string[i]] = 1;
    }
  }
  return letters;
}

function canStringPalindrom(string) {
  let letterCount = countLetters(string);
  let numberOfOdds = 0;

  Object.keys(letterCount).forEach(letter => {
    if (letterCount[letter] % 2 === 1) {
      numberOfOdds++;
    }
  });
  if (numberOfOdds > 1) {
    return false;
  }
  return true;
}

/*
Write an algorithm to group a list of words into anagrams. 
For example, if the input was 
['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], 
the output should be: 
[['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
*/

const sample = ["east", "cars", "acre", "arcs", "teas", "eats", "race"];

function countAllLetters(array) {
  return array.map(word => {
    return {
      spelling: word,
      letters: countLetters(word)
    };
  });
}

function wordsAreAnagrams(word1, word2) {
  let isAnagram = true;
  Object.keys(word1.letters).forEach(letter => {
    if (word2.letters[letter] !== word1.letters[letter]) {
      isAnagram = false;
    }
  });
  return isAnagram;
}

function groupsAnagrams(arr) {
  let countedArray = countAllLetters(arr);
  let newArr = [];
  countedArray.forEach(word => {
    let foundAnagram = false;
    for (let i = 0; i < newArr.length; i++) {
      if (wordsAreAnagrams(newArr[i][0], word)) {
        newArr[i].push(word);
        foundAnagram = true;
      }
    }
    if (!foundAnagram) {
      newArr.push([word]);
    }
  });

  const wordsOnly = newArr.map(wordArray =>
    wordArray.map(word => word.spelling)
  );
  console.log(wordsOnly);
}

groupsAnagrams(sample);
