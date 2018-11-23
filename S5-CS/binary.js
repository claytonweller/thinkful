////// TWOS COMPLIMENT - no binary operators ///////

function eightBitBinary(num) {
  let binary = num.toString(2);
  let addedZeros = "";
  for (let i = 0; i < 8 - binary.length; i++) {
    addedZeros = "0" + addedZeros;
  }
  let eightBit = addedZeros + binary;
  console.log("eightBit", eightBit);
  return eightBit;
}

function invertBinary(num) {
  let inverted = "";
  for (let i = 0; i < num.length; i++) {
    if (num[i] === "0") {
      inverted = inverted + "1";
    } else {
      inverted = inverted + "0";
    }
  }
  console.log("Inverted", inverted);
  return inverted;
}

function addOneBinary(num) {
  let sum = "";
  let carry = true;
  for (let i = num.length - 1; i > 0; i--) {
    if (carry && num[i] === "0") {
      sum = "1" + sum;
      carry = false;
    } else if (carry && num[i] === "1") {
      sum = "0" + sum;
      carry = true;
    } else {
      sum = num[i] + sum;
    }
  }
  console.log("Add One", sum);
}

function twosCompliment(num) {
  addOneBinary(invertBinary(eightBitBinary(num)));
}

////// Is it even?

function isItEven(num) {
  if (num & (1 === 1)) {
    return false;
  } else {
    return true;
  }
}

/////// OR experiment

function orExperiment(num1, num2) {
  console.log(num1 & num2);
  console.log(num1 | num2);
  console.log(num1 ^ num2);
}

/////// Bit shifting

function sixteenBitBinary(num) {
  let binary = num.toString(2);
  let addedZeros = "";
  for (let i = 0; i < 16 - binary.length; i++) {
    addedZeros = "0" + addedZeros;
  }
  let sixteenBit = addedZeros + binary;
  console.log("Sixteen Bit", sixteenBit);
  return sixteenBit;
}

function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

function leftShift(num, shift) {
  console.log(
    `You shifted ${num} left ${shift} and got a new decimal of => ${num <<
      shift}`
  );
  return num << shift;
}

function rightShift(num, shift) {
  console.log(
    `You shifted ${num} right ${shift} and got a new decimal of => ${num >>
      shift}`
  );
  return num >> shift;
}

leftShift(111, 3);
rightShift(111, 3);
