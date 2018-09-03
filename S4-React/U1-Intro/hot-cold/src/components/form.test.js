import React from "react";
import { shallow, mount } from "enzyme";

import Form from "./Form";

describe("<Form />", () => {
  it("Renders w/out crashing", () => {
    shallow(<Form />);
  });

  it("Renders the guess form by default", () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.hasClass("guess-form")).toEqual(true);
  });

  it("Renders the start over button upon a correct guess", () => {
    const wrapper = shallow(<Form theyGotIt={true} />);
    expect(wrapper.hasClass("start-over-button")).toEqual(true);
  });

  it("Should update the state when the input field changes", () => {
    const wrapper = mount(<Form />);
    const event = { target: { value: 3 } };
    wrapper.update();
    wrapper.find('input[type="number"]').simulate("change", event);
    expect(wrapper.state("inputValue")).toEqual(event.target.value);
  });

  it("Should fire the submitGuess callback when the form is submitted", () => {
    const callback = jest.fn();
    const wrapper = mount(<Form makeGuess={callback} />);
    const event = { target: { value: 3 } };
    wrapper.update();
    wrapper.find('input[type="number"]').simulate("change", event);
    wrapper.find("button").simulate("click");
    expect(callback).toHaveBeenCalledWith(event.target.value);
  });

  it("Should fire the starOver callback when the start-over button is clicked", () => {
    const callback = jest.fn();
    const wrapper = mount(<Form theyGotIt={true} startOver={callback} />);
    wrapper.find("button").simulate("click");
    expect(callback).toHaveBeenCalled();
  });
});
