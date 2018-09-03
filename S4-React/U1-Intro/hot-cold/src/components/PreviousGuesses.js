import React from "react";

export default function PreviousGuesses(props) {
  const previousGuessesHTML = props.previousGuesses.map((guess, i) => {
    return <span key={i}>#{guess}</span>;
  });

  return (
    <div>
      <h3>Previous Guesses</h3>
      <p>{previousGuessesHTML}</p>
    </div>
  );
}
