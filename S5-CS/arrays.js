// Imagine you have an array of numbers.
// Write an algorithm to remove all numbers less than five from the array.

function moreThanFive(arr) {
  newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 5) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

let testArray = [1, 6, 4, 8, 5, 6, 8, 1, 1, 2, 7, 4, 9, 2, 2];

// Imagine you have two arrays which have already been sorted.
// Write an algorithm to merge the two arrays into a single array,
// which should also be sorted. For example, if your input arrays were
// [1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10],
// your output array should be [1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11].

function mergeArrays(arr1, arr2) {
  newArr = [];
  let j = 0;
  for (let i = 0; i < arr1.length; i++) {
    while (arr1[i] > arr2[j]) {
      newArr.push(arr2[j]);
      j++;
    }
    newArr.push(arr1[i]);
  }
  console.log(newArr);
}

// Given an array of numbers, write an algorithm to find out the products of every number,
// except the one at that index. For example,
// if the input was [1, 3, 9, 4], the output should be [108, 36, 12, 27]
// (i.e. [3*9*4, 1*9*4, 1*3*4, 1*3*9]).

function otherProducts(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let product = 1;
    for (let j = 0; j < arr.length; j++) {
      if (j !== i) {
        product = product * arr[j];
      }
    }
    newArr.push(product);
  }
  console.log(newArr);
}

otherProducts([1, 2, 4, 7]);
