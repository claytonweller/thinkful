/*
Write an O(n) algorithm to sort an array of integers, 
where you know in advance what the lowest and highest values are.
*/

// NOTE! This minMaxSplitSort only works if there aren't more the 2 of a single integer!

let array = [4, 6, 7, 2, 4, 3, 8, 9, 5, 1, 1, 0];

function minMaxSplitSort(arr, min, max) {
  let minArray = [];
  let maxArray = [];
  let midPoint = Math.floor((max - min) / 2) + min;
  let localMax = min;
  let localMin = max;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > midPoint) {
      maxArray.unshift(arr[i]);
      if (localMin > arr[i]) {
        localMin = arr[i];
      }
    } else {
      minArray.push(arr[i]);
      if (localMax < arr[i]) {
        localMax = arr[i];
      }
    }
  }

  if (arr.length > 2) {
    minArray = minMaxSplitSort(minArray, min, localMax);
    maxArray = minMaxSplitSort(maxArray, localMin, max);
  } else if (arr.length === 2) {
    minArray = [min];
    maxArray = [max];
  } else {
    return minArray;
  }
  console.log("RESULT", [...minArray, ...maxArray]);

  return [...minArray, ...maxArray];
}

// minMaxSplitSort(array, 0, 9);

/*
Write an algorithm to shuffle an array into a random order in-place 
(i.e. without creating a new array).
*/

let sortedArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

Array.prototype.shuffle = function() {
  let left = [];
  let right = [];
  for (let i = 0; i < this.length; i++) {
    if (Math.random() > 0.5) {
      if (Math.random() > 0.5) {
        left.push(this[i]);
      } else {
        left.unshift(this[i]);
      }
    } else {
      if (Math.random() > 0.5) {
        right.push(this[i]);
      } else {
        right.unshift(this[i]);
      }
    }
  }

  let newArr = [...left, ...right];
  this.forEach(i => (this[i] = newArr[i]));
};

sortedArr.shuffle();

/*
Imagine that I gave you twenty books to sort in alphabetical order. 
How would you go about it? 
Can you express this as an algorithm?
*/

/* 

I'd probably do a merg sort style thing. - 
1. I'd split the books into 10 groups of 2.
2. I would order each pair.
3. I would, starting lowest to highest, compare adjacent groups of two to create 5 sorted groups of 4.
4. I would compare adjacent groups of 4 to create 2 groups of 8 (and the remaining 4)
5. I would then compare the remaining 4 with on of the groups of 8
6. I would compare the two groups.
7. Celebrate!

If I had to write an algorithm in JS,
it would mostly be about setting a numerical value for every book based upon the title.
Then I would use a merge sort algorithm.
Then associate that with the book numbers. 
(I might make every book an object, with a title and a number)
(Or I might build a wrapper function that does that under the covers and all you have to
 do is pass in an array of titles.)

*/
