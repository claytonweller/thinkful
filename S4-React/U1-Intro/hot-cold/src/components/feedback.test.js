import React from "react";
import { shallow, mount } from "enzyme";

import Feedback from "./Feedback";

describe("<Feedback />", () => {
  it("Renders w/out crashing", () => {
    shallow(<Feedback />);
  });

  it("Renders the correct default Feedback", () => {
    const wrapper = shallow(
      <Feedback currentGuess={0} lastGuess={0} theOneTrueNumber={1} />
    );
    expect(
      wrapper.contains(<p>I've picked a number between 1 and 100</p>)
    ).toEqual(true);
  });

  it("Renders correct feedback when you're close", () => {
    const wrapper = shallow(
      <Feedback currentGuess={1} theOneTrueNumber={2} lastGuess={99} />
    );
    expect(wrapper.contains(<p>SUPER HOT!</p>)).toEqual(true);
  });

  it("Renders warmer when you current guess is closer", () => {
    const wrapper = shallow(
      <Feedback currentGuess={2} lastGuess={1} theOneTrueNumber={80} />
    );
    expect(wrapper.contains(<p>Warmer</p>)).toEqual(true);
  });

  it("Renders colder when you current guess is further", () => {
    const wrapper = shallow(
      <Feedback currentGuess={1} lastGuess={2} theOneTrueNumber={80} />
    );
    expect(wrapper.contains(<p>colder</p>)).toEqual(true);
  });
});
