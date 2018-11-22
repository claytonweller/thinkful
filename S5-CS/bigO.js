function getRunTimeOperations(fn, input, input2) {
  const { ticks, result } = fn(input, input2);
  let size = input;
  if (input[0]) {
    size = input.length;
  }

  console.log(
    `With input of size ${size}, ${fn.name} ` +
      `clocked ${ticks} ticks to generate result of ${result}.`
  );
}

// Is it even? - O(1)
function isEven(value) {
  let ticks = 0,
    isEven = false;
  ticks++;
  if (value % 2 == 0) {
    isEven = true;
  }

  return {
    result: isEven,
    ticks
  };
}

// Are You Here - O(n)
function areYouHere(arr1, arr2) {
  let ticks = 0,
    isHere = false;
  console.log(arr1, arr2);

  for (let i = 0; i < arr1.length; i++) {
    ticks++;
    const el1 = arr1[i];
    for (let j = 0; j < arr2.length; j++) {
      ticks++;
      const el2 = arr2[j];
      if (el1 === el2) {
        isHere = true;
      }
    }
  }
  return {
    result: isHere,
    ticks
  };
}

// Double Array Values = O(n)
function doubleArrayValues(array) {
  let ticks = 0;
  for (let i = 0; i < array.length; i++) {
    ticks++;
    array[i] *= 2;
  }
  return {
    result: array,
    ticks
  };
}

// Naive Search - O(n)
function naiveSearch(array, item) {
  let ticks = 0,
    index = "Not Found";
  for (let i = 0; i < array.length; i++) {
    ticks++;
    if (array[i] === item) {
      return {
        result: index,
        ticks
      };
    }
  }
  return {
    result: index,
    ticks
  };
}

// Create Pairs - O(n^2)
function createPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i] + ", " + arr[j]);
    }
  }
}

// Generate a fibonacci sequence - O(n)
function generateFib(num) {
  let result = [],
    ticks = 0;
  for (let i = 1; i <= num; i++) {
    // we're adding the first item
    // to the result list, append the
    // number 0 to results
    if (i === 1) {
      ticks++;
      result.push(0);
    }
    // ...and if it's the second item
    // append 1
    else if (i == 2) {
      ticks++;
      result.push(1);
    }

    // otherwise, sum the two previous result items, and append that value to results.
    else {
      ticks++;
      result.push(result[i - 2] + result[i - 3]);
    }
  }
  // once the for loop finishes
  // we return `result`.
  return {
    result,
    ticks
  };
}

// Efficient Search = O(ln(n))
function efficientSearch(array, item) {
  let minIndex = 0;
  let maxIndex = array.length - 1;
  let currentIndex;
  let currentElement;

  while (minIndex <= maxIndex) {
    currentIndex = Math.floor((minIndex + maxIndex) / 2);
    currentElement = array[currentIndex];

    if (currentElement < item) {
      minIndex = currentIndex + 1;
    } else if (currentElement > item) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }
  return -1;
}

// Random element = O(1)
function findRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Is Prime - Somewhere between O(1) and O(n)) depending upon how close to prime the number is
function isPrime(n) {
  let ticks = 0;
  // if n is less than 2 or a decimal, it's not prime
  if (n < 2 || n % 1 != 0) {
    ticks++;
    return {
      result: false,
      ticks
    };
  }
  // otherwise, check if `n` is divisible by any integer
  // between 2 and n.
  for (let i = 2; i < n; ++i) {
    ticks++;
    if (n % i == 0) {
      return {
        result: false,
        ticks
      };
    }
  }
  return {
    result: true,
    ticks
  };
}
