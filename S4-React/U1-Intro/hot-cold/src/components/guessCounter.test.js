import React from "react";
import { shallow, mount } from "enzyme";

import GuessCounter from "./GuessCounter";

describe("<GuessCounter />", () => {
  it("Renders w/out crashing", () => {
    shallow(<GuessCounter />);
  });

  it("Renders the total number of guesses", () => {
    const previousGuesses = [12, 14];
    const wrapper = shallow(
      <GuessCounter guessCount={previousGuesses.length} />
    );
    expect(
      wrapper.contains(<p>You have guessed {previousGuesses.length} times</p>)
    ).toEqual(true);
  });
});
