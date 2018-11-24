/*
The share price for a company over a week's trading is as follows: 
[128, 97, 121, 123, 98, 97, 105]. 
If you had to buy shares in the company on one day, 
and sell the shares on one of the following days, 
write an algorithm to work out what the maximum 
profit you could make would be.
*/

let sample = [128, 97, 121, 123, 98, 96, 105];

function findMaxProfit(arr) {
  let min;
  let max;
  let optimalProfit = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!min) {
      min = arr[i];
    }
    if (!max) {
      max = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
      max = arr[i];
    }
    if (optimalProfit < max - min) {
      optimalProfit = max - min;
    }
  }

  console.log(optimalProfit);
}

// findMaxProfit(sample);

/*
Imagine that you wanted to find what the highest
floor of a 100 story building you could drop an egg was,
without the egg breaking. But you only have two eggs.
Write an algorithm to work out which floors you should drop
the eggs from to find this out in the most efficient way.

*/

function findFloor(height) {
  let brokenEggs = 0;
  let breakingFloor = Math.floor(Math.random() * height + 1);
  let high = height;
  let low = 0;
  let guess;

  while (brokenEggs < 2 || guess === breakingFloor - 1) {
    if (brokenEggs === 0) {
      guess = Math.floor(high - (high - low) / 1.5);
    } else if (brokenEggs === 1) {
      low++;
      guess = low;
    } else {
      guess = low - 1;
    }
    console.log(guess, brokenEggs);
    if (guess >= breakingFloor) {
      brokenEggs++;
    } else {
      low = guess;
    }
  }
  console.log(guess);
}

// findFloor(100);

/*
Imagine you are looking for a book in a 
library with a Dewey Decimal index.
How would you go about it? 
Can you express this process as a searching algorithm?

Thoughts - 
I'd first have to do some research into how specifically DD works.
In general the process would be:
First find the section in the library
Then the shelf in the section
Then the position of the specific book on the shelf.

There might be more nested layers inbetween library and section,
but on the whole the process would be one of doing divide and conquer
in each layer to save processing time

*/
