import React from "react";
import { shallow, mount } from "enzyme";

import PreviousGuesses from "./PreviousGuesses";

const previousGuessesArray = [69, 18];

describe("<PreviousGuesses />", () => {
  it("Renders w/out crashing", () => {
    shallow(<PreviousGuesses previousGuesses={previousGuessesArray} />);
  });

  it("Renders the previous guesses", () => {
    const wrapper = shallow(
      <PreviousGuesses previousGuesses={previousGuessesArray} />
    );
    const previousGuessesHTML = previousGuessesArray.map((guess, i) => {
      return <span key={i}>#{guess}</span>;
    });
    expect(
      wrapper.contains(
        <div>
          <h3>Previous Guesses</h3>
          <p>{previousGuessesHTML}</p>
        </div>
      )
    ).toEqual(true);
  });
});
