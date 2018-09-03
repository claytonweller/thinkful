import React from "react";

export default function Feedback({
  currentGuess,
  lastGuess,
  theOneTrueNumber
}) {
  const feedback = (currentGuess, lastGuess, theOneTrueNumber) => {
    if (currentGuess === theOneTrueNumber) {
      return "You Got it!";
    } else if (
      (currentGuess !== 0) &
      (Math.abs(currentGuess - theOneTrueNumber) < 3)
    ) {
      return "SUPER HOT!";
    } else if (
      Math.abs(currentGuess - theOneTrueNumber) <
      Math.abs(lastGuess - theOneTrueNumber)
    ) {
      return "Warmer";
    } else if (
      Math.abs(currentGuess - theOneTrueNumber) >
      Math.abs(lastGuess - theOneTrueNumber)
    ) {
      return "colder";
    } else {
      return "I've picked a number between 1 and 100";
    }
  };

  return <p>{feedback(currentGuess, lastGuess, theOneTrueNumber)}</p>;
}
